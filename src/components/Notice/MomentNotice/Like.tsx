// 1. Your moment was liked by {username}
import gql from 'graphql-tag'
import { FormattedMessage } from 'react-intl'

import { TEST_ID } from '~/common/enums'
import { LikeMomentNoticeFragment } from '~/gql/graphql'

import NoticeActorAvatar from '../NoticeActorAvatar'
import NoticeDate from '../NoticeDate'
import NoticeDigest from '../NoticeDigest'
import NoticeHeadActors from '../NoticeHeadActors'
import NoticeMomentTitle from '../NoticeMomentTitle'

function extractTextFromHTML(htmlString: string) {
  const parser = new DOMParser()
  const doc = parser.parseFromString(htmlString, 'text/html')
  return doc.body.textContent || ''
}

const Like = ({ notice }: { notice: LikeMomentNoticeFragment }) => {
  const truncateTitle = (title: string, maxLength: number) => {
    const regex = /@[\w]+/g
    const taggedUsers: string[] = title.match(regex) || []
    const taggedUsersLength = taggedUsers.reduce(
      (totalLength, user) => totalLength + user.length,
      0
    )
    const remainingLength = maxLength - taggedUsersLength

    if (title.length <= remainingLength) {
      return title
    }

    const truncatedTitle = title.slice(0, remainingLength) + '...'
    const truncatedTaggedUsers = taggedUsers
      .map((user) => user.slice(0, remainingLength))
      .join('')

    return truncatedTitle + truncatedTaggedUsers
  }

  const title = truncateTitle(
    extractTextFromHTML(notice.moment?.content || ''),
    10
  )

  const images = notice.moment?.assets?.length
    ? notice.moment.assets.map((asset) => `[${asset.type}]`).join('')
    : ''

  return (
    <NoticeDigest
      notice={notice}
      action={
        <FormattedMessage defaultMessage="liked your moment" id="/5OvMK" />
      }
      title={
        <NoticeMomentTitle title={`${title}${images}`} moment={notice.moment} />
      }
      testId={TEST_ID.NOTICE_MOMENT_LIKED}
    />
  )
}

Like.fragments = {
  notice: gql`
    fragment LikeMomentNotice on MomentNotice {
      id
      ...NoticeDate
      actors {
        ...NoticeActorAvatarUser
        ...NoticeHeadActorsUser
      }
      moment: target {
        id
        liked
        content
        shortHash
        assets {
          id
          type
        }
      }
    }
    ${NoticeActorAvatar.fragments.user}
    ${NoticeHeadActors.fragments.user}
    ${NoticeDate.fragments.notice}
  `,
}

export default Like
