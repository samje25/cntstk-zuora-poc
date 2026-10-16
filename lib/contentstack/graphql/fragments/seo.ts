export const SEO_FRAGMENT = /* GraphQL */ `
  fragment SeoFields on Seo {
    system {
      uid
    }
    title
    meta_title
    description
    keywords
    canonical_url
    no_index
    no_follow
    og_title
    og_description
    og_imageConnection {
      edges {
        node {
          url
          title
        }
      }
    }
    og_type
    twitter_card
    twitter_title
    twitter_description
    twitter_imageConnection {
      edges {
        node {
          url
          title
        }
      }
    }
    short_answer
    key_takeaways
    primary_entity
    ai_summary
    speakable_selectors
    faqs {
      question
      answer
    }
    schema_markup
  }
`;
