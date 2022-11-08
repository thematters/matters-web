import { Button, IconDonate24, TextIcon, Translate } from '~/components'

interface DonationButtonProps {
  supported: boolean
  onClick?: () => void
}

const DonationButton = ({ supported, onClick }: DonationButtonProps) => {
  if (supported) {
    return (
      <Button
        size={['19.5rem', '3rem']}
        bgColor="yellow-lighter"
        borderColor="gold"
        borderWidth="sm"
        onClick={() => {
          if (onClick) {
            onClick()
          }
        }}
      >
        <TextIcon icon={<IconDonate24 />} weight="md" color="gold" size="md">
          <Translate id="donateAgain" />
        </TextIcon>
      </Button>
    )
  }
  return (
    <Button
      size={['19.5rem', '3rem']}
      bgColor="gold-linear-gradient"
      onClick={() => {
        if (onClick) {
          onClick()
        }
      }}
    >
      <TextIcon icon={<IconDonate24 />} weight="md" color="white" size="md">
        <Translate id="donation" />
      </TextIcon>
    </Button>
  )
}

export default DonationButton
