import { useQuery } from '@apollo/react-hooks'
import { useContext, useState } from 'react'
import { useDebouncedCallback } from 'use-debounce'

import {
  ReCaptchaContext,
  Tooltip,
  Translate,
  useMutation,
  useRoute,
  ViewerContext,
} from '~/components'
import CLIENT_PREFERENCE from '~/components/GQL/queries/clientPreference'
import updateAppreciation from '~/components/GQL/updates/appreciation'

import { ADD_TOAST, APPRECIATE_DEBOUNCE, Z_INDEX } from '~/common/enums'

import AnonymousButton from './AnonymousButton'
import AppreciateButton from './AppreciateButton'
import BlockedButton from './BlockedButton'
import CivicLikerButton from './CivicLikerButton'
import ForbiddenButton from './ForbiddenButton'
import { APPRECIATE_ARTICLE, fragments } from './gql'
import SetupLikerIdAppreciateButton from './SetupLikerIdAppreciateButton'
import ViewSuperLikeButton from './ViewSuperLikeButton'

import { ClientPreference } from '~/components/GQL/queries/__generated__/ClientPreference'
import { AppreciateArticle } from './__generated__/AppreciateArticle'
import { AppreciationButtonArticlePrivate } from './__generated__/AppreciationButtonArticlePrivate'
import { AppreciationButtonArticlePublic } from './__generated__/AppreciationButtonArticlePublic'

interface AppreciationButtonProps {
  article: AppreciationButtonArticlePublic &
  Partial<AppreciationButtonArticlePrivate>
  privateFetched: boolean
  disabled?: boolean
}

const AppreciationButton = ({
  article,
  privateFetched,
  disabled,
}: AppreciationButtonProps) => {
  const { getQuery } = useRoute()
  const mediaHash = getQuery('mediaHash')
  const viewer = useContext(ViewerContext)
  const { token, refreshToken } = useContext(ReCaptchaContext)
  const { data, client } = useQuery<ClientPreference>(CLIENT_PREFERENCE, {
    variables: { id: 'local' },
  })
  const isArticleAuthor = article.author.id === viewer.id

  /**
   * Normal Appreciation
   */
  const [amount, setAmount] = useState(0)
  const [sendAppreciation] = useMutation<AppreciateArticle>(APPRECIATE_ARTICLE)
  const limit = article.appreciateLimit
  const left =
    (typeof article.appreciateLeft === 'number'
      ? article.appreciateLeft
      : limit) - amount
  const total = article.appreciationsReceivedTotal + amount
  const appreciatedCount = limit - left
  const isReachLimit = left <= 0 || isArticleAuthor
  const debouncedSendAppreciation = useDebouncedCallback(async () => {
    try {
      await sendAppreciation({
        variables: {
          id: article.id,
          amount,
          token,
        },
      }).then(refreshToken)
    } catch (e) {
      console.error(e)
    }
  }, APPRECIATE_DEBOUNCE)

  /**
   * SuperLike
   */
  const [superLiked, setSuperLiked] = useState(false)
  const canSuperLike = article.canSuperLike
  const isSuperLike = viewer.isCivicLiker && isReachLimit
  const sendSuperLike = async () => {
    try {
      await sendAppreciation({
        variables: {
          id: article.id,
          amount: 1,
          token,
          superLike: true,
        },
        update: (cache) => {
          updateAppreciation({
            cache,
            left,
            mediaHash,
            total,
            viewer,
            canSuperLike: false,
          })
        },
      })
      window.dispatchEvent(
        new CustomEvent(ADD_TOAST, {
          detail: {
            color: 'green',
            content: (
              <Translate
                zh_hant="你對作品送出了一個 Super Like！"
                zh_hans="你对作品送出了一个 Super Like！"
                en="You sent a Super Like to this article!"
              />
            ),
            customButton: <ViewSuperLikeButton />,
            buttonPlacement: 'center',
          },
        })
      )
    } catch (e) {
      setSuperLiked(false)
      console.error(e)
      throw e
    }
  }

  /**
   * Render
   *
   * Anonymous:
   *   1) Show login toast on click
   *
   * Article Author:
   *   1) Disabled, show tooltip on hover
   *
   * No LikerID:
   *   1) Show Setup LikerID modal on click
   *
   * Non-Civic Liker:
   *   1) Allow to appreciate 5 times
   *   2) Show modal to introduce Civic Liker on click
   *   3) Show "MAX" on close
   *
   * Civic Liker in own article:
   *   1) Show SuperLike
   *   2) Show "∞" on click
   *
   * Civic Liker in others' articles:
   *   1) Allow to appreciate 5 times
   *   2) Show SuperLike
   *   3) Show "∞" on click
   *
   */
  const appreciate = () => {
    if (isSuperLike) {
      setSuperLiked(true)
      sendSuperLike()
    } else {
      setAmount(amount + 1)
      debouncedSendAppreciation()
    }
  }

  const readCivicLikerDialog =
    viewer.isCivicLiker || data?.clientPreference.readCivicLikerDialog
  const canAppreciate =
    (!isReachLimit && !viewer.isArchived && viewer.liker.likerId) ||
    (isSuperLike && canSuperLike)

  // Anonymous
  if (!viewer.isAuthed) {
    return <AnonymousButton total={total} />
  }

  // Blocked
  if (article.author.isBlocking) {
    return <BlockedButton total={total} />
  }

  // Frobidden
  if (viewer.isFrozen) {
    return <ForbiddenButton total={total} />
  }

  // Article Author
  if (isArticleAuthor && !isSuperLike) {
    return (
      <Tooltip
        content={
          <Translate
            zh_hant="去讚賞其他用戶吧"
            zh_hans="去赞赏其他用户吧"
            en="send Likes to others"
          />
        }
        zIndex={Z_INDEX.OVER_BOTTOM_BAR}
      >
        <span>
          <AppreciateButton disabled total={total} />
        </span>
      </Tooltip>
    )
  }

  // Liker ID
  if (viewer.shouldSetupLikerID) {
    return <SetupLikerIdAppreciateButton total={total} />
  }

  // Blocked by private query
  if (!privateFetched) {
    return <AppreciateButton total={total} />
  }

  // Appreciable
  if (canAppreciate && !disabled) {
    return (
      <AppreciateButton
        onClick={appreciate}
        count={appreciatedCount > 0 ? appreciatedCount : undefined}
        total={total}
        isSuperLike={isSuperLike}
        superLiked={superLiked}
      />
    )
  }

  // Civic Liker
  if (isReachLimit && !readCivicLikerDialog) {
    return (
      <CivicLikerButton
        user={article.author}
        onClose={() => {
          client.writeData({
            id: 'ClientPreference:local',
            data: { readCivicLikerDialog: true },
          })
        }}
        count={appreciatedCount > 0 ? appreciatedCount : undefined}
        total={total}
      />
    )
  }

  // MAX:SuperLike
  if (isReachLimit && isSuperLike) {
    return (
      <AppreciateButton
        count="MAX"
        total={total}
        onClick={() => {
          window.dispatchEvent(
            new CustomEvent(ADD_TOAST, {
              detail: {
                color: 'green',
                content: (
                  <Translate
                    zh_hant="12:00 或 00:00 就可以再次送出 Super Like 啦！"
                    zh_hans="12:00 或 00:00 就可以再次送出 Super Like 啦！"
                    en="you can send another Super Like after 12:00 or 00:00"
                  />
                ),
                customButton: <ViewSuperLikeButton />,
                buttonPlacement: 'center',
              },
            })
          )
        }}
        isSuperLike={isSuperLike}
        superLiked={superLiked}
      />
    )
  }

  // MAX
  if (isReachLimit && !isSuperLike) {
    return <AppreciateButton count="MAX" total={total} />
  }

  // Disabled
  return (
    <Tooltip
      content={
        <Translate
          zh_hant="你還沒有讚賞權限"
          zh_hans="你还没有赞赏权限"
          en="You can't send Likes yet"
        />
      }
      zIndex={Z_INDEX.OVER_BOTTOM_BAR}
    >
      <span>
        <AppreciateButton
          disabled
          count={appreciatedCount > 0 ? appreciatedCount : undefined}
          total={total}
        />
      </span>
    </Tooltip>
  )
}

AppreciationButton.fragments = fragments

export default AppreciationButton
