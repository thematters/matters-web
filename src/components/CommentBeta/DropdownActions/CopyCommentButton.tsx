import * as clipboard from 'clipboard-polyfill'
import { FormattedMessage } from 'react-intl'

import { IconCopy16, Menu, toast } from '~/components'

const CopyCommentButton = ({ content }: { content: string }) => {
  const copyHtmlToClipboard = async function () {
    const item = new clipboard.ClipboardItem({
      'text/html': new Blob([content], { type: 'text/html' }),
    })
    await clipboard.write([item])

    toast.success({
      message: (
        <FormattedMessage defaultMessage="Copied successful" id="SYyBFF" />
      ),
    })
  }

  return (
    <Menu.Item
      text={<FormattedMessage defaultMessage="Copy comment" id="eY3YIa" />}
      icon={<IconCopy16 size="mdS" />}
      onClick={copyHtmlToClipboard}
    />
  )
}

export default CopyCommentButton
