import { ReactNode } from 'react'
import { FormattedMessage } from 'react-intl'

import IconCopy from '@/public/static/icons/24px/copy.svg'
import { CopyToClipboard, Icon, Menu } from '~/components'

const CopyCommentButton = ({
  content,
  text,
}: {
  content: string
  text?: ReactNode
}) => {
  return (
    <CopyToClipboard text={content} type="html">
      {({ copyToClipboard }) => (
        <Menu.Item
          text={
            text || (
              <FormattedMessage defaultMessage="Copy comment" id="eY3YIa" />
            )
          }
          icon={<Icon icon={IconCopy} size={20} />}
          onClick={copyToClipboard}
        />
      )}
    </CopyToClipboard>
  )
}

export default CopyCommentButton
