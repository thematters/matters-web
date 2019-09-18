import gql from 'graphql-tag'

import { ArticleDigest } from '~/components/ArticleDigest'
import { DateTime } from '~/components/DateTime'
import { Icon } from '~/components/Icon'
import { Translate } from '~/components/Language'
import { TextIcon } from '~/components/TextIcon'
import { UserDigest } from '~/components/UserDigest'

import ICON_LIKE from '~/static/icons/like.svg?sprite'

import { AppreciatedByTransaction } from './__generated__/AppreciatedByTransaction'
import styles from './styles.css'

const fragments = {
  transaction: gql`
    fragment AppreciatedByTransaction on Transaction {
      amount
      purpose
      content
      createdAt
      unit
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

const AppreciatedBy = ({ tx }: { tx: AppreciatedByTransaction }) => {
  const { amount, content, createdAt, sender, target } = tx

  return (
    <section className="container">
      <section className="left">
        {sender && (
          <header>
            <UserDigest.Mini user={sender} avatarSize="xsmall" />
            <span>
              &nbsp;
              <Translate zh_hant="讚賞了" zh_hans="赞赏了" />
            </span>
          </header>
        )}
        {content && !target && <h4 className="content">{content}</h4>}
        {target && <ArticleDigest.Plain article={target} />}
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

AppreciatedBy.fragments = fragments

export default AppreciatedBy
