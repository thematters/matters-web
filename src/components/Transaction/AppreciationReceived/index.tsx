import gql from 'graphql-tag'
import React from 'react'

import {
  ArticleDigestTitle,
  Card,
  Icon,
  TextIcon,
  Translate,
  UserDigest
} from '~/components'

import { toPath } from '~/common/utils'

import styles from './styles.css'

import { AppreciationReceivedTransaction } from './__generated__/AppreciationReceivedTransaction'

interface AppreciationReceivedProps {
  tx: AppreciationReceivedTransaction
}

const fragments = {
  transaction: gql`
    fragment AppreciationReceivedTransaction on Transaction {
      amount
      purpose
      content
      sender {
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

const AppreciationReceived = ({ tx }: AppreciationReceivedProps) => {
  const { amount, content, purpose, sender, target } = tx
  const isUseContent = purpose !== 'appreciate'
  const path = target
    ? toPath({ page: 'articleDetail', article: target })
    : null

  return (
    <Card {...path} spacing={['base', 'base']}>
      <section className="container">
        <section className="left">
          {sender && !isUseContent && (
            <header>
              <UserDigest.Mini
                user={sender}
                avatarSize="xs"
                hasAvatar
                hasDisplayName
              />
              <span>
                &nbsp;
                <Translate zh_hant="讚賞了" zh_hans="赞赏了" />
              </span>
            </header>
          )}

          <footer>
            {isUseContent && content && <h4 className="content">{content}</h4>}
            {!isUseContent && target && (
              <section>
                <ArticleDigestTitle article={target} />
              </section>
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

/**
 * Memoizing
 */
type MemoedAppreciationReceivedType = React.MemoExoticComponent<
  React.FC<AppreciationReceivedProps>
> & {
  fragments: typeof fragments
}

export const MemoedAppreciationReceived = React.memo(
  AppreciationReceived,
  () => true
) as MemoedAppreciationReceivedType

MemoedAppreciationReceived.fragments = fragments

export default MemoedAppreciationReceived
