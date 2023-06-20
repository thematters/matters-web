import React from 'react'
import { FormattedMessage } from 'react-intl'

import { Media, Spacer } from '~/components'

import { RoundedButton, TextButton } from '../Buttons'
import styles from './styles.module.css'

type FooterProps = {
  btns?: React.ReactNode
  smUpBtns?: React.ReactNode
  closeText?: React.ReactNode
  closeDialog?: () => any
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
    <FormattedMessage defaultMessage="Cancel" description="" />
  )

  const hasBtns = btns || closeDialog
  const hasSmUpBtns = smUpBtns || closeDialog

  return (
    <>
      <Media at="sm">
        {hasBtns && (
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
        )}

        {/* show bottom spacing for dialog if there is no buttons,
         * otherwise, the footer will be too close to the content
         */}
        {!hasBtns && <Spacer size="xxloose" />}
      </Media>

      {hasSmUpBtns && (
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
