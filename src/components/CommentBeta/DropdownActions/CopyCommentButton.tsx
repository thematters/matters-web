import { FormattedMessage } from 'react-intl'

import { CopyToClipboard, IconCopy16, Menu } from '~/components'

const CopyCommentButton = ({ content }: { content: string }) => {
  return (
    <CopyToClipboard text={content}>
      <Menu.Item
        text={<FormattedMessage defaultMessage="Copy comment" id="eY3YIa" />}
        icon={<IconCopy16 size="mdS" />}
      />
    </CopyToClipboard>
  )
}

export default CopyCommentButton
