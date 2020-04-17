import { useQuery } from '@apollo/react-hooks'
import gql from 'graphql-tag'
import { useContext, useState } from 'react'
import { useDebouncedCallback } from 'use-debounce'

import { Tooltip, Translate, ViewerContext } from '~/components'
import { useMutation } from '~/components/GQL'
import CLIENT_PREFERENCE from '~/components/GQL/queries/clientPreference'

import { APPRECIATE_DEBOUNCE, Z_INDEX } from '~/common/enums'

import Appreciators from '../Toolbar/Appreciators'
import AnonymousButton from './AnonymousButton'
import AppreciateButton from './AppreciateButton'
import CivicLikerButton from './CivicLikerButton'
import SetupLikerIdAppreciateButton from './SetupLikerIdAppreciateButton'

import { ClientPreference } from '~/components/GQL/queries/__generated__/ClientPreference'
import { AppreciateArticle } from './__generated__/AppreciateArticle'
import { AppreciationButtonArticle } from './__generated__/AppreciationButtonArticle'

const fragments = {
  article: gql`
    fragment AppreciationButtonArticle on Article {
      id
      author {
        id
      }
      appreciationsReceivedTotal
      hasAppreciate
      appreciateLimit
      appreciateLeft
    }
  `,
}

const APPRECIATE_ARTICLE = gql`
  mutation AppreciateArticle($id: ID!, $amount: Int!) {
    appreciateArticle(input: { id: $id, amount: $amount }) {
      id
      appreciationsReceivedTotal
      hasAppreciate
      appreciateLeft
      ...AppreciatorsArticle
    }
  }
  ${Appreciators.fragments.article}
`

const AppreciationButton = ({
  article,
}: {
  article: AppreciationButtonArticle
}) => {
  const viewer = useContext(ViewerContext)
  const { data, client } = useQuery<ClientPreference>(CLIENT_PREFERENCE, {
    variables: { id: 'local' },
  })

  // bundle appreciations
  const [amount, setAmount] = useState(0)
  const [sendAppreciation] = useMutation<AppreciateArticle>(APPRECIATE_ARTICLE)
  const limit = article.appreciateLimit
  const left = article.appreciateLeft - amount
  const total = article.appreciationsReceivedTotal + amount
  const appreciatedCount = limit - left
  const [debouncedSendAppreciation] = useDebouncedCallback(async () => {
    try {
      await sendAppreciation({ variables: { id: article.id, amount } })
    } catch (e) {
      console.error(e)
    }

    setAmount(0)
  }, APPRECIATE_DEBOUNCE)
  const appreciate = () => {
    setAmount(amount + 1)
    debouncedSendAppreciation()
  }

  // UI
  const isReachLimit = left <= 0
  const isMe = article.author.id === viewer.id
  const readCivicLikerDialog =
    viewer.isCivicLiker || data?.clientPreference.readCivicLikerDialog
  const canAppreciate =
    !isReachLimit && !isMe && !viewer.isInactive && viewer.liker.likerId

  /**
   * Anonymous
   */
  if (!viewer.isAuthed) {
    return <AnonymousButton total={total} />
  }

  /**
   * Setup Liker Id Button
   */
  if (viewer.shouldSetupLikerID) {
    return <SetupLikerIdAppreciateButton total={total} />
  }

  /**
   * Appreciate Button
   */
  if (canAppreciate) {
    return (
      <AppreciateButton
        onClick={appreciate}
        count={appreciatedCount}
        total={total}
      />
    )
  }

  /**
   * Civic Liker Button
   */
  if (!canAppreciate && !readCivicLikerDialog && isReachLimit) {
    return (
      <CivicLikerButton
        onClose={() => {
          client.writeData({
            id: 'ClientPreference:local',
            data: { readCivicLikerDialog: true },
          })
        }}
        count={appreciatedCount}
        total={total}
      />
    )
  }

  /**
   * MAX Button
   */
  if (!canAppreciate && isReachLimit) {
    return <AppreciateButton count="MAX" total={total} />
  }

  /**
   * Disabled Button
   */
  return (
    <Tooltip
      content={
        <Translate
          {...(isMe
            ? {
                zh_hant: '去讚賞其他用戶吧',
                zh_hans: '去赞赏其他用户吧',
              }
            : {
                zh_hant: '你還沒有讚賞權限',
                zh_hans: '你还没有赞赏权限',
              })}
        />
      }
      zIndex={Z_INDEX.OVER_GLOBAL_HEADER}
    >
      <span>
        <AppreciateButton disabled count={appreciatedCount} total={total} />
      </span>
    </Tooltip>
  )
}

AppreciationButton.fragments = fragments

export default AppreciationButton
