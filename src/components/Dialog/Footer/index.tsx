import React from 'react'

import Button from './Button'
import styles from './styles.css'

type FooterProps = {
  children?: React.ReactNode
}

const Footer: React.FC<FooterProps> & {
  Button: typeof Button
} = ({ children }) => (
  <footer>
    {children}

    <style jsx>{styles}</style>
  </footer>
)

Footer.Button = Button

export default Footer
