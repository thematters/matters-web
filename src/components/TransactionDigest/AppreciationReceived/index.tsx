import gql from 'graphql-tag'

import { ArticleDigest } from '~/components/ArticleDigest'
import { DateTime } from '~/components/DateTime'
import { Icon } from '~/components/Icon'
import { Translate } from '~/components/Language'
import { TextIcon } from '~/components/TextIcon'
import { UserDigest } from '~/components/UserDigest'

import ICON_LIKE from '~/static/icons/like.svg?sprite'

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
            <UserDigest.Mini user={sender} avatarSize="xsmall" />
            <span>
              &nbsp;
              <Translate zh_hant="讚賞了" zh_hans="赞赏了" />
            </span>
          </header>
        )}
        {isUseContent && content && <h4 className="content">{content}</h4>}
        {!isUseContent && target && (
          <ArticleDigest.Plain article={target} hasArchivedTooltip />
        )}
      </section>

      <section className="right">
        <div className="appreciate-count">
          <TextIcon
            icon={
              <Icon
                id={ICON_LIKE.id}
                viewBox={ICON_LIKE.viewBox}
                size="small"
              />
            }
            spacing="xtight"
            weight="medium"
            size="sm"
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
