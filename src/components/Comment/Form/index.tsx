import { useQuery } from '@apollo/react-hooks'
import gql from 'graphql-tag'
import dynamic from 'next/dynamic'
import { useContext, useState } from 'react'

import {
  Button,
  Icon,
  LikeCoinDialog,
  Spinner,
  TextIcon,
  Translate,
  ViewerContext
} from '~/components'
import { useMutation } from '~/components/GQL'
import CLIENT_PREFERENCE from '~/components/GQL/queries/clientPreference'

import { ADD_TOAST, ANALYTICS_EVENTS, TEXT } from '~/common/enums'
import { analytics, dom, subscribePush, trimLineBreaks } from '~/common/utils'

import styles from './styles.css'

import { ClientPreference } from '~/components/GQL/queries/__generated__/ClientPreference'
import { CommentDraft } from './__generated__/CommentDraft'
import { PutComment } from './__generated__/PutComment'

const CommentEditor = dynamic(() => import('~/components/Editor/Comment'), {
  ssr: false,
  loading: () => <Spinner />
})

export const PUT_COMMENT = gql`
  mutation PutComment($input: PutCommentInput!) {
    putComment(input: $input) {
      id
      content
    }
  }
`

const COMMENT_DRAFT = gql`
  query CommentDraft($id: ID!) {
    commentDraft(input: { id: $id }) @client(always: true) {
      id
      content
    }
  }
`

interface CommentFormProps {
  articleId: string
  commentId?: string
  replyToId?: string
  parentId?: string
  articleAuthorId: string
  submitCallback?: () => void
  extraButton?: React.ReactNode
  blocked?: boolean
  defaultExpand?: boolean
  defaultContent?: string | null
}

const CommentForm = ({
  commentId,
  parentId,
  replyToId,
  articleId,
  submitCallback,
  extraButton,
  defaultExpand,
  defaultContent
}: CommentFormProps) => {
  const commentDraftId = `${articleId}:${commentId || '0'}:${parentId ||
    '0'}:${replyToId || '0'}`

  const { data, client } = useQuery<CommentDraft>(COMMENT_DRAFT, {
    variables: {
      id: commentDraftId
    }
  })
  const { data: clientPreferenceData } = useQuery<ClientPreference>(
    CLIENT_PREFERENCE
  )
  const [putComment] = useMutation<PutComment>(PUT_COMMENT)

  const draftContent = data?.commentDraft.content || ''

  const [isSubmitting, setSubmitting] = useState(false)
  const [expand, setExpand] = useState(defaultExpand || false)
  const [content, setContent] = useState(draftContent || defaultContent || '')
  const viewer = useContext(ViewerContext)
  const isValid = !!trimLineBreaks(content)
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    const mentions = dom.getAttributes('data-id', content)
    const input = {
      id: commentId,
      comment: {
        content: trimLineBreaks(content),
        replyTo: replyToId,
        articleId,
        parentId,
        mentions
      }
    }

    const push = clientPreferenceData?.clientPreference.push
    const skipPushButton =
      !push ||
      !push.supported ||
      push.enabled ||
      Notification.permission === 'granted'

    event.preventDefault()
    setSubmitting(true)

    try {
      await putComment({ variables: { input } })
      setContent('')

      if (submitCallback) {
        submitCallback()
      }

      const CommentSent = (
        <Translate zh_hant="評論已送出" zh_hans="评论已送出" />
      )

      window.dispatchEvent(
        new CustomEvent(ADD_TOAST, {
          detail: {
            color: 'green',
            header: !skipPushButton && CommentSent,
            content: skipPushButton ? (
              CommentSent
            ) : (
              <Translate
                zh_hant={TEXT.zh_hant.pushDescription}
                zh_hans={TEXT.zh_hans.pushDescription}
              />
            ),
            customButton: !skipPushButton && (
              <button type="button" onClick={() => subscribePush()}>
                <Translate
                  zh_hant={TEXT.zh_hant.confirmPush}
                  zh_hans={TEXT.zh_hans.confirmPush}
                />
              </button>
            )
          }
        })
      )
    } catch (e) {
      console.error(e)
    }

    setSubmitting(false)
  }

  return (
    <form
      onSubmit={handleSubmit}
      className={expand ? 'expand' : ''}
      onFocus={() => {
        analytics.trackEvent(ANALYTICS_EVENTS.COMMENT_EDITOR_CHANGE, {
          state: 'focus',
          level: parentId ? 2 : 1,
          operation: commentId ? 'edit' : 'create'
        })
        setExpand(true)
      }}
      onBlur={() => {
        analytics.trackEvent(ANALYTICS_EVENTS.COMMENT_EDITOR_CHANGE, {
          state: 'blur',
          level: parentId ? 2 : 1,
          operation: commentId ? 'update' : 'create'
        })
        client.writeData({
          id: `CommentDraft:${commentDraftId}`,
          data: {
            content
          }
        })
      }}
      aria-label="發表評論"
    >
      <CommentEditor
        content={content}
        expand={expand}
        update={(params: { content: string }) => setContent(params.content)}
      />
      <div className="buttons">
        {extraButton}

        <Button
          size={[null, '2rem']}
          spacing={[0, 'base']}
          bgColor="green"
          type="submit"
          disabled={
            isSubmitting || !isValid || !viewer.isAuthed || viewer.isInactive
          }
        >
          <TextIcon
            color="white"
            weight="md"
            icon={isSubmitting ? <Icon.Spinner size="sm" /> : <Icon.Edit />}
          >
            <Translate zh_hant="送出" zh_hans="送出" />
          </TextIcon>
        </Button>
      </div>

      <style jsx>{styles}</style>
    </form>
  )
}

const CommentFormWrap = (props: CommentFormProps) => {
  const viewer = useContext(ViewerContext)

  if (viewer.shouldSetupLikerID) {
    return (
      <LikeCoinDialog>
        {({ open }) => (
          <button className="blocked" type="button" onClick={open}>
            <Translate
              zh_hant="設置 Liker ID 後即可參與精彩討論"
              zh_hans="设置 Liker ID 后即可参与精彩讨论"
            />
            <style jsx>{styles}</style>
          </button>
        )}
      </LikeCoinDialog>
    )
  }

  if (viewer.isOnboarding && props.articleAuthorId !== viewer.id) {
    return (
      <p className="blocked">
        <Translate
          zh_hant="新手小貼士：發佈作品收穫讚賞及瀏覽他人作品都能幫你開啓評論權限喔！"
          zh_hans="新手小贴士：发布作品收获赞赏及浏览他人作品都能帮你开启评论权限喔！"
        />
        <style jsx>{styles}</style>
      </p>
    )
  }

  if (props.blocked) {
    return (
      <p className="blocked">
        <Translate
          zh_hant="因爲作者設置，你無法參與該作品下的討論。"
          zh_hans="因为作者设置，你无法参与该作品下的讨论。"
        />
        <style jsx>{styles}</style>
      </p>
    )
  }

  return <CommentForm {...props} />
}

export default CommentFormWrap
