import { useContext } from 'react'

import { translate } from '~/common/utils'
import {
  Button,
  CopyToClipboard,
  IconCopy16,
  LanguageContext,
} from '~/components'

export const CopyButton: React.FC<
  React.PropsWithChildren<{ text: string }>
> = ({ text, children }) => {
  const { lang } = useContext(LanguageContext)

  return (
    <>
      {children}
      <CopyToClipboard text={text}>
        <Button
          spacing={['xtight', 'xtight']}
          bgActiveColor="grey-lighter"
          aria-label={translate({ id: 'copy', lang })}
        >
          <IconCopy16 color="grey" />
        </Button>
      </CopyToClipboard>
    </>
  )
}
