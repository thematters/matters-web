import classNames from 'classnames'
import gql from 'graphql-tag'
import _get from 'lodash/get'
import { forwardRef, useContext, useState } from 'react'
import { useMutation } from 'react-apollo'
import { useDebouncedCallback } from 'use-debounce'

import { Icon, Translate } from '~/components'
import { ModalSwitch } from '~/components/ModalManager'
import { Tooltip } from '~/components/Popper'
import { ViewerContext } from '~/components/Viewer'

import { APPRECIATE_DEBOUNCE } from '~/common/enums'
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

const IconAppreciate = () => (
  <Icon
    id={ICON_LIKE.id}
    viewBox={ICON_LIKE.viewBox}
    style={{ width: 22, height: 22 }}
  />
)

const AppreciatedCount = ({ num, limit }: { num: number; limit: number }) => {
  const classes = classNames({
    'appreciated-count': true,
    'appreciated-reach-limit': num === limit
  })
  return (
    <span className={classes}>
      {num}

      <style jsx>{styles}</style>
    </span>
  )
}

const OnboardingAppreciateButton = () => {
  return (
    <ModalSwitch modalId="likeCoinTermModal">
      {(open: any) => (
        <button
          className="appreciate-button"
          type="button"
          onClick={open}
          aria-label="讚賞作品"
        >
          <IconAppreciate />

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
    limit: number
  }
>(({ appreciate, canAppreciate, isAuthed, appreciatedCount, limit }, ref) => {
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
      <IconAppreciate />

      {isAuthed && appreciatedCount > 0 && (
        <AppreciatedCount num={appreciatedCount} limit={limit} />
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

  // bundle appreciations
  const [amount, setAmount] = useState(0)
  const [sendAppreciation] = useMutation(APPRECIATE_ARTICLE)
  const {
    appreciateLimit,
    appreciateLeft,
    appreciationsReceivedTotal
  } = article
  const limit = appreciateLimit
  const left = appreciateLeft - amount
  const appreciatedCount = limit - left
  const [debouncedSendAppreciation] = useDebouncedCallback(() => {
    sendAppreciation({
      variables: { id: article.id, amount },
      optimisticResponse: {
        appreciateArticle: {
          id: article.id,
          appreciationsReceivedTotal: appreciationsReceivedTotal + amount,
          hasAppreciate: true,
          appreciateLeft: left,
          __typename: 'Article'
        }
      }
    })
    setAmount(0)
  }, APPRECIATE_DEBOUNCE)
  const appreciate = () => {
    setAmount(amount + 1)
    debouncedSendAppreciation()
  }

  // UI
  const isReachLimit = left <= 0
  const isMe = article.author.id === viewer.id
  const canAppreciate =
    (!isReachLimit && !isMe && !viewer.isInactive) || !viewer.isAuthed
  const containerClasses = classNames({
    container: true,
    active: article.hasAppreciate,
    inactive: !canAppreciate,
    unlogged: !viewer.isAuthed
  })
  const appreciateButtonProps = {
    limit,
    appreciatedCount,
    canAppreciate,
    appreciate,
    isAuthed: viewer.isAuthed
  }

  if (viewer.isOnboarding) {
    return (
      <section className="container">
        <OnboardingAppreciateButton />

        <span className="appreciate-count">
          {numAbbr(article.appreciationsReceivedTotal)}
        </span>

        <style jsx>{styles}</style>
      </section>
    )
  }

  return (
    <section className={containerClasses}>
      {canAppreciate && <AppreciateButton {...appreciateButtonProps} />}

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
          <AppreciateButton {...appreciateButtonProps} />
        </Tooltip>
      )}

      <span className="appreciate-count">
        {numAbbr(article.appreciationsReceivedTotal)}
      </span>

      <style jsx>{styles}</style>
    </section>
  )
}

AppreciationButtonContainer.fragments = fragments

export default AppreciationButtonContainer
