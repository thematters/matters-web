import { useIntl } from 'react-intl'

import { Button, CopyToClipboard, IconCopy16 } from '~/components'

export const CopyButton: React.FC<
  React.PropsWithChildren<{ text: string }>
> = ({ text, children }) => {
  const intl = useIntl()

  return (
    <>
      {children}
      <CopyToClipboard text={text}>
        <Button
          spacing={['xtight', 'xtight']}
          bgActiveColor="greyLighter"
          aria-label={intl.formatMessage({
            defaultMessage: 'Copy',
            id: '4l6vz1',
          })}
        >
          <IconCopy16 color="grey" />
        </Button>
      </CopyToClipboard>
    </>
  )
}
