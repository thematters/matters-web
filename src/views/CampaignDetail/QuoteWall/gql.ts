import gql from 'graphql-tag'

// public: anyone can read a campaign's quote wall.
// `random: true` returns a random sample — the "shuffle" button refetches.
export const CAMPAIGN_QUOTES = gql`
  query CampaignQuotes(
    $shortHash: String!
    $first: first_Int_min_0_max_50 = 12
    $random: Boolean
  ) {
    campaign(input: { shortHash: $shortHash }) {
      id
      ... on WritingChallenge {
        id
        quoteCount
        enableQuoteWall
        quotes(input: { first: $first, random: $random }) {
          totalCount
          edges {
            node {
              ...QuoteWallQuote
            }
          }
        }
      }
    }
  }

  fragment QuoteWallQuote on Quote {
    id
    content
    createdAt
    poster {
      id
      userName
      displayName
    }
    article {
      id
      title
      shortHash
      author {
        id
        userName
      }
    }
  }
`
