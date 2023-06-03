import React from 'react'

import Button from './Button'
import styles from './styles.module.css'

type FooterProps = {
  children?: React.ReactNode
}

const Footer: React.FC<FooterProps> & {
  Button: typeof Button
} = ({ children }) => <footer className={styles.footer}>{children}</footer>

Footer.Button = Button

export default Footer
