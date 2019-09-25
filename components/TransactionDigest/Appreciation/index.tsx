import gql from 'graphql-tag'

import { ArticleDigest } from '~/components/ArticleDigest'
import { DateTime } from '~/components/DateTime'
import { Icon } from '~/components/Icon'
import { TextIcon } from '~/components/TextIcon'
import { UserDigest } from '~/components/UserDigest'

import ICON_LIKE from '~/static/icons/like.svg?sprite'

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
  const { amount, content, purpose, createdAt, recipient, target } = tx

  const isUseContent = purpose !== 'appreciate'

  return (
    <section className="container">
      <section className="left">
        {isUseContent && content && <h4 className="content">{content}</h4>}
        {!isUseContent && target && (
          <ArticleDigest.Plain article={target} hasArchivedTooltip />
        )}
        {recipient && !isUseContent && <UserDigest.Mini user={recipient} />}
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

Appreciation.fragments = fragments

export default Appreciation
