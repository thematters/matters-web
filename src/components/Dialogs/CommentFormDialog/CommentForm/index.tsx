import { useQuery } from '@apollo/react-hooks'
import gql from 'graphql-tag'
import dynamic from 'next/dynamic'
import { useContext, useState } from 'react'

import {
  Button,
  Icon,
  Spinner,
  TextIcon,
  Translate,
  ViewerContext
} from '~/components'
import { useMutation } from '~/components/GQL'
import CLIENT_PREFERENCE from '~/components/GQL/queries/clientPreference'

import { ADD_TOAST, ANALYTICS_EVENTS } from '~/common/enums'
import { analytics, dom, subscribePush, trimLineBreaks } from '~/common/utils'

import styles from './styles.css'

import { ClientPreference } from '~/components/GQL/queries/__generated__/ClientPreference'
import { CommentDraft } from './__generated__/CommentDraft'
import { PutComment } from './__generated__/PutComment'

const CommentEditor = dynamic(() => import('~/components/Editor/Comment'), {
  ssr: false,
  loading: Spinner
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

export interface CommentFormProps {
  commentId?: string
  articleId: string
  articleAuthorId: string
  replyToId?: string
  parentId?: string

  submitCallback?: () => void
  defaultContent?: string | null
}

const ComemntForm: React.FC<CommentFormProps> = ({
  commentId,
  articleId,
  articleAuthorId,
  replyToId,
  parentId,
  submitCallback,
  defaultContent
}) => {
  const commentDraftId = `${articleId}:${id || 0}:${parentId ||
    0}:${replyToId || 0}`

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
      id,
      comment: {
        content: trimLineBreaks(content),
        replyTo: replyToId,
        articleId,
        parentId,
        mentions
      }
    }

    const push = clientPreferenceData?.clientPreference.push
    const skipPushButton = !push || !push.supported || push.enabled

    event.preventDefault()
    setSubmitting(true)

    try {
      await putComment({ variables: { input } })
      setContent('')

      if (submitCallback) {
        submitCallback()
      }

      window.dispatchEvent(
        new CustomEvent(ADD_TOAST, {
          detail: {
            color: 'green',
            content: skipPushButton ? (
              <Translate zh_hant="評論已送出" zh_hans="评论已送出" />
            ) : (
              <Translate id="pushDescription" />
            ),
            customButton: !skipPushButton && (
              <Button onClick={subscribePush}>
                <Translate id="confirmPush" />
              </Button>
            ),
            buttonPlacement: 'center'
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
          operation: id ? 'edit' : 'create'
        })
        setExpand(true)
      }}
      onBlur={() => {
        analytics.trackEvent(ANALYTICS_EVENTS.COMMENT_EDITOR_CHANGE, {
          state: 'blur',
          level: parentId ? 2 : 1,
          operation: id ? 'update' : 'create'
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

      <style jsx>{styles}</style>
    </form>
  )
}

export default CommentForm
