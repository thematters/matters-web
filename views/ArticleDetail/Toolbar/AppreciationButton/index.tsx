import classNames from 'classnames'
import gql from 'graphql-tag'
import _get from 'lodash/get'
import { forwardRef, useContext } from 'react'

import { Icon, Translate } from '~/components'
import { Mutation } from '~/components/GQL'
import { ModalSwitch } from '~/components/ModalManager'
import { Tooltip } from '~/components/Popper'
import { ViewerContext } from '~/components/Viewer'

import { numAbbr } from '~/common/utils'
import ICON_LIKE from '~/static/icons/like.svg?sprite'

import { AppreciationArticleDetail } from './__generated__/AppreciationArticleDetail'
import styles from './styles.css'

const fragments = {
  article: gql`
    fragment AppreciationArticleDetail on Article {
      id
      author {
        id
      }
      appreciationTotal
      hasAppreciate
      appreciateLimit
      appreciateLeft
    }
  `
}

const APPRECIATE_ARTICLE = gql`
  mutation AppreciateArticle($id: ID!) {
    appreciateArticle(input: { id: $id, amount: 1 }) {
      id
      appreciationTotal
      hasAppreciate
      appreciateLeft
    }
  }
`

const AppreciatedCount = ({ num, limit }: { num: number; limit: number }) => {
  const classes = classNames({
    'appreciated-count': true,
    'appreciated-reach-limit': num === limit
  })
  return (
    <>
      <span className={classes}>{num}</span>
      <style jsx>{styles}</style>
    </>
  )
}

const OnboardingAppreciateButton = ({
  article
}: {
  article: AppreciationArticleDetail
}) => {
  const buttonClasses = classNames({
    'appreciate-button': true
  })

  return (
    <ModalSwitch modalId="onboardingInfoModal">
      {(open: any) => (
        <button
          className={buttonClasses}
          type="button"
          onClick={open}
          aria-label="讚賞作品"
        >
          <Icon
            id={ICON_LIKE.id}
            viewBox={ICON_LIKE.viewBox}
            style={{ width: 22, height: 22 }}
          />
          <style jsx>{styles}</style>
        </button>
      )}
    </ModalSwitch>
  )
}

const AppreciateButton = forwardRef<
  HTMLButtonElement,
  {
    article: AppreciationArticleDetail
    appreciate: () => any
    canAppreciate: boolean
    isAuthed: boolean
  }
>(({ article, appreciate, canAppreciate, isAuthed }, ref) => {
  const buttonClasses = classNames({
    'appreciate-button': true
  })
  const { appreciateLimit, appreciateLeft } = article
  const appreciatedCount = appreciateLimit - appreciateLeft

  return (
    <button
      className={buttonClasses}
      type="button"
      ref={ref}
      aria-disabled={!canAppreciate}
      onClick={() => canAppreciate && appreciate()}
      aria-label="讚賞作品"
    >
      <Icon
        id={ICON_LIKE.id}
        viewBox={ICON_LIKE.viewBox}
        style={{ width: 22, height: 22 }}
      />
      {isAuthed && appreciatedCount > 0 && (
        <AppreciatedCount num={appreciatedCount} limit={appreciateLimit} />
      )}
      <style jsx>{styles}</style>
    </button>
  )
})

const AppreciationButtonContainer = ({
  article
}: {
  article: AppreciationArticleDetail
}) => {
  const viewer = useContext(ViewerContext)
  const isReachLimit = article.appreciateLeft <= 0
  const isMe = article.author.id === viewer.id
  const canAppreciate =
    (!isReachLimit && !isMe && !viewer.isInactive) || !viewer.isAuthed
  const containerClasses = classNames({
    container: true,
    active: article.hasAppreciate,
    inactive: !canAppreciate,
    unlogged: !viewer.isAuthed
  })

  if (viewer.isOnboarding) {
    return (
      <section className="container">
        <OnboardingAppreciateButton article={article} />
        <span className="appreciate-count">
          {numAbbr(article.appreciationTotal)}
        </span>
        <style jsx>{styles}</style>
      </section>
    )
  }

  return (
    <Mutation
      mutation={APPRECIATE_ARTICLE}
      variables={{ id: article.id }}
      optimisticResponse={{
        appreciateArticle: {
          id: article.id,
          appreciationTotal: article.appreciationTotal + 1,
          hasAppreciate: true,
          appreciateLeft: article.appreciateLeft - 1,
          __typename: 'Article'
        }
      }}
    >
      {(appreciate, { data }) => (
        <section className={containerClasses}>
          {canAppreciate && (
            <AppreciateButton
              article={article}
              canAppreciate={canAppreciate}
              appreciate={appreciate}
              isAuthed={viewer.isAuthed}
            />
          )}
          {!canAppreciate && (
            <Tooltip
              content={
                <Translate
                  {...(isReachLimit
                    ? {
                        zh_hant: '你最多可讚賞 5 次',
                        zh_hans: '你最多可打赏 5 次'
                      }
                    : isMe
                    ? {
                        zh_hant: '去讚賞其他用戶吧',
                        zh_hans: '去打赏其他用户吧'
                      }
                    : {
                        zh_hant: '你無法進行讚賞',
                        zh_hans: '你无法进行打赏'
                      })}
                />
              }
            >
              <AppreciateButton
                article={article}
                canAppreciate={canAppreciate}
                appreciate={appreciate}
                isAuthed={viewer.isAuthed}
              />
            </Tooltip>
          )}
          <span className="appreciate-count">
            {numAbbr(article.appreciationTotal)}
          </span>
          <style jsx>{styles}</style>
        </section>
      )}
    </Mutation>
  )
}

AppreciationButtonContainer.fragments = fragments

export default AppreciationButtonContainer
