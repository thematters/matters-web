import gql from 'graphql-tag'
import Link from 'next/link'
import { FormattedMessage, useIntl } from 'react-intl'

import { MOMENT_DIGEST_REFERRER } from '~/common/enums/moment'
import { sessionStorage, toPath } from '~/common/utils'
import { toast, useRoute } from '~/components'
import { CommentContent } from '~/components/Comment/Content'
import { NoticeCommentFragment } from '~/gql/graphql'

import ContentCard from '../ContentCard'
import styles from './styles.module.css'

const fragments = {
  comment: gql`
    fragment CommentCardComment on Comment {
      id
      state
      type
      node {
        ... on Article {
          id
          title
          slug
          articleState: state
          shortHash
          author {
            id
            userName
          }
        }
        ... on Circle {
          id
          name
        }
        ... on Moment {
          id
          momentState: state
          shortHash
        }
      }
      parentComment {
        id
      }
      comments(input: { first: 0 }) {
        totalCount
      }
      ...CommentContentCommentPublic
      ...CommentContentCommentPrivate
    }
    ${CommentContent.fragments.comment.public}
    ${CommentContent.fragments.comment.private}
  `,
}

const CommentCard = ({
  comment,
  color = 'black',
  line = 2,
}: {
  comment: NoticeCommentFragment | null
  color?: 'black' | 'grey'
  line?: number
}) => {
  const intl = useIntl()
  const { router } = useRoute()

  const article =
    comment?.node.__typename === 'Article' ? comment.node : undefined
  const circle =
    comment?.node.__typename === 'Circle' ? comment.node : undefined
  const moment =
    comment?.node.__typename === 'Moment' ? comment.node : undefined

  const setReferrer = () => {
    sessionStorage.set(MOMENT_DIGEST_REFERRER, true)
  }

  const goToMomentDetail = () => {
    setReferrer()
    router.push(path.href)
  }

  if (!comment) {
    return null
  }

  if (comment.state === 'archived' && moment) {
    return (
      <section>
        <ContentCard
          content={intl.formatMessage({
            defaultMessage: 'Comment deleted',
            description: 'src/components/Notice/NoticeComment.tsx/moment',
            id: 'Ci7dxf',
          })}
          color={color}
          hasStrike={true}
        />
      </section>
    )
  }

  if (
    comment.state === 'active' &&
    moment &&
    moment.momentState === 'archived'
  ) {
    return (
      <a
        className={styles.toast}
        onClick={(e) => {
          e.preventDefault()
          toast.info({
            message: (
              <FormattedMessage defaultMessage="Moment deleted" id="5mu8HJ" />
            ),
          })
        }}
      >
        <ContentCard
          content={comment.content || ''}
          color={color}
          line={line}
        />
      </a>
    )
  }

  const path =
    article || circle
      ? toPath({
          page: 'commentDetail',
          comment,
          article,
          circle,
        })
      : moment
        ? toPath({
            page: 'momentComment',
            moment,
            comment,
          })
        : {
            href: '',
            as: '',
          }

  if (moment) {
    return (
      <a
        href={path.href}
        onClick={(e) => {
          e.preventDefault()
          goToMomentDetail()
        }}
      >
        <ContentCard
          content={comment.content || ''}
          color={color}
          line={line}
        />
      </a>
    )
  }

  return (
    <Link {...path}>
      <section>
        <ContentCard
          content={comment.content || ''}
          color={color}
          line={line}
        />
      </section>
    </Link>
  )
}

CommentCard.fragments = fragments

export default CommentCard
