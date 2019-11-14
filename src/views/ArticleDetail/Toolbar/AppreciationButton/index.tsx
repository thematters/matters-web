import classNames from 'classnames'
import gql from 'graphql-tag'
import { forwardRef, useContext, useState } from 'react'
import { useQuery } from 'react-apollo'
import { useDebouncedCallback } from 'use-debounce'

import { ModalSwitch, Translate } from '~/components'
import { useMutation } from '~/components/GQL'
import { ClientPreference } from '~/components/GQL/queries/__generated__/ClientPreference'
import CLIENT_PREFERENCE from '~/components/GQL/queries/clientPreference'
import { Tooltip } from '~/components/Popper'
import { ViewerContext } from '~/components/Viewer'

import { ANALYTICS_EVENTS, APPRECIATE_DEBOUNCE } from '~/common/enums'
import { analytics, numAbbr } from '~/common/utils'

import { AppreciateArticle } from './__generated__/AppreciateArticle'
import { AppreciationArticleDetail } from './__generated__/AppreciationArticleDetail'
import IconAppreciate from './IconAppreciate'
import OnboardingAppreciateButton from './OnboardingAppreciateButton'
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

interface AppreciateButtonProps {
  disabled?: boolean
  onClick?: () => void
  count?: number | 'MAX'
}

const AppreciateButton = forwardRef<HTMLButtonElement, AppreciateButtonProps>(
  ({ disabled, onClick, count }, ref) => {
    const countClass = classNames({
      'appreciated-count': true,
      max: count === 'MAX'
    })

    return (
      <button
        className="appreciate-button"
        type="button"
        ref={ref}
        aria-disabled={disabled}
        onClick={onClick}
        aria-label="讚賞作品"
      >
        <IconAppreciate />

        {count && <span className={countClass}>{count}</span>}

        <style jsx>{styles}</style>
      </button>
    )
  }
)

const CivicLikerButton = ({ onClick }: { onClick: () => void }) => (
  <ModalSwitch modalId="civicLikerModal">
    {(open: any) => (
      <AppreciateButton
        onClick={() => {
          open()
          onClick()
        }}
        count="MAX"
      />
    )}
  </ModalSwitch>
)

const AppreciationButtonContainer = ({
  article
}: {
  article: AppreciationArticleDetail
}) => {
  const viewer = useContext(ViewerContext)
  const { data, client } = useQuery<ClientPreference>(CLIENT_PREFERENCE, {
    variables: { id: 'local' }
  })
  const readCivicLikerModal =
    viewer.isCivicLiker || (data && data.clientPreference.readCivicLikerModal)

  // bundle appreciations
  const [amount, setAmount] = useState(0)
  const [sendAppreciation] = useMutation<AppreciateArticle>(APPRECIATE_ARTICLE)
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
    if (left <= 0) {
      return
    }
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
    inactive: !canAppreciate && readCivicLikerModal,
    unlogged: !viewer.isAuthed
  })

  if (viewer.shouldSetupLikerID) {
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
      {canAppreciate && (
        <AppreciateButton
          onClick={() => appreciate()}
          count={
            viewer.isAuthed && appreciatedCount > 0
              ? appreciatedCount
              : undefined
          }
        />
      )}

      {!canAppreciate && !readCivicLikerModal && isReachLimit && (
        <CivicLikerButton
          onClick={() => {
            client.writeData({
              id: 'ClientPreference:local',
              data: { readCivicLikerModal: true }
            })
            analytics.trackEvent(ANALYTICS_EVENTS.OPEN_CIVIC_LIKER_MODAL)
          }}
        />
      )}

      {!canAppreciate && readCivicLikerModal && (
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
            disabled
            count={
              viewer.isAuthed && appreciatedCount > 0
                ? appreciatedCount
                : undefined
            }
          />
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
