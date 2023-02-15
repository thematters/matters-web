import { FormattedMessage, useIntl } from 'react-intl'

import { TEST_ID } from '~/common/enums'
import {
  Button,
  IconDonate24,
  TextIcon,
} from '~/components'

interface DonationButtonProps {
  supported: boolean
  onClick?: () => void
}

const DonationButton = ({ supported, onClick }: DonationButtonProps) => {

  const intl = useIntl()

  if (supported) {
    return (
      <Button
        size={['19.5rem', '3rem']}
        bgColor="yellow-lighter"
        borderColor="gold"
        borderWidth="sm"
        aria-haspopup="dialog"
        aria-label={
          intl.formatMessage({
            defaultMessage: 'Support Again',
            description: 'src/components/Buttons/DonationButton/index.tsx'
          })}
        onClick={() => {
          if (onClick) {
            onClick()
          }
        }}
        data-test-id={TEST_ID.ARTICLE_SUPPORT_SUPPORT_BUTTON}
      >
        <TextIcon icon={<IconDonate24 />} weight="md" color="gold" size="md">
          <FormattedMessage defaultMessage="Support Again" description="src/components/Buttons/DonationButton/index.tsx" />
        </TextIcon>
      </Button>
    )
  }

  return (
    <Button
      size={['19.5rem', '3rem']}
      bgColor="gold-linear-gradient"
      aria-haspopup="dialog"
      aria-label={
        intl.formatMessage({
          defaultMessage: 'Support Author',
          description: 'src/components/Buttons/DonationButton/index.tsx'
        })}
      onClick={() => {
        if (onClick) {
          onClick()
        }
      }}
      data-test-id={TEST_ID.ARTICLE_SUPPORT_SUPPORT_BUTTON}
    >
      <TextIcon icon={<IconDonate24 />} weight="md" color="white" size="md">
        <FormattedMessage defaultMessage="Support Author"
          description="src/components/Buttons/DonationButton/index.tsx"
        />
      </TextIcon>
    </Button>
  )
}

export default DonationButton
