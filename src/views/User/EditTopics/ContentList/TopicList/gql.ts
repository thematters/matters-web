import gql from 'graphql-tag'

export const fragments = {
  topic: gql`
    fragment TopicListTopic on Topic {
      id
      title
      articleCount
      chapters {
        id
        title
        articleCount
      }
    }
  `,
}
