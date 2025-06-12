import classNames from 'classnames'
import React from 'react'
import { FormattedMessage } from 'react-intl'

import { Media } from '~/components'
import { RoundedButton, TextButton } from '~/components/Dialog/Buttons'

import styles from './styles.module.css'

type FooterProps = {
  btns?: React.ReactNode
  smUpBtns?: React.ReactNode
  closeText?: React.ReactNode
  closeDialog?: () => void
}

const Footer: React.FC<FooterProps> = ({
  btns,
  smUpBtns,
  closeText,
  closeDialog,
}) => {
  if (!btns && !smUpBtns && !closeDialog) {
    return null
  }

  const text = closeText || (
    <FormattedMessage defaultMessage="Cancel" id="47FYwb" />
  )

  const footerClasses = classNames({
    [styles.footer]: true,
  })
  const hasBtns = btns || closeDialog
  const hasSmUpBtns = smUpBtns || closeDialog

  const smUpContentClasses = classNames({
    [styles.smUpContent]: true,
  })

  return (
    <footer className={footerClasses} data-dialog-entity={!!hasBtns}>
      <Media lessThan="md">
        {hasBtns && (
          <section className={styles.content}>
            {btns}
            {closeDialog && (
              <RoundedButton
                text={text}
                color="greyDarker"
                onClick={closeDialog}
              />
            )}
          </section>
        )}
      </Media>
      {hasSmUpBtns && (
        <Media greaterThanOrEqual="md">
          <section className={smUpContentClasses}>
            {closeDialog && (
              <TextButton
                text={text}
                color="greyDarker"
                onClick={closeDialog}
              />
            )}
            {smUpBtns}
          </section>
        </Media>
      )}
    </footer>
  )
}

export default Footer
