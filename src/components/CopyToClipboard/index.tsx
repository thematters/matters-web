import C2C from 'react-copy-to-clipboard'
import { FormattedMessage } from 'react-intl'

import { toast } from '~/components'

interface CopyToClipboardProps {
  text: string
  successMessage?: React.ReactNode
}

export const CopyToClipboard: React.FC<
  React.PropsWithChildren<CopyToClipboardProps>
> = ({ text, successMessage, children }) => {
  return (
    <C2C
      text={text}
      onCopy={(_, copied) => {
        if (!copied) {
          toast.error({
            message: (
              <FormattedMessage
                defaultMessage="Failed to copy, please try again."
                id="JRkgKV"
              />
            ),
          })

          return
        }

        toast.success({
          message: successMessage || (
            <FormattedMessage defaultMessage="Copied successful" id="SYyBFF" />
          ),
        })
      }}
    >
      {children}
    </C2C>
  )
}
