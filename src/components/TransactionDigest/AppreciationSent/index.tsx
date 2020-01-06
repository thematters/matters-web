import gql from 'graphql-tag'

import {
  ArticleDigest,
  DateTime,
  Icon,
  TextIcon,
  UserDigest
} from '~/components'

import { AppreciationSentTransaction } from './__generated__/AppreciationSentTransaction'
import styles from './styles.css'

const fragments = {
  transaction: gql`
    fragment AppreciationSentTransaction on Transaction {
      amount
      purpose
      content
      createdAt
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

const AppreciationSent = ({ tx }: { tx: AppreciationSentTransaction }) => {
  const { amount, content, purpose, createdAt, recipient, target } = tx

  const isUseContent = purpose !== 'appreciate'

  return (
    <section className="container">
      <section className="left">
        {isUseContent && content && <h4 className="content">{content}</h4>}
        {!isUseContent && target && <ArticleDigest.Plain article={target} />}
        {recipient && !isUseContent && <UserDigest.Mini user={recipient} />}
      </section>

      <section className="right">
        <div className="appreciate-count">
          <TextIcon
            icon={<Icon.Like />}
            spacing="xtight"
            weight="md"
            color="green"
            text={amount}
          />
        </div>

        <DateTime date={createdAt} type="standard" />
      </section>

      <style jsx>{styles}</style>
    </section>
  )
}

AppreciationSent.fragments = fragments

export default AppreciationSent
