"use client";

import { useEffect } from "react";
import ContentstackLivePreview from "@contentstack/live-preview-utils";

type LivePreviewInitProps = {
  apiKey: string;
  environment: string;
  branch?: string;
};

/**
 * The Live Preview SDK calls `navigator.clipboard.writeText` (e.g. for its
 * copy actions), but inside Contentstack's cross-origin preview iframe Chrome
 * blocks the Clipboard API unless the embedder grants `clipboard-write` —
 * which we don't control. The rejected promise otherwise surfaces as a
 * NotAllowedError runtime overlay in dev. Wrap writeText so a blocked call
 * falls back to the legacy execCommand copy and never rejects unhandled.
 */
let clipboardGuarded = false;
const guardClipboard = () => {
  if (clipboardGuarded || typeof navigator === "undefined") return;
  const clipboard = navigator.clipboard;
  if (!clipboard?.writeText) return;
  clipboardGuarded = true;

  const legacyCopy = (text: string) => {
    try {
      const ta = document.createElement("textarea");
      ta.value = text;
      ta.setAttribute("readonly", "");
      ta.style.position = "fixed";
      ta.style.opacity = "0";
      document.body.appendChild(ta);
      ta.select();
      document.execCommand("copy");
      ta.remove();
    } catch {
      // Copy is best-effort inside the preview iframe; swallow.
    }
  };

  const original = clipboard.writeText.bind(clipboard);
  clipboard.writeText = (text: string) => {
    try {
      return original(text).catch(() => legacyCopy(text));
    } catch {
      legacyCopy(text);
      return Promise.resolve();
    }
  };
};

/**
 * Inside the Visual Experience / Builder iframe the SDK runs a `postMessage`
 * handshake with the Contentstack app; when that promise rejects it rejects
 * with a plain (non-Error) object, which Next's dev error overlay coerces into
 * an unhelpful "[object Object]" runtime error. Suppress only non-Error object
 * rejections (third-party SDK noise) — genuine app failures are Error
 * instances and still surface. No-op in production (no overlay).
 */
let rejectionGuarded = false;
const guardUnhandledRejections = () => {
  if (rejectionGuarded || typeof window === "undefined") return;
  rejectionGuarded = true;
  window.addEventListener("unhandledrejection", (event) => {
    const reason = event.reason;
    if (reason && typeof reason === "object" && !(reason instanceof Error)) {
      event.preventDefault();
      if (process.env.NODE_ENV !== "production") {
        console.debug("[LivePreview] suppressed non-Error rejection:", reason);
      }
    }
  });
};

/**
 * Initializes the Contentstack Live Preview SDK (SSR mode).
 *
 * When the site is loaded inside the Contentstack entry editor's preview
 * panel, the SDK listens for edits and reloads the iframe with
 * `?live_preview=<hash>&content_type_uid=...&entry_uid=...` — the catch-all
 * route reads that hash and fetches draft content from the preview host.
 * Outside the preview panel this is a no-op.
 */
export function LivePreviewInit({
  apiKey,
  environment,
  branch,
}: LivePreviewInitProps) {
  useEffect(() => {
    guardClipboard();
    guardUnhandledRejections();
    ContentstackLivePreview.init({
      ssr: true,
      enable: true,
      // "builder" enables the Visual Experience tab's editor tools; the SDK
      // detects the actual window type (preview panel / builder / standalone).
      mode: "builder",
      editButton: { enable: true },
      stackDetails: {
        apiKey,
        environment,
        ...(branch ? { branch } : {}),
      },
    });
  }, [apiKey, environment, branch]);

  return null;
}
