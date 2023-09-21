import classNames from 'classnames'
import React from 'react'
import { FormattedMessage } from 'react-intl'

import { Media } from '~/components'

import { RoundedButton, TextButton } from '../Buttons'
import styles from './styles.module.css'

type FooterProps = {
  btns?: React.ReactNode
  smUpBtns?: React.ReactNode
  // smUpContentNoSpacingBottom?: boolean
  // smUpSpaceBetween?: boolean
  closeText?: React.ReactNode
  closeDialog?: () => any
}

const Footer: React.FC<FooterProps> = ({
  btns,
  smUpBtns,
  // smUpContentNoSpacingBottom = false,
  // smUpSpaceBetween = false,
  closeText,
  closeDialog,
}) => {
  if (!btns && !smUpBtns && !closeDialog) {
    return null
  }

  const text = closeText || <FormattedMessage defaultMessage="Cancel" />

  const footerClasses = classNames({
    [styles.footer]: true,
  })
  const hasBtns = btns || closeDialog
  const hasSmUpBtns = smUpBtns || closeDialog

  const smUpContentClasses = classNames({
    [styles.smUpContent]: true,
    // [styles.smUpSpaceBetween]: !!smUpSpaceBetween,
    // [styles.smUpContentNoSpacingBottom]: !!smUpContentNoSpacingBottom,
  })

  const SmUpBtns = () => (
    <>
      {hasSmUpBtns && (
        <Media greaterThan="sm">
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
    </>
  )

  if (hasBtns) {
    return (
      <footer className={footerClasses} data-dialog-entity>
        <Media at="sm">
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
        </Media>

        <SmUpBtns />
      </footer>
    )
  }

  return (
    <footer className={footerClasses}>
      <SmUpBtns />
    </footer>
  )
}

export default Footer
