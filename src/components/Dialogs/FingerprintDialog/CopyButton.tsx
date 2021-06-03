import { Button, CopyToClipboard, IconCopy16 } from '~/components'

import { TEXT } from '~/common/enums'

const CopyButton = ({ text }: { text: string }) => (
  <CopyToClipboard text={text}>
    <Button
      spacing={['xtight', 'xtight']}
      bgActiveColor="grey-lighter"
      aira-label={TEXT.zh_hant.copy}
    >
      <IconCopy16 color="grey" />
    </Button>
  </CopyToClipboard>
)

export default CopyButton
