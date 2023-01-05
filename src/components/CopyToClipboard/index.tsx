import C2C from 'react-copy-to-clipboard'

import { ADD_TOAST } from '~/common/enums'
import { Translate } from '~/components'

interface CopyToClipboardProps {
  text: string
}

export const CopyToClipboard: React.FC<
  React.PropsWithChildren<CopyToClipboardProps>
> = ({ text, children }) => {
  return (
    <C2C
      text={text}
      onCopy={(_, copied) => {
        if (!copied) {
          window.dispatchEvent(
            new CustomEvent(ADD_TOAST, {
              detail: {
                color: 'red',
                content: <Translate id="failureCopy" />,
              },
            })
          )
          return
        }

        window.dispatchEvent(
          new CustomEvent(ADD_TOAST, {
            detail: {
              color: 'green',
              content: <Translate id="successCopy" />,
            },
          })
        )
      }}
    >
      {children}
    </C2C>
  )
}
