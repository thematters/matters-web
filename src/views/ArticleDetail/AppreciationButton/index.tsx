// import Script from 'next/script'
import { useContext, useRef, useState } from 'react'
import { useDebouncedCallback } from 'use-debounce'

import { APPRECIATE_DEBOUNCE, EXTERNAL_LINKS, Z_INDEX } from '~/common/enums'
import type { TurnstileInstance } from '~/components'
import {
  ArticleAppreciationContext,
  ButtonProps,
  ReCaptcha,
  toast,
  Tooltip,
  Translate,
  useMutation,
  ViewerContext,
} from '~/components'
import { updateAppreciation } from '~/components/GQL'
import {
  AppreciateArticleMutation,
  AppreciationButtonArticlePrivateFragment,
  AppreciationButtonArticlePublicFragment,
} from '~/gql/graphql'

import AnonymousButton from './AnonymousButton'
import AppreciateButton from './AppreciateButton'
import BlockedButton from './BlockedButton'
import ForbiddenButton from './ForbiddenButton'
import { APPRECIATE_ARTICLE, fragments } from './gql'

export type AppreciationButtonProps = {
  article: AppreciationButtonArticlePublicFragment &
    Partial<AppreciationButtonArticlePrivateFragment>
  privateFetched: boolean
  disabled?: boolean
  iconSize?: 20 | 24
  textWeight?: 'medium' | 'normal'
  textIconSpacing?: 4 | 6 | 8
} & ButtonProps

const AppreciationButton = ({
  article,
  privateFetched,
  disabled,
  iconSize = 20,
  textWeight = 'medium',
  textIconSpacing = 8,
  ...buttonProps
}: AppreciationButtonProps) => {
  const viewer = useContext(ViewerContext)
  const { likesReceivedTotal, appreciateLeft, incrementLikesReceivedTotal } =
    useContext(ArticleAppreciationContext)

  const turnstileRef = useRef<TurnstileInstance>(null)

  /**
   * Normal Appreciation
   */
  const [amount, setAmount] = useState(0)

  const [sendAppreciation] =
    useMutation<AppreciateArticleMutation>(APPRECIATE_ARTICLE)
  const limit = article.appreciateLimit
  const left = appreciateLeft
  const total = likesReceivedTotal
  const appreciatedCount = limit - left
  const isReachLimit = left <= 0
  const debouncedSendAppreciation = useDebouncedCallback(async () => {
    try {
      await sendAppreciation({
        variables: {
          id: article.id,
          amount: amount,
          token: turnstileRef.current?.getResponse(),
        },
      }) // .then(refreshToken)
    } catch (e) {
      console.error(e)
    } finally {
      turnstileRef.current?.reset()
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
          token: turnstileRef.current?.getResponse(),
          superLike: true,
        },
        update: (cache) => {
          updateAppreciation({
            cache,
            left,
            shortHash: article.shortHash,
            total,
            viewer,
            canSuperLike: false,
          })
        },
      })

      toast.success({
        message: (
          <Translate
            zh_hant="你對作品送出了一個 Super Like！"
            zh_hans="你对作品送出了一个 Super Like！"
            en="You sent a Super Like to this article!"
          />
        ),
        actions: [
          {
            content: <Translate zh_hant="詳情" zh_hans="详情" en="More info" />,
            htmlHref: EXTERNAL_LINKS.SUPER_LIKE,
            htmlTarget: '_blank',
          },
        ],
      })
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
   * Non-Civic Liker:
   *   1) Allow to like 5 times
   *   2) Show modal to introduce Civic Liker on click
   *   3) Show "MAX" on close
   *
   * Civic Liker in own article:
   *   1) Show SuperLike
   *   2) Show "∞" on click
   *
   * Civic Liker in others' articles:
   *   1) Allow to like 5 times
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
      incrementLikesReceivedTotal()
      debouncedSendAppreciation()
    }
  }

  const canAppreciate =
    (!isReachLimit && !viewer.isArchived) || (isSuperLike && canSuperLike)

  // Anonymous
  if (!viewer.isAuthed) {
    return (
      <AnonymousButton
        total={total}
        iconSize={iconSize}
        textIconSpacing={textIconSpacing}
        {...buttonProps}
      />
    )
  }

  // Blocked
  if (article.author.isBlocking) {
    return (
      <BlockedButton
        total={total}
        iconSize={iconSize}
        textWeight={textWeight}
        textIconSpacing={textIconSpacing}
        {...buttonProps}
      />
    )
  }

  // Frobidden
  if (viewer.isFrozen) {
    return (
      <ForbiddenButton
        total={total}
        iconSize={iconSize}
        textWeight={textWeight}
        textIconSpacing={textIconSpacing}
        {...buttonProps}
      />
    )
  }

  // Blocked by private query
  if (!privateFetched) {
    return (
      <AppreciateButton
        total={total}
        disabled
        iconSize={iconSize}
        textWeight={textWeight}
        textIconSpacing={textIconSpacing}
        {...buttonProps}
      />
    )
  }

  // Appreciable
  if (canAppreciate && !disabled) {
    return (
      <section>
        <ReCaptcha ref={turnstileRef} action="appreciate" silence />
        <AppreciateButton
          onClick={appreciate}
          count={appreciatedCount > 0 ? appreciatedCount : undefined}
          total={total}
          isSuperLike={isSuperLike}
          superLiked={superLiked}
          iconSize={iconSize}
          textWeight={textWeight}
          textIconSpacing={textIconSpacing}
          {...buttonProps}
        />
      </section>
    )
  }

  // MAX:SuperLike
  if (isReachLimit && isSuperLike) {
    return (
      <AppreciateButton
        count="MAX"
        total={total}
        onClick={() => {
          toast.success({
            message: (
              <Translate
                zh_hant="12:00 或 00:00 就可以再次送出 Super Like 啦！"
                zh_hans="12:00 或 00:00 就可以再次送出 Super Like 啦！"
                en="You can send another Super Like after 12:00 or 00:00"
              />
            ),
            actions: [
              {
                content: (
                  <Translate zh_hant="詳情" zh_hans="详情" en="More info" />
                ),
                htmlHref: EXTERNAL_LINKS.SUPER_LIKE,
                htmlTarget: '_blank',
              },
            ],
          })
        }}
        isSuperLike={isSuperLike}
        superLiked={superLiked}
        iconSize={iconSize}
        textWeight={textWeight}
        textIconSpacing={textIconSpacing}
        {...buttonProps}
      />
    )
  }

  // MAX
  if (isReachLimit && !isSuperLike) {
    return (
      <AppreciateButton
        count="MAX"
        total={total}
        iconSize={iconSize}
        textWeight={textWeight}
        textIconSpacing={textIconSpacing}
        {...buttonProps}
      />
    )
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
          iconSize={iconSize}
          textWeight={textWeight}
          textIconSpacing={textIconSpacing}
          {...buttonProps}
        />
      </span>
    </Tooltip>
  )
}

AppreciationButton.fragments = fragments

export default AppreciationButton
