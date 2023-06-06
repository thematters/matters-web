import gql from 'graphql-tag'

import {
  FooterCirclePrivateFragment,
  FooterCirclePublicFragment,
} from '~/gql/graphql'

import Counts from '../Counts'
import Price from '../Price'
import styles from './styles.module.css'

export type FooterControls = {
  hasPrice?: boolean

  onClickPrice?: () => void
}

export type FooterProps = {
  circle: FooterCirclePublicFragment & Partial<FooterCirclePrivateFragment>
} & FooterControls

const fragments = {
  circle: {
    public: gql`
      fragment FooterCirclePublic on Circle {
        id
        ...CountsCircle
        ...PriceCirclePublic
      }
      ${Counts.fragments.circle}
      ${Price.fragments.circle.public}
    `,
    private: gql`
      fragment FooterCirclePrivate on Circle {
        id
        ...PriceCirclePrivate
      }
      ${Price.fragments.circle.private}
    `,
  },
}

const Footer = ({ circle, hasPrice, onClickPrice }: FooterProps) => {
  return (
    <footer className={styles.footer}>
      <Counts circle={circle} />

      {hasPrice && <Price circle={circle} onClick={onClickPrice} />}
    </footer>
  )
}

Footer.fragments = fragments

export default Footer
