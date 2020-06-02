import { useState } from 'react'

import { Button, IconExpand, TextIcon, Translate } from '~/components'

import contentCommentStyles from '~/common/styles/utils/content.comment.css'
import { captureClicks } from '~/common/utils'

import styles from './styles.css'

interface CollapsedProps {
  content: string | null
  collapsedContent: React.ReactNode | string
  className: string
}

const Collapsed = ({
  content,
  collapsedContent,
  className,
}: CollapsedProps) => {
  const [collapsed, setCollapsed] = useState(true)

  if (!collapsed) {
    return (
      <>
        <div
          className={`${className} u-content-comment `}
          dangerouslySetInnerHTML={{
            __html: content || '',
          }}
          onClick={captureClicks}
        />

        <style jsx>{styles}</style>
        <style jsx>{contentCommentStyles}</style>
      </>
    )
  }

  return (
    <p className={`${className} inactive`}>
      <span>{collapsedContent}</span>

      {collapsed && (
        <Button
          spacing={['xxtight', 'xtight']}
          bgActiveColor="grey-lighter"
          onClick={() => {
            setCollapsed(false)
          }}
        >
          <TextIcon
            icon={<IconExpand size="xs" />}
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
