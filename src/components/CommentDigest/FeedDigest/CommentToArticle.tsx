import _get from 'lodash/get'

import { FeedDigestComment } from '~/components/GQL/fragments/__generated__/FeedDigestComment'
import { FolloweeFeedDigestComment } from '~/components/GQL/fragments/__generated__/FolloweeFeedDigestComment'
import { Translate } from '~/components/Language'

import { TEXT } from '~/common/enums'

import styles from './styles.css'

const CommentToArticle = ({
  comment
}: {
  comment: FeedDigestComment | FolloweeFeedDigestComment
}) => {
  if (!comment.article) {
    return null
  }

  return (
    <>
      <span className="published-description">
        <Translate
          zh_hant={TEXT.zh_hant.commentPublishedDescription}
          zh_hans={TEXT.zh_hans.commentPublishedDescription}
        />
      </span>

      <style jsx>{styles}</style>
    </>
  )
}

export default CommentToArticle
