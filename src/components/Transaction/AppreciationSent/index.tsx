import gql from 'graphql-tag'

import {
  ArticleDigestTitle,
  Card,
  Icon,
  TextIcon,
  UserDigest
} from '~/components'

import { toPath } from '~/common/utils'

import styles from './styles.css'

import { AppreciationSentTransaction } from './__generated__/AppreciationSentTransaction'

const fragments = {
  transaction: gql`
    fragment AppreciationSentTransaction on Transaction {
      amount
      purpose
      content
      recipient {
        ...UserDigestMiniUser
      }
      target {
        ...ArticleDigestTitleArticle
      }
    }
    ${UserDigest.Mini.fragments.user}
    ${ArticleDigestTitle.fragments.article}
  `
}

const AppreciationSent = ({ tx }: { tx: AppreciationSentTransaction }) => {
  const { amount, content, purpose, recipient, target } = tx
  const isUseContent = purpose !== 'appreciate'
  const path = target
    ? toPath({ page: 'articleDetail', article: target })
    : null

  return (
    <Card {...path}>
      <section className="container">
        <section className="left">
          <header>
            {isUseContent && content && <h4 className="content">{content}</h4>}
            {!isUseContent && target && (
              <ArticleDigestTitle article={target} is="h2" />
            )}
          </header>

          <footer>
            {recipient && !isUseContent && (
              <UserDigest.Mini
                user={recipient}
                avatarSize="xs"
                hasAvatar
                hasDisplayName
                hasUserName
              />
            )}
          </footer>
        </section>

        <section className="right">
          <div className="appreciate-count" aria-label={`${amount} 次讚賞`}>
            <TextIcon
              icon={<Icon.Like />}
              spacing="xtight"
              weight="md"
              color="green"
            >
              {amount}
            </TextIcon>
          </div>
        </section>

        <style jsx>{styles}</style>
      </section>
    </Card>
  )
}

AppreciationSent.fragments = fragments

export default AppreciationSent
