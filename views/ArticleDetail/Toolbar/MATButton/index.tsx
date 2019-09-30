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
import ICON_MAT_GOLD from '~/static/icons/mat-gold.svg?sprite'
import ICON_MAT_WHITE from '~/static/icons/mat-white.svg?sprite'

import { MATArticleDetail } from './__generated__/MATArticleDetail'
import styles from './styles.css'

const fragments = {
  article: gql`
    fragment MATArticleDetail on Article {
      id
      author {
        id
      }
      MAT
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
      MAT
      hasAppreciate
      appreciateLeft
    }
  }
`

const OnboardingAppreciateButton = ({
  article
}: {
  article: MATArticleDetail
}) => {
  const buttonClasses = classNames({
    'mat-button': true
  })

  return (
    <ModalSwitch modalId="likeCoinTermModal">
      {(open: any) => (
        <button
          className={buttonClasses}
          type="button"
          onClick={open}
          aria-label="讚賞作品"
        >
          <Icon
            id={ICON_MAT_GOLD.id}
            viewBox={ICON_MAT_GOLD.viewBox}
            style={{ width: 28, height: 28 }}
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
    article: MATArticleDetail
    appreciate: () => any
    canAppreciate: boolean
  }
>(({ article, appreciate, canAppreciate }, ref) => {
  const buttonClasses = classNames({
    'mat-button': true
  })

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
        id={article.hasAppreciate ? ICON_MAT_WHITE.id : ICON_MAT_GOLD.id}
        viewBox={
          article.hasAppreciate ? ICON_MAT_WHITE.viewBox : ICON_MAT_GOLD.viewBox
        }
        style={{ width: 28, height: 28 }}
      />
      <style jsx>{styles}</style>
    </button>
  )
})

const MATButton = ({ article }: { article: MATArticleDetail }) => {
  const viewer = useContext(ViewerContext)
  const viewerMAT = _get(viewer, 'status.MAT.total', 0)
  const isReachLimit = article.appreciateLeft <= 0
  const isNotEnoughMAT = viewerMAT <= 0
  const isMe = article.author.id === viewer.id
  const canAppreciate =
    (!isReachLimit && !isNotEnoughMAT && !isMe && !viewer.isInactive) ||
    !viewer.isAuthed
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
        <span className="mat-count">{numAbbr(article.MAT)}</span>
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
          MAT: article.MAT + 1,
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
                    : isNotEnoughMAT
                    ? {
                        zh_hant: '你沒有足夠的 MAT 用於讚賞',
                        zh_hans: '你沒有足够的MAT用作打赏'
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
              />
            </Tooltip>
          )}
          <span className="mat-count">{numAbbr(article.MAT)}</span>
          <style jsx>{styles}</style>
        </section>
      )}
    </Mutation>
  )
}

MATButton.fragments = fragments

export default MATButton
