import _get from 'lodash/get'
import _merge from 'lodash/merge'

import { Icon, TextIcon, Translate } from '~/components'
import { Popover } from '~/components/Popper'

import { ANALYTICS_EVENTS } from '~/common/enums'
import { analytics } from '~/common/utils'
import ICON_COLLECTION from '~/static/icons/collection.svg?sprite'

import { ArticleDetail_article } from '../__generated__/ArticleDetail'
import Collection from '../Collection'
import styles from './styles.css'

const IconCollection = () => (
  <Icon
    id={ICON_COLLECTION.id}
    viewBox={ICON_COLLECTION.viewBox}
    size="small"
  />
)

const CollectionMeta = ({
  article,
  count,
  canEditCollection
}: {
  article: ArticleDetail_article
  count: number
  canEditCollection?: boolean
}) => {
  return (
    <Popover
      trigger="click"
      placement="bottom-end"
      content={
        <section className="collection-popover">
          <h3>
            <Translate
              zh_hant={`關聯 ${count} 篇作品`}
              zh_hans={`关联 ${count} 篇作品`}
            />
          </h3>

          <Collection article={article} inPopover canEdit={canEditCollection} />

          <style jsx>{styles}</style>
        </section>
      }
    >
      <button
        type="button"
        className="collection-meta"
        id="collection-meta-hook"
        onClick={() => {
          analytics.trackEvent(ANALYTICS_EVENTS.OPEN_COLLECTION)
        }}
      >
        <TextIcon
          icon={<IconCollection />}
          color="grey"
          spacing="xxtight"
          size="xs"
        >
          {count <= 0 ? (
            <Translate zh_hant="沒有關聯作品" zh_hans="没有关联作品" />
          ) : (
            <>
              <span>
                <Translate zh_hant="關聯" zh_hans="关联" />
              </span>
              <span className="count">&nbsp;{count}&nbsp;</span>
              <span>
                <Translate zh_hant="篇作品" zh_hans="篇作品" />
              </span>
            </>
          )}
        </TextIcon>

        <style jsx>{styles}</style>
      </button>
    </Popover>
  )
}

export default CollectionMeta
