import classNames from 'classnames'
import gql from 'graphql-tag'
import Link from 'next/link'

import { DateTime, Icon, TextIcon, Title, Translate } from '~/components'

import { toPath } from '~/common/utils'
import ICON_DOT_DIVIDER from '~/static/icons/dot-divider.svg?sprite'
import ICON_HELP from '~/static/icons/help.svg?sprite'

import { FeedDigestDraft } from './__generated__/FeedDigestDraft'
import DeleteButton from './Components/DeleteButton'
import ErrorState from './Components/ErrorState'
import PendingState from './Components/PendingState'
import RecallButton from './Components/RecallButton'
import RetryButton from './Components/RetryButton'
import styles from './styles.css'

const fragments = {
  draft: gql`
    fragment FeedDigestDraft on Draft {
      id
      title
      summary
      slug
      scheduledAt
      createdAt
      publishState
    }
  `
}

const IconHelp = () => (
  <Icon
    id={ICON_HELP.id}
    viewBox={ICON_HELP.viewBox}
    style={{ width: 14, height: 14 }}
  />
)
const IconDotDivider = () => (
  <Icon
    id={ICON_DOT_DIVIDER.id}
    viewBox={ICON_DOT_DIVIDER.viewBox}
    style={{ width: 18, height: 18 }}
  />
)

const FeedDigest = ({ draft }: { draft: FeedDigestDraft }) => {
  const { id, title, summary, publishState, createdAt, slug } = draft
  const isPending = publishState === 'pending'
  const isError = publishState === 'error'
  const isUnpublished = publishState === 'unpublished'
  const path = toPath({
    page: 'draftDetail',
    slug,
    id
  })
  const containerClasses = classNames({
    container: true,
    [publishState]: true
  })

  return (
    <section className={containerClasses}>
      {(isPending || isError) && (
        <div className="header">
          <span />
          {isPending && <PendingState draft={draft} />}
          {isError && <ErrorState />}
        </div>
      )}

      <div className="content">
        <div className="title">
          <Link {...path}>
            <a>
              <Title type="feed" is="h2">
                {title}
              </Title>
            </a>
          </Link>
        </div>

        <div className="description">
          <Link {...path}>
            <a>
              <p>{summary}</p>
            </a>
          </Link>

          {isUnpublished && (
            <footer className="actions">
              <DateTime date={createdAt} type="relative" />
              <IconDotDivider />
              <DeleteButton id={id} />
            </footer>
          )}
        </div>
      </div>

      {isPending && (
        <footer className="extra">
          <p>
            <TextIcon icon={<IconHelp />}>
              <Translate
                zh_hant="上鏈後不可修改和刪除"
                zh_hans="上链后不可修改和删除"
              />
            </TextIcon>
          </p>
          <RecallButton
            id={id}
            text={<Translate zh_hant="撤銷" zh_hans="撤销" />}
          />
        </footer>
      )}

      {isError && (
        <footer className="extra">
          <p>
            <TextIcon icon={<IconHelp />}>
              <Translate
                zh_hant="文章已存至草稿箱，請檢查網絡後重試。"
                zh_hans="文章已存至草稿箱，请检查网络后重试。"
              />
            </TextIcon>
          </p>
          <div>
            <RecallButton id={id} />
            <RetryButton id={id} />
          </div>
        </footer>
      )}

      <style jsx>{styles}</style>
    </section>
  )
}

FeedDigest.fragments = fragments

export default FeedDigest
