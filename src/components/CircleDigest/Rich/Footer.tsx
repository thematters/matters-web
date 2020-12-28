import Counts from '../Counts'
import Price from '../Price'
import styles from './styles.css'

export type FooterControls = {
  hasPrice?: boolean
}

export type FooterProps = {
  // circle: FooterCircle
  circle: any
} & FooterControls

const Footer: React.FC<FooterProps> = ({ circle, hasPrice }) => {
  return (
    <footer>
      <Counts circle={circle} />

      {hasPrice && <Price circle={circle} />}

      <style jsx>{styles}</style>
    </footer>
  )
}

export default Footer
