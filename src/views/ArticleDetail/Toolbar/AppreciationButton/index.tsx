import classNames from 'classnames'
import gql from 'graphql-tag'
import _get from 'lodash/get'
import { forwardRef, useContext, useRef, useState } from 'react'

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
      appreciationsReceivedTotal
      hasAppreciate
      appreciateLimit
      appreciateLeft
    }
  `
}

const APPRECIATE_ARTICLE = gql`
  mutation AppreciateArticle($id: ID!, $amount: Int!) {
    appreciateArticle(input: { id: $id, amount: $amount }) {
      id
      appreciationsReceivedTotal
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
    <ModalSwitch modalId="likeCoinTermModal">
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
    appreciate: () => any
    canAppreciate: boolean
    isAuthed: boolean
    appreciatedCount: number
    appreciateLimit: number
  }
>(
  (
    { appreciate, canAppreciate, isAuthed, appreciatedCount, appreciateLimit },
    ref
  ) => {
    const buttonClasses = classNames({
      'appreciate-button': true
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
  }
)

const AppreciationButtonContainer = ({
  article
}: {
  article: AppreciationArticleDetail
}) => {
  const viewer = useContext(ViewerContext)

  // bundle appreciations
  const [bundling, setBundling] = useState(false)
  const [appreciationAmount, setAppreciationAmount] = useState(0)
  const amountRef = useRef(appreciationAmount)
  amountRef.current = appreciationAmount

  const { appreciateLimit } = article
  const appreciateLeft = article.appreciateLeft - appreciationAmount
  const appreciatedCount = appreciateLimit - appreciateLeft
  const isReachLimit = appreciateLeft <= 0

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
          {numAbbr(article.appreciationsReceivedTotal)}
        </span>
        <style jsx>{styles}</style>
      </section>
    )
  }

  return (
    <Mutation
      mutation={APPRECIATE_ARTICLE}
      variables={{ id: article.id, amount: appreciationAmount }}
      optimisticResponse={{
        appreciateArticle: {
          id: article.id,
          appreciationsReceivedTotal:
            article.appreciationsReceivedTotal + appreciationAmount,
          hasAppreciate: true,
          appreciateLeft,
          __typename: 'Article'
        }
      }}
    >
      {(sendAppreciation, { data }) => {
        // bundle appreciations
        const appreciate = () => {
          const debounce = 1000
          setAppreciationAmount(appreciationAmount + 1)

          if (!bundling) {
            setBundling(true)
            setTimeout(() => {
              if (amountRef.current) {
                sendAppreciation({
                  variables: { id: article.id, amount: amountRef.current }
                })
                setAppreciationAmount(0)
                setBundling(false)
              }
            }, debounce)
          }
        }

        return (
          <section className={containerClasses}>
            {canAppreciate && (
              <AppreciateButton
                appreciateLimit={appreciateLeft}
                appreciatedCount={appreciatedCount}
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
                          zh_hans: '你最多可赞赏 5 次'
                        }
                      : isMe
                      ? {
                          zh_hant: '去讚賞其他用戶吧',
                          zh_hans: '去赞赏其他用户吧'
                        }
                      : {
                          zh_hant: '你無法進行讚賞',
                          zh_hans: '你无法进行赞赏'
                        })}
                  />
                }
              >
                <AppreciateButton
                  appreciateLimit={appreciateLimit}
                  appreciatedCount={appreciatedCount}
                  canAppreciate={canAppreciate}
                  appreciate={appreciate}
                  isAuthed={viewer.isAuthed}
                />
              </Tooltip>
            )}
            <span className="appreciate-count">
              {numAbbr(article.appreciationsReceivedTotal)}
            </span>
            <style jsx>{styles}</style>
          </section>
        )
      }}
    </Mutation>
  )
}

AppreciationButtonContainer.fragments = fragments

export default AppreciationButtonContainer
