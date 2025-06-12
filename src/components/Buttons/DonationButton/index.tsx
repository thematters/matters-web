import { FormattedMessage, useIntl } from 'react-intl'

import IconMoney from '@/public/static/icons/24px/money.svg'
import { TEST_ID } from '~/common/enums'
import { Button, Icon, TextIcon } from '~/components'

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
  const intl = useIntl()

  if (supported) {
    return (
      <Button
        size={[width, '2.5rem']}
        bgColor="gold"
        aria-haspopup="dialog"
        aria-label={intl.formatMessage({
          defaultMessage: 'Support Again',
          id: 'fKkBPz',
        })}
        onClick={() => {
          if (onClick) {
            onClick()
          }
        }}
        data-test-id={TEST_ID.ARTICLE_SUPPORT_SUPPORT_BUTTON}
      >
        <TextIcon
          icon={<Icon icon={IconMoney} size={20} />}
          color="white"
          size={16}
        >
          <FormattedMessage defaultMessage="Support Again" id="fKkBPz" />
        </TextIcon>
      </Button>
    )
  }

  return (
    <Button
      size={[width, '2.5rem']}
      bgColor="gold"
      aria-haspopup="dialog"
      aria-label={intl.formatMessage({
        defaultMessage: 'Support Author',
        id: 'ezYuE2',
      })}
      onClick={() => {
        if (onClick) {
          onClick()
        }
      }}
      data-test-id={TEST_ID.ARTICLE_SUPPORT_SUPPORT_BUTTON}
    >
      <TextIcon
        icon={<Icon icon={IconMoney} size={20} />}
        color="white"
        size={16}
      >
        <FormattedMessage defaultMessage="Support Author" id="ezYuE2" />
      </TextIcon>
    </Button>
  )
}

export default DonationButton
