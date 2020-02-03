import { useState } from 'react'

import { Button, Icon, TextIcon, Translate } from '~/components'

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
        <Button
          size={[null, '1.25rem']}
          spacing={[0, 'xtight']}
          bgHoverColor="grey-lighter"
          className="expand-button"
          onClick={() => {
            setCollapsed(false)
          }}
        >
          <TextIcon
            icon={<Icon.Expand size="xs" />}
            textPlacement="left"
            weight="normal"
            color="grey"
          >
            <Translate zh_hant="打開" zh_hans="展开" />
          </TextIcon>
        </Button>
      )}

      <style jsx>{styles}</style>
    </p>
  )
}

export default Collapsed
