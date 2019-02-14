import gql from 'graphql-tag'
import { Query } from 'react-apollo'

import { Popover, Tooltip } from '~/components'

const HOME_FEED = gql`
  query HomeFeed {
    viewer {
      recommendation {
        hottest(input: { first: 10 }) {
          edges {
            node {
              title
              author {
                userName
                avatar
              }
              summary
            }
          }
        }
      }
    }
  }
`

export default () => (
  <div>
    <p>Homepage</p>
    <Tooltip content="Dont touch me!">
      <span>Hover Me</span>
    </Tooltip>{' '}
    <Popover content="PPPPPOP">
      <span>Popover</span>
    </Popover>
    <Query query={HOME_FEED}>
      {({ data }) => {
        console.log(data)
        return <div />
      }}
    </Query>
  </div>
)
