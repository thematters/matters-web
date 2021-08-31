import { useContext } from 'react'

import {
  Button,
  CopyToClipboard,
  IconCopy16,
  LanguageContext,
} from '~/components'

import { translate } from '~/common/utils'

const CopyButton = ({ text }: { text: string }) => {
  const { lang } = useContext(LanguageContext)

  return (
    <CopyToClipboard text={text}>
      <Button
        spacing={['xtight', 'xtight']}
        bgActiveColor="grey-lighter"
        aria-label={translate({ id: 'copy', lang })}
      >
        <IconCopy16 color="grey" />
      </Button>
    </CopyToClipboard>
  )
}

export default CopyButton
