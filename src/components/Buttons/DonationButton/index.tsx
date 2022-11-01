import { Button, IconDonate24, TextIcon, Translate } from '~/components'

interface DonationButtonProps {
  supported: boolean
  onClick?: () => void
}

const DonationButton = ({ supported, onClick }: DonationButtonProps) => {
  return (
    <>
      {supported && (
        <Button
          size={['10.5rem', '2.5rem']}
          bgColor="yellow-lighter"
          borderColor="gold"
          borderWidth="sm"
          onClick={() => {
            if (onClick) {
              onClick()
            }
          }}
        >
          <TextIcon icon={<IconDonate24 />} weight="md" color="gold">
            <Translate id="donationAgain" />
          </TextIcon>
        </Button>
      )}
      {!supported && (
        <Button
          size={['10.5rem', '2.5rem']}
          bgColor="gold-linear-gradient"
          onClick={() => {
            if (onClick) {
              onClick()
            }
          }}
        >
          <TextIcon icon={<IconDonate24 />} weight="md" color="white">
            <Translate id="donation" />
          </TextIcon>
        </Button>
      )}
    </>
  )
}

export default DonationButton
