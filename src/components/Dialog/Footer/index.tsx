import React from 'react'
import { FormattedMessage } from 'react-intl'

import { Media } from '~/components'

import { RoundedButton, TextButton } from '../Buttons'
import styles from './styles.module.css'

type FooterProps = {
  btns?: React.ReactNode
  smUpBtns?: React.ReactNode
  cancelText?: React.ReactNode
  closeDialog?: () => any
}

const Footer: React.FC<FooterProps> = ({
  btns,
  smUpBtns,
  cancelText,
  closeDialog,
}) => {
  if (!btns && !smUpBtns && !closeDialog) {
    return null
  }

  const text = cancelText || (
    <FormattedMessage defaultMessage="Cancel" description="" />
  )

  return (
    <>
      {(btns || closeDialog) && (
        <Media at="sm">
          <footer className={styles.footer}>
            {btns}
            {closeDialog && (
              <RoundedButton
                text={text}
                color="greyDarker"
                onClick={closeDialog}
              />
            )}
          </footer>
        </Media>
      )}
      {(smUpBtns || closeDialog) && (
        <Media greaterThan="sm">
          <footer className={styles.smUpFooter}>
            {closeDialog && (
              <TextButton
                text={text}
                color="greyDarker"
                onClick={closeDialog}
              />
            )}
            {smUpBtns}
          </footer>
        </Media>
      )}
    </>
  )
}

export default Footer
