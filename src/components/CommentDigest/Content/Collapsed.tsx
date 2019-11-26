import { useState } from 'react'

import { Icon } from '~/components/Icon'
import { Translate } from '~/components/Language'
import { TextIcon } from '~/components/TextIcon'

import contentCommentStyles from '~/common/styles/utils/content.comment.css'
import ICON_EXPAND from '~/static/icons/expand.svg?sprite'

import styles from './styles.css'

const Collapsed = ({
  content,
  collapsedContent
}: {
  content: string | null
  collapsedContent: React.ReactNode | string
}) => {
  const [collapsed, setCollapsed] = useState(true)

  if (!collapsed) {
    return (
      <>
        <div
          className="u-content-comment"
          dangerouslySetInnerHTML={{
            __html: content || ''
          }}
        />

        <style jsx>{styles}</style>
        <style jsx>{contentCommentStyles}</style>
      </>
    )
  }

  return (
    <p className="inactive-content">
      {collapsedContent}

      {collapsed && (
        <button
          className="expand-button"
          type="button"
          onClick={() => setCollapsed(false)}
        >
          <TextIcon
            icon={
              <Icon
                id={ICON_EXPAND.id}
                viewBox={ICON_EXPAND.viewBox}
                style={{ width: 6, height: 10 }}
              />
            }
            size="sm"
            spacing="xxtight"
            textPlacement="left"
            weight="normal"
            color="grey"
          >
            <Translate zh_hant="展開" zh_hans="展开" />
          </TextIcon>
        </button>
      )}

      <style jsx>{styles}</style>
    </p>
  )
}

export default Collapsed
