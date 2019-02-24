import classNames from 'classnames'
import gql from 'graphql-tag'
import Link from 'next/link'

import { Icon, TextIcon, Title, Translate } from '~/components'

import { toPath } from '~/common/utils'
import ICON_HELP from '~/static/icons/help.svg?sprite'

import { FeedDigestDraft } from './__generated__/FeedDigestDraft'
import styles from './styles.css'

const fragments = {
  draft: gql`
    fragment FeedDigestDraft on Draft {
      id
      title
      summary
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

const FeedDigest = ({ draft }: { draft: FeedDigestDraft }) => {
  const { id, title, summary, publishState } = draft

  const path = toPath({
    page: 'draftDetail',
    id
  })
  const containerClasses = classNames({
    container: true,
    [publishState]: true
  })

  return (
    <section className={containerClasses}>
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
        </div>
      </div>

      {publishState === 'pending' && (
        <div className="extra">
          <p>
            <TextIcon icon={<IconHelp />}>
              <Translate
                zh_hant="上鏈後不可修改和刪除"
                zh_hans="上链后不可修改和删除"
              />
            </TextIcon>
          </p>
          <button type="button" onClick={() => alert('revert')}>
            <Translate zh_hant="撤銷" zh_hans="撤销" />
          </button>
        </div>
      )}

      {publishState === 'error' && (
        <div className="extra">
          <p>
            <TextIcon icon={<IconHelp />}>
              <Translate
                zh_hant="文章已存至草稿箱，請檢查網絡後重試。"
                zh_hans="文章已存至草稿箱，请检查网络后重试。"
              />
            </TextIcon>
          </p>
          <div>
            <button type="button" onClick={() => alert('cancel')}>
              <Translate zh_hant="取消" zh_hans="取消" />
            </button>
            <button type="button" onClick={() => alert('retry')}>
              <Translate zh_hant="重試" zh_hans="重试" />
            </button>
          </div>
        </div>
      )}

      <style jsx>{styles}</style>
    </section>
  )
}

FeedDigest.fragments = fragments

export default FeedDigest
