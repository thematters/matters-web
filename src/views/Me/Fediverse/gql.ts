import gql from 'graphql-tag'

export const REMOTE_ACTOR_FIELDS = gql`
  fragment FediverseRemoteActorFields on FediverseRemoteActor {
    actorId
    account
    preferredUsername
    name
    summary
    url
    avatarUrl
    status
  }
`

export const VIEWER_FEDIVERSE = gql`
  query ViewerFediverse {
    viewerFediverse {
      actorId
      handle
      account
      displayName
      summary
      profileUrl
      avatarUrl
      headerUrl
      followersCount
      followingCount
      pendingFollowingCount
      unreadNotificationsCount
      maxFollowing
      retentionDays
      timelineMaxItems
      following {
        ...FediverseRemoteActorFields
      }
      notifications {
        id
        category
        contentId
        objectId
        remoteActorIds
        headline
        preview
        eventCount
        unreadCount
        publishedAt
      }
      timeline {
        objectId
        content
        summary
        url
        inReplyTo
        publishedAt
        remoteActor {
          ...FediverseRemoteActorFields
        }
      }
    }
  }
  ${REMOTE_ACTOR_FIELDS}
`

export const FEDIVERSE_REMOTE_ACTOR = gql`
  query FediverseRemoteActor($input: FediverseRemoteActorInput!) {
    fediverseRemoteActor(input: $input) {
      ...FediverseRemoteActorFields
    }
  }
  ${REMOTE_ACTOR_FIELDS}
`

export const ACT_FEDIVERSE = gql`
  mutation ActFediverse($input: FediverseActionInput!) {
    actFediverse(input: $input) {
      status
      mapping
      activityId
      remoteActorId
    }
  }
`

export const REFRESH_FEDIVERSE_PROFILE = gql`
  mutation RefreshFediverseProfile {
    refreshFediverseProfile
  }
`
