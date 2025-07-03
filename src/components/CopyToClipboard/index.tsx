import * as clipboard from 'clipboard-polyfill'
import { FormattedMessage } from 'react-intl'

import { stripHtml } from '~/common/utils'
import { toast } from '~/components'

interface CopyToClipboardProps {
  text: string
  successMessage?: React.ReactNode
  type?: 'plain' | 'html'
  children: ({
    copyToClipboard,
  }: {
    copyToClipboard: () => void
  }) => React.ReactNode
}

export const CopyToClipboard: React.FC<CopyToClipboardProps> = ({
  text,
  successMessage,
  type = 'plain',
  children,
}) => {
  const copyToClipboard = async function () {
    let item = new clipboard.ClipboardItem({
      'text/plain': new Blob([text], { type: 'text/plain' }),
    })

    if (type === 'html') {
      item = new clipboard.ClipboardItem({
        'text/html': new Blob([text], { type: 'text/html' }),
        'text/plain': new Blob([stripHtml(text)], { type: 'text/plain' }),
      })
    }

    await clipboard.write([item])

    toast.info({
      message: successMessage || (
        <FormattedMessage defaultMessage="Copied successful" id="SYyBFF" />
      ),
    })
  }

  return <>{children({ copyToClipboard })}</>
}
