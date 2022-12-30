import gql from 'graphql-tag'

import Counts from '../Counts'
import Price from '../Price'
import { FooterCirclePrivate } from './__generated__/FooterCirclePrivate'
import { FooterCirclePublic } from './__generated__/FooterCirclePublic'
import styles from './styles.css'

export type FooterControls = {
  hasPrice?: boolean

  onClickPrice?: () => void
}

export type FooterProps = {
  circle: FooterCirclePublic & Partial<FooterCirclePrivate>
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
    <footer>
      <Counts circle={circle} />

      {hasPrice && <Price circle={circle} onClick={onClickPrice} />}

      <style jsx>{styles}</style>
    </footer>
  )
}

Footer.fragments = fragments

export default Footer
