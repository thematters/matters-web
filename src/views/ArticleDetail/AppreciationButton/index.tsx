import { memo, useContext, useState } from 'react'
import { useDebouncedCallback } from 'use-debounce'

import { APPRECIATE_DEBOUNCE, Z_INDEX } from '~/common/enums'
import {
  ButtonProps,
  Tooltip,
  Translate,
  useMutation,
  ViewerContext,
} from '~/components'
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
  clickEvent?: () => void
} & ButtonProps

const AppreciationButton = ({
  article,
  privateFetched,
  disabled,
  iconSize = 20,
  textWeight = 'medium',
  textIconSpacing = 8,
  clickEvent,
  ...buttonProps
}: AppreciationButtonProps) => {
  const viewer = useContext(ViewerContext)
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
  const isReachLimit = left <= 0
  const debouncedSendAppreciation = useDebouncedCallback(async () => {
    try {
      await sendAppreciation({
        variables: { id: article.id, amount },
        optimisticResponse: {
          appreciateArticle: {
            id: article.id,
            likesReceivedTotal: total,
            appreciateLeft: left,
            __typename: 'Article',
          },
        },
        update: () => {
          setAmount(0)
        },
      })
    } catch (e) {
      console.error(e)
    }
  }, APPRECIATE_DEBOUNCE)

  const appreciate = () => {
    setAmount(amount + 1)
    debouncedSendAppreciation()
  }

  const canAppreciate = !isReachLimit && !viewer.isArchived

  // Anonymous
  if (!viewer.isAuthed) {
    return (
      <AnonymousButton
        total={total}
        iconSize={iconSize}
        textIconSpacing={textIconSpacing}
        clickEvent={clickEvent}
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
        clickEvent={clickEvent}
        {...buttonProps}
      />
    )
  }

  // Appreciable
  if (canAppreciate && !disabled) {
    return (
      <section>
        <AppreciateButton
          onClick={appreciate}
          count={appreciatedCount > 0 ? appreciatedCount : undefined}
          total={total}
          iconSize={iconSize}
          textWeight={textWeight}
          textIconSpacing={textIconSpacing}
          clickEvent={clickEvent}
          {...buttonProps}
        />
      </section>
    )
  }

  // MAX
  if (isReachLimit) {
    return (
      <AppreciateButton
        count="MAX"
        total={total}
        iconSize={iconSize}
        textWeight={textWeight}
        textIconSpacing={textIconSpacing}
        clickEvent={clickEvent}
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
          clickEvent={clickEvent}
          {...buttonProps}
        />
      </span>
    </Tooltip>
  )
}

type MemoizedAppreciationButtonType = React.MemoExoticComponent<
  React.FC<AppreciationButtonProps>
> & {
  fragments: typeof fragments
}

const MemoizedAppreciationButton = memo(
  AppreciationButton,
  ({ article: prevArticle }, { article }) => {
    return (
      prevArticle.id === article.id &&
      prevArticle.appreciateLimit === article.appreciateLimit &&
      prevArticle.appreciateLeft === article.appreciateLeft &&
      prevArticle.likesReceivedTotal === article.likesReceivedTotal
    )
  }
) as MemoizedAppreciationButtonType

MemoizedAppreciationButton.fragments = fragments

export default MemoizedAppreciationButton
