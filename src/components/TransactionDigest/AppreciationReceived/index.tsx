import gql from 'graphql-tag'

import {
  ArticleDigest,
  DateTime,
  Icon,
  TextIcon,
  Translate,
  UserDigest
} from '~/components'

import { AppreciationReceivedTransaction } from './__generated__/AppreciationReceivedTransaction'
import styles from './styles.css'

const fragments = {
  transaction: gql`
    fragment AppreciationReceivedTransaction on Transaction {
      amount
      purpose
      content
      createdAt
      sender {
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

const AppreciationReceived = ({
  tx
}: {
  tx: AppreciationReceivedTransaction
}) => {
  const { amount, content, purpose, createdAt, sender, target } = tx
  const isUseContent = purpose !== 'appreciate'

  return (
    <section className="container">
      <section className="left">
        {sender && !isUseContent && (
          <header>
            <UserDigest.Mini user={sender} avatarSize="md" />
            <span>
              &nbsp;
              <Translate zh_hant="讚賞了" zh_hans="赞赏了" />
            </span>
          </header>
        )}
        {isUseContent && content && <h4 className="content">{content}</h4>}
        {!isUseContent && target && <ArticleDigest.Plain article={target} />}
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

AppreciationReceived.fragments = fragments

export default AppreciationReceived
