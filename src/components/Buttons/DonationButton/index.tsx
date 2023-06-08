import { useContext } from 'react'

import { TEST_ID } from '~/common/enums'
import { translate } from '~/common/utils'
import {
  Button,
  IconDonate24,
  LanguageContext,
  TextIcon,
  Translate,
} from '~/components'

interface DonationButtonProps {
  supported: boolean
  onClick?: () => void
}

const DonationButton = ({ supported, onClick }: DonationButtonProps) => {
  const { lang } = useContext(LanguageContext)

  if (supported) {
    return (
      <Button
        size={['19.5rem', '3rem']}
        bgColor="yellowLighter"
        borderColor="gold"
        borderWidth="sm"
        aria-haspopup="dialog"
        aria-label={translate({ id: 'donationAgain', lang })}
        onClick={() => {
          if (onClick) {
            onClick()
          }
        }}
        data-test-id={TEST_ID.ARTICLE_SUPPORT_SUPPORT_BUTTON}
      >
        <TextIcon icon={<IconDonate24 />} weight="md" color="gold" size="md">
          <Translate id="donationAgain" />
        </TextIcon>
      </Button>
    )
  }

  return (
    <Button
      size={['19.5rem', '3rem']}
      bgColor="goldLinearGradient"
      aria-haspopup="dialog"
      aria-label={translate({ id: 'donation', lang })}
      onClick={() => {
        if (onClick) {
          onClick()
        }
      }}
      data-test-id={TEST_ID.ARTICLE_SUPPORT_SUPPORT_BUTTON}
    >
      <TextIcon icon={<IconDonate24 />} weight="md" color="white" size="md">
        <Translate id="donation" />
      </TextIcon>
    </Button>
  )
}

export default DonationButton
