import gql from 'graphql-tag'

import { ArticleDigest } from '~/components/ArticleDigest'
import { DateTime } from '~/components/DateTime'
import { UserDigest } from '~/components/UserDigest'

import { AppreciationTransaction } from './__generated__/AppreciationTransaction'
import styles from './styles.css'

const fragments = {
  transaction: gql`
    fragment AppreciationTransaction on Transaction {
      amount
      purpose
      content
      createdAt
      unit
      recipient {
        ...UserDigestMiniUser
      }
      target {
        ...PlainDigestArticle
      }
    }
    ${UserDigest.Mini.fragments.user}
    ${ArticleDigest.Plain.fragments.article}
  `
}

const Appreciation = ({ tx }: { tx: AppreciationTransaction }) => {
  const {
    // amount, purpose,
    content,
    createdAt
    //  unit, recipient, target
  } = tx

  return (
    <section className="container">
      <h4 className="content">{content}</h4>
      <div className="right">
        <DateTime date={createdAt} type="standard" />
      </div>
      <style jsx>{styles}</style>
    </section>
  )
}

Appreciation.fragments = fragments

export default Appreciation
