import gql from 'graphql-tag'

import Counts from '../Counts'
import Subscribe from '../Subscribe'
import styles from './styles.css'

import { FooterCirclePrivate } from './__generated__/FooterCirclePrivate'
import { FooterCirclePublic } from './__generated__/FooterCirclePublic'

export type FooterControls = {
  hasSubscribe?: boolean

  onClickSubscribe?: () => void
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
        ...SubscribeButtonCirclePublic
      }
      ${Counts.fragments.circle}
      ${Subscribe.fragments.circle.public}
    `,
    private: gql`
      fragment FooterCirclePrivate on Circle {
        id
        ...SubscribeButtonCirclePrivate
      }
      ${Subscribe.fragments.circle.private}
    `,
  },
}

const Footer = ({ circle, hasSubscribe, onClickSubscribe }: FooterProps) => {
  return (
    <footer>
      <Counts circle={circle} />

      {hasSubscribe && <Subscribe circle={circle} onClick={onClickSubscribe} />}

      <style jsx>{styles}</style>
    </footer>
  )
}

Footer.fragments = fragments

export default Footer
