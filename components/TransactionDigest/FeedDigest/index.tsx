import classNames from 'classnames'
import gql from 'graphql-tag'

import { DateTime } from '~/components/DateTime'

import { numPrefix } from '~/common/utils'

import { FeedDigestTransaction } from './__generated__/FeedDigestTransaction'
import styles from './styles.css'

const fragments = {
  transaction: gql`
    fragment FeedDigestTransaction on Transaction {
      delta
      purpose
      content
      createdAt
    }
  `
}

const FeedDigest = ({ tx }: { tx: FeedDigestTransaction }) => {
  const { delta, purpose, content, createdAt } = tx

  if (!delta || !purpose || !content || !createdAt) {
    return null
  }

  const deltaClasses = classNames({
    delta: true,
    green: delta >= 0,
    red: delta < 0
  })

  return (
    <section className="container">
      <h4 className="content">{content}</h4>
      <div className="right">
        <DateTime date={createdAt} type="standard" />
        <span className={deltaClasses}>{numPrefix(delta)} MAT</span>
      </div>
      <style jsx>{styles}</style>
    </section>
  )
}

FeedDigest.fragments = fragments

export default FeedDigest
