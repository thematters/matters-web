import React from 'react'
import { FormattedMessage } from 'react-intl'

import { Media } from '~/components'

import { RoundedButton, TextButton } from '../Buttons'
import styles from './styles.module.css'

type FooterProps = {
  btns?: React.ReactNode
  mdUpBtns?: React.ReactNode
  cancelText?: React.ReactNode
  closeDialog?: () => any
}

const Footer: React.FC<FooterProps> = ({
  btns,
  mdUpBtns,
  cancelText,
  closeDialog,
}) => {
  if (!btns && !mdUpBtns && !closeDialog) {
    return null
  }

  return (
    <>
      {(btns || closeDialog) && (
        <Media at="sm">
          <footer className={styles.footer}>
            {btns}
            {closeDialog && (
              <RoundedButton
                text={
                  cancelText || (
                    <FormattedMessage defaultMessage="Cancel" description="" />
                  )
                }
                color="greyDarker"
                onClick={closeDialog}
              />
            )}
          </footer>
        </Media>
      )}
      {(mdUpBtns || closeDialog) && (
        <Media greaterThan="sm">
          <footer className={styles.smUpFooter}>
            {closeDialog && (
              <TextButton
                text={
                  cancelText || (
                    <FormattedMessage defaultMessage="Cancel" description="" />
                  )
                }
                color="greyDarker"
                onClick={closeDialog}
              />
            )}
            {mdUpBtns}
          </footer>
        </Media>
      )}
    </>
  )
}

export default Footer
