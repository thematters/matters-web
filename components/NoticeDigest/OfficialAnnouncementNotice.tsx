import gql from 'graphql-tag'

const OfficialAnnouncementNotice = () => null

OfficialAnnouncementNotice.fragments = {
  notice: gql`
    fragment OfficialAnnouncementNotice on OfficialAnnouncementNotice {
      link
      message
    }
  `
}

export default OfficialAnnouncementNotice
