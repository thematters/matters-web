// import Script from 'next/script'
import { useContext, useRef, useState } from 'react'
import { useDebouncedCallback } from 'use-debounce'

import { APPRECIATE_DEBOUNCE, EXTERNAL_LINKS, Z_INDEX } from '~/common/enums'
import {
  ReCaptchaContext,
  toast,
  Tooltip,
  Translate,
  Turnstile,
  // TURNSTILE_DEFAULT_SCRIPT_ID,
  // TURNSTILE_SCRIPT_URL,
  TurnstileInstance,
  useMutation,
  ViewerContext,
} from '~/components'
import { updateAppreciation } from '~/components/GQL'
// import { UserGroup } from '~/gql/graphql'
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

interface AppreciationButtonProps {
  article: AppreciationButtonArticlePublicFragment &
    Partial<AppreciationButtonArticlePrivateFragment>
  privateFetched: boolean
  disabled?: boolean
}

const AppreciationButton = ({
  article,
  privateFetched,
  disabled,
}: AppreciationButtonProps) => {
  const viewer = useContext(ViewerContext)

  const turnstileRef = useRef<TurnstileInstance>(null)
  const { token, refreshToken } = useContext(ReCaptchaContext)

  const isArticleAuthor = article.author.id === viewer.id

  /**
   * Normal Appreciation
   */
  const [amount, setAmount] = useState(0)
  const [sendAppreciation] =
    useMutation<AppreciateArticleMutation>(APPRECIATE_ARTICLE)
  const limit = article.appreciateLimit
  const left =
    (typeof article.appreciateLeft === 'number'
      ? article.appreciateLeft
      : limit) - amount
  const total = article.likesReceivedTotal + amount
  const appreciatedCount = limit - left
  const isReachLimit = left <= 0 || isArticleAuthor
  const debouncedSendAppreciation = useDebouncedCallback(async () => {
    try {
      await sendAppreciation({
        variables: {
          id: article.id,
          amount,
          token:
            // (viewer.info.group === UserGroup.A &&
            // turnstileRef.current?.getResponse()) || // fallback to ReCaptchaContext token
            `${token} ${turnstileRef.current?.getResponse()}`,
        },
      }) // .then(refreshToken)
    } catch (e) {
      console.error(e)
    } finally {
      refreshToken?.()
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
          token:
            // (viewer.info.group === UserGroup.A &&
            // turnstileRef.current?.getResponse()) || // fallback to ReCaptchaContext token
            `${token} ${turnstileRef.current?.getResponse()}`,
          superLike: true,
        },
        update: (cache) => {
          updateAppreciation({
            cache,
            left,
            id: article.id,
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
      debouncedSendAppreciation()
    }
  }

  const canAppreciate =
    (!isReachLimit && !viewer.isArchived) || (isSuperLike && canSuperLike)

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

  // Blocked by private query
  if (!privateFetched) {
    return <AppreciateButton total={total} disabled />
  }

  const siteKey = process.env
    .NEXT_PUBLIC_CLOUDFLARE_TURNSTILE_SITE_KEY as string

  // Appreciable
  if (canAppreciate && !disabled) {
    return (
      <section>
        <Turnstile
          ref={turnstileRef}
          options={{
            action: 'appreciate',
            cData: `user-group-${viewer.info.group}`,
            // refreshExpired: 'manual',
            size: 'invisible',
          }}
          siteKey={siteKey}
          // injectScript={false}
          scriptOptions={{
            compat: 'recaptcha',
            appendTo: 'body',
          }}
        />
        <AppreciateButton
          onClick={appreciate}
          count={appreciatedCount > 0 ? appreciatedCount : undefined}
          total={total}
          isSuperLike={isSuperLike}
          superLiked={superLiked}
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
