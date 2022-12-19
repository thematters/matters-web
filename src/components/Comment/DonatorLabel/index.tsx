import gql from 'graphql-tag'

import { Translate } from '~/components'

import styles from './styles.css'

import { DonatorLabelCommentPrivate } from './__generated__/DonatorLabelCommentPrivate'

const fragments = {
  comment: {
    private: gql`
      fragment DonatorLabelCommentPrivate on Comment {
        id
        fromDonator
      }
    `,
  },
}

const DonatorLabel = ({
  comment,
}: {
  comment: Partial<DonatorLabelCommentPrivate>
}) => {
  if (!comment.fromDonator) {
    return null
  }

  return (
    <span className="label">
      <Translate zh_hant="支持者" zh_hans="支持者" en="Backer" />

      <style jsx>{styles}</style>
    </span>
  )
}

DonatorLabel.fragments = fragments

export default DonatorLabel
