import gql from 'graphql-tag'

import { Translate } from '~/components'

import styles from './styles.css'

import { DonatorLabelComment } from './__generated__/DonatorLabelComment'

const fragments = {
  comment: gql`
    fragment DonatorLabelComment on Comment {
      id
      fromDonator
    }
  `,
}

const DonatorLabel = ({ comment }: { comment: DonatorLabelComment }) => {
  if (!comment.fromDonator) {
    return null
  }

  return (
    <span className="label">
      <Translate zh_hant="支持者" zh_hans="支持者" />

      <style jsx>{styles}</style>
    </span>
  )
}

DonatorLabel.fragments = fragments

export default DonatorLabel
