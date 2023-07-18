import classNames from 'classnames'
import React from 'react'
import { FormattedMessage } from 'react-intl'

import { Media } from '~/components'

import { RoundedButton, TextButton } from '../Buttons'
import styles from './styles.module.css'

type FooterProps = {
  noSpacing?: boolean

  btns?: React.ReactNode
  smUpBtns?: React.ReactNode
  closeText?: React.ReactNode
  closeDialog?: () => any
}

const Footer: React.FC<FooterProps> = ({
  noSpacing = true,

  btns,
  smUpBtns,
  closeText,
  closeDialog,
}) => {
  if (!btns && !smUpBtns && !closeDialog) {
    return null
  }

  const text = closeText || <FormattedMessage defaultMessage="Cancel" />

  const footerClasses = classNames({
    [styles.footer]: true,
    [styles.noSpacing]: !!noSpacing,
  })
  const hasBtns = btns || closeDialog
  const hasSmUpBtns = smUpBtns || closeDialog

  return (
    <footer className={footerClasses}>
      <Media at="sm">
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

        {/* show bottom spacing for dialog if there is no buttons,
         * otherwise, the footer will be too close to the content
         */}
        {/* {!hasBtns && <Spacer size="xxloose" />} */}
      </Media>

      {hasSmUpBtns && (
        <Media greaterThan="sm">
          <section className={styles.smUpContent}>
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
