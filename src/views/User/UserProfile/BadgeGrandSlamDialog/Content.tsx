import { FormattedMessage } from 'react-intl'

import { ReactComponent as IconLeft } from '@/public/static/icons/24px/left.svg'
import { ReactComponent as GrandSlamBackground } from '@/public/static/images/badge-grand-slam-background.svg'
import { Button, Dialog, Icon } from '~/components'

import styles from './styles.module.css'

type BadgeGrandSlamDialogContentProps = {
  closeDialog: () => void
  isNested?: boolean
  goBack?: () => void
}

const BadgeGrandSlamDialogContent = ({
  closeDialog,
  isNested,
  goBack,
}: BadgeGrandSlamDialogContentProps) => {
  return (
    <>
      {isNested && goBack && (
        <Dialog.Header
          title={<span />}
          leftBtn={
            <Button
              onClick={goBack}
              textColor="greyDarker"
              textActiveColor="black"
            >
              <Icon icon={IconLeft} size={20} />
            </Button>
          }
        />
      )}

      <Dialog.Content>
        <section className={styles.container}>
          <section className={styles.badgeIcon}>
            <GrandSlamBackground />
          </section>

          <Dialog.Content.Message align="center" smUpAlign="center">
            <h1 className={styles.title}>
              <FormattedMessage
                defaultMessage="Seven Days Grand Slam"
                id="iNXSkV"
              />
            </h1>
            <p>
              <FormattedMessage
                defaultMessage="Because you continue to write with all your heart, I give you the best honor"
                id="EvJnpb"
              />
            </p>
          </Dialog.Content.Message>
        </section>
      </Dialog.Content>

      <Dialog.Footer
        smUpBtns={
          <>
            <Dialog.TextButton
              text={
                isNested ? (
                  <FormattedMessage defaultMessage="Back" id="cyR7Kh" />
                ) : (
                  <FormattedMessage defaultMessage="Close" id="rbrahO" />
                )
              }
              color="greyDarker"
              onClick={isNested ? goBack : closeDialog}
            />
          </>
        }
      />
    </>
  )
}

export default BadgeGrandSlamDialogContent
