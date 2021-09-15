import gql from 'graphql-tag'

export const fragments = {
  topic: gql`
    fragment TopicCountsTopic on Topic {
      id
      articleCount
      chapterCount
    }
  `,
}
