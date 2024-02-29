import { FormattedMessage } from 'react-intl'

import { CopyToClipboard, IconCopy16, Menu } from '~/components'

const CopyCommentButton = ({ content }: { content: string }) => {
  return (
    <CopyToClipboard text={content} type="html">
      {({ copyToClipboard }) => (
        <Menu.Item
          text={<FormattedMessage defaultMessage="Copy comment" id="eY3YIa" />}
          icon={<IconCopy16 size="mdS" />}
          onClick={copyToClipboard}
        />
      )}
    </CopyToClipboard>
  )
}

export default CopyCommentButton
