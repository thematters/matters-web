import classNames from 'classnames'
import { FormattedMessage } from 'react-intl'

import { Dialog } from '~/components'

import { ShareButtons } from './Buttons'
import Copy from './Copy'
import styles from './styles.module.css'

export interface ShareDialogContentProps {
  closeDialog: () => void

  shareTitle: string
  shareLink: string

  headerTitle?: React.ReactNode
  description?: React.ReactNode
  btns?: React.ReactNode
  smUpBtns?: React.ReactNode
}

const ShareDialogContent: React.FC<ShareDialogContentProps> = ({
  closeDialog,

  shareTitle,
  shareLink,

  headerTitle,
  description,
  btns,
  smUpBtns,
}) => {
  const url = new URL(shareLink)
  if (url.searchParams.get('locale')) {
    description = (
      <FormattedMessage
        defaultMessage="Share this article in translated version"
        id="lNWFnL"
      />
    )
  }
  const containerClasses = classNames({
    [styles.socialsContainer]: true,
  })
  return (
    <>
      {headerTitle ? (
        <Dialog.Header title={headerTitle} />
      ) : (
        <Dialog.Header
          title={<FormattedMessage defaultMessage="Share" id="OKhRC6" />}
        />
      )}

      <Dialog.Content noSpacing smExtraSpacing={false}>
        {description && (
          <section className={styles.description}>{description}</section>
        )}

        <section className={containerClasses}>
          <section className={styles.left}>
            <ShareButtons.Twitter title={shareTitle} link={shareLink} />
            <ShareButtons.Facebook link={shareLink} />
            <ShareButtons.LINE title={shareTitle} link={shareLink} />
          </section>

          <section className={styles.right}>
            <ShareButtons.Threads title={shareTitle} link={shareLink} />
            <ShareButtons.Telegram title={shareTitle} link={shareLink} />
            <Copy link={shareLink} />
          </section>
        </section>
      </Dialog.Content>

      {btns || smUpBtns ? (
        <Dialog.Footer btns={btns} smUpBtns={smUpBtns} />
      ) : (
        <Dialog.Footer
          btns={
            <Dialog.RoundedButton
              text={<FormattedMessage defaultMessage="Close" id="rbrahO" />}
              color="greyDarker"
              onClick={closeDialog}
            />
          }
          smUpBtns={
            <Dialog.TextButton
              text={<FormattedMessage defaultMessage="Close" id="rbrahO" />}
              color="greyDarker"
              onClick={closeDialog}
            />
          }
        />
      )}
    </>
  )
}

export default ShareDialogContent
