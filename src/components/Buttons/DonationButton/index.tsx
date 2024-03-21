import { useContext } from 'react'

import { TEST_ID } from '~/common/enums'
import { translate } from '~/common/utils'
import {
  Button,
  IconMoney24,
  LanguageContext,
  TextIcon,
  Translate,
} from '~/components'

interface DonationButtonProps {
  supported: boolean
  onClick?: () => void
  width?: '100%' | '19.5rem'
}

const DonationButton = ({
  supported,
  onClick,
  width = '19.5rem',
}: DonationButtonProps) => {
  const { lang } = useContext(LanguageContext)

  if (supported) {
    return (
      <Button
        size={[width, '2.5rem']}
        bgColor="gold"
        aria-haspopup="dialog"
        aria-label={translate({ id: 'donationAgain', lang })}
        onClick={() => {
          if (onClick) {
            onClick()
          }
        }}
        data-test-id={TEST_ID.ARTICLE_SUPPORT_SUPPORT_BUTTON}
      >
        <TextIcon icon={<IconMoney24 size="mdS" />} color="white" size="md">
          <Translate id="donationAgain" />
        </TextIcon>
      </Button>
    )
  }

  return (
    <Button
      size={[width, '2.5rem']}
      bgColor="gold"
      aria-haspopup="dialog"
      aria-label={translate({ id: 'donation', lang })}
      onClick={() => {
        if (onClick) {
          onClick()
        }
      }}
      data-test-id={TEST_ID.ARTICLE_SUPPORT_SUPPORT_BUTTON}
    >
      <TextIcon icon={<IconMoney24 size="mdS" />} color="white" size="md">
        <Translate id="donation" />
      </TextIcon>
    </Button>
  )
}

export default DonationButton
