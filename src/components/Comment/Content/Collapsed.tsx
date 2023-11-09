import classNames from 'classnames'
import { useState } from 'react'
import { FormattedMessage } from 'react-intl'

import { TEST_ID } from '~/common/enums'
import { captureClicks } from '~/common/utils'
import { Button, IconArrowDown16, TextIcon } from '~/components'

import styles from './styles.module.css'

interface CollapsedProps {
  content?: string | null
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
      <div
        className={`${className} u-content-comment`}
        dangerouslySetInnerHTML={{
          __html: content || '',
        }}
        onClick={captureClicks}
        data-test-id={TEST_ID.COMMENT_CONETNT}
      />
    )
  }

  const inActiveClasses = classNames({
    [styles.inactive]: true,
    [className]: true,
    'u-content-comment': true,
  })

  return (
    <p className={inActiveClasses}>
      <span>{collapsedContent}</span>

      {collapsed && (
        <Button
          spacing={['xxtight', 'xtight']}
          bgActiveColor="greyLighter"
          onClick={() => {
            setCollapsed(false)
          }}
        >
          <TextIcon
            icon={<IconArrowDown16 size="xs" />}
            textPlacement="left"
            weight="normal"
            color="greyDarker"
          >
            <FormattedMessage defaultMessage="Expand" id="0oLj/t" />
          </TextIcon>
        </Button>
      )}
    </p>
  )
}

export default Collapsed
