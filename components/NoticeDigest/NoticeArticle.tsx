import gql from 'graphql-tag'

const NoticeArticle = () => null

NoticeArticle.fragments = {
  article: gql`
    fragment NoticeArticle on Article {
      id
      title
      slug
      mediaHash
      author {
        id
        userName
      }
    }
  `
}

export default NoticeArticle
