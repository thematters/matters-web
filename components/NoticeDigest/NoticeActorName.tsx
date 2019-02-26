import gql from 'graphql-tag'

const NoticeActorName = () => null

NoticeActorName.fragments = {
  user: gql`
    fragment NoticeActorNameUser on User {
      id
      userName
    }
  `
}

export default NoticeActorName
