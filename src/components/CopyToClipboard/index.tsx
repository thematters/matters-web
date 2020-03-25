import C2C from 'react-copy-to-clipboard'

import { Translate } from '~/components'

import { ADD_TOAST } from '~/common/enums'

interface CopyToClipboardProps {
  text: string
}

export const CopyToClipboard: React.FC<CopyToClipboardProps> = ({
  text,
  children,
}) => {
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
