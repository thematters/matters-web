import gql from 'graphql-tag'

const NoticeComment = () => null

NoticeComment.fragments = {
  comment: gql`
    fragment NoticeComment on Comment {
      id
      content
    }
  `
}

export default NoticeComment
