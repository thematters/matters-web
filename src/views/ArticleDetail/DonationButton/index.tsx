import {
  Button,
  DonationDialog,
  Icon,
  LikeCoinDialog,
  TextIcon,
  Translate,
} from '~/components'

import styles from './styles.css'

import { UserDonationRecipient } from '~/components/Dialogs/DonationDialog/__generated__/UserDonationRecipient'

const DonationButton = ({
  recipient,
  targetId,
}: {
  recipient: UserDonationRecipient
  targetId: string
}) => (
  <section className="donation">
    <DonationDialog recipient={recipient} targetId={targetId}>
      {({ open }) => (
        <Button
          size={['10.5rem', '2.5rem']}
          bgColor="red"
          onClick={open}
        >
          <TextIcon icon={<Icon.Heart size="sm" />} weight="md" color="white">
            <Translate id="donation" />
          </TextIcon>
        </Button>
      )}
    </DonationDialog>

    {/* add donation list */}

    <LikeCoinDialog allowEventTrigger />

    <style jsx>{styles}</style>
  </section>
)

export default DonationButton
