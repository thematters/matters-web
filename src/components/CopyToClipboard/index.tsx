import C2C from 'react-copy-to-clipboard'

import { toast, Translate } from '~/components'

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
            message: <Translate id="failureCopy" />,
          })

          return
        }

        toast.success({
          message: successMessage || <Translate id="successCopy" />,
        })
      }}
    >
      {children}
    </C2C>
  )
}
