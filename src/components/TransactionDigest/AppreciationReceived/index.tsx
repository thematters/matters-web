import gql from 'graphql-tag'

import {
  ArticleDigest,
  Card,
  DateTime,
  Icon,
  TextIcon,
  Translate,
  UserDigest
} from '~/components'

import { toPath } from '~/common/utils'

import styles from './styles.css'

import { AppreciationReceivedTransaction } from './__generated__/AppreciationReceivedTransaction'

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
        ...TitleArticle
      }
    }
    ${UserDigest.Mini.fragments.user}
    ${ArticleDigest.Title.fragments.article}
  `
}

const AppreciationReceived = ({
  tx
}: {
  tx: AppreciationReceivedTransaction
}) => {
  const { amount, content, purpose, createdAt, sender, target } = tx
  const isUseContent = purpose !== 'appreciate'
  const path = target
    ? toPath({ page: 'articleDetail', article: target })
    : null

  return (
    <Card {...path}>
      <section className="container">
        <section className="left">
          {sender && !isUseContent && (
            <header>
              <UserDigest.Mini
                user={sender}
                avatarSize="md"
                hasAvatar
                hasDisplayName
              />
              <span>
                &nbsp;
                <Translate zh_hant="讚賞了" zh_hans="赞赏了" />
              </span>
            </header>
          )}
          {isUseContent && content && <h4 className="content">{content}</h4>}
          {!isUseContent && target && (
            <section>
              <ArticleDigest.Title article={target} />
            </section>
          )}
        </section>

        <section className="right">
          <div className="appreciate-count" aria-label={`${amount} 次讚賞`}>
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
    </Card>
  )
}

AppreciationReceived.fragments = fragments

export default AppreciationReceived
