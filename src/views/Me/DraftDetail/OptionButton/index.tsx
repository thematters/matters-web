import { FormattedMessage } from 'react-intl'

import { ReactComponent as IconDrawer } from '@/public/static/icons/24px/drawer.svg'
import { Button, Icon, TextIcon } from '~/components'

export const OptionButton = () => (
  <Button
    size={[null, '2.375rem']}
    spacing={[0, 14]}
    borderRadius={'0.75rem'}
    bgColor="white"
    borderColor="greyHover"
    borderActiveColor="black"
    borderWidth="sm"
    onClick={() => {}}
    aria-haspopup="dialog"
  >
    <TextIcon
      color="black"
      size={14}
      weight="medium"
      icon={<Icon icon={IconDrawer} size={18} />}
      spacing={8}
    >
      <FormattedMessage defaultMessage="Options" id="NDV5Mq" />
    </TextIcon>
  </Button>
)
