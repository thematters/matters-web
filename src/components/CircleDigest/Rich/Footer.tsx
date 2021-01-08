import gql from 'graphql-tag'

import Counts from '../Counts'
import Price from '../Price'
import styles from './styles.css'

import { FooterCirclePrivate } from './__generated__/FooterCirclePrivate'
import { FooterCirclePublic } from './__generated__/FooterCirclePublic'

export type FooterControls = {
  hasPrice?: boolean
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

const Footer = ({ circle, hasPrice }: FooterProps) => {
  return (
    <footer>
      <Counts circle={circle} />

      {hasPrice && <Price circle={circle} />}

      <style jsx>{styles}</style>
    </footer>
  )
}

Footer.fragments = fragments

export default Footer
