import { useState } from 'react'

import { Icon, TextIcon, Translate } from '~/components'

import contentCommentStyles from '~/common/styles/utils/content.comment.css'

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
          onClick={e => {
            setCollapsed(false)
            e.stopPropagation()
          }}
        >
          <TextIcon
            icon={<Icon.Expand style={{ width: 6, height: 10 }} />}
            spacing="xxtight"
            textPlacement="left"
            weight="normal"
            color="grey"
          >
            <Translate zh_hant="打開" zh_hans="展开" />
          </TextIcon>
        </button>
      )}

      <style jsx>{styles}</style>
    </p>
  )
}

export default Collapsed
