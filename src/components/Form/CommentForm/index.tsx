import gql from 'graphql-tag'
import dynamic from 'next/dynamic'
import { useContext, useState } from 'react'
import { useQuery } from 'react-apollo'

import { Button } from '~/components/Button'
import { useMutation } from '~/components/GQL'
import { ClientPreference } from '~/components/GQL/queries/__generated__/ClientPreference'
import CLIENT_PREFERENCE from '~/components/GQL/queries/clientPreference'
import COMMENT_COMMENTS from '~/components/GQL/queries/commentComments'
import { Icon } from '~/components/Icon'
import IconSpinner from '~/components/Icon/Spinner'
import { Translate } from '~/components/Language'
import { ModalSwitch } from '~/components/ModalManager'
import { Spinner } from '~/components/Spinner'
import { ViewerContext } from '~/components/Viewer'

import { ADD_TOAST, TEXT } from '~/common/enums'
import { dom, subscribePush, trimLineBreaks } from '~/common/utils'
import ICON_POST from '~/static/icons/post.svg?sprite'

import { CommentDraft } from './__generated__/CommentDraft'
import { PutComment } from './__generated__/PutComment'
import styles from './styles.css'

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
  submitCallback?: () => void
  refetch?: boolean
  extraButton?: React.ReactNode
  blocked?: boolean
  defaultExpand?: boolean
  defaultContent?: string | null
}

// TODO: remove refetchQueries, use refetch in submitCallback instead
const CommentForm = ({
  commentId,
  parentId,
  replyToId,
  articleId,
  submitCallback,
  refetch,
  blocked,
  extraButton,
  defaultExpand,
  defaultContent
}: CommentFormProps) => {
  const commentDraftId = `${articleId}:${commentId || '0'}:${parentId ||
    '0'}:${replyToId || '0'}`
  const refetchQueries = !refetch
    ? []
    : parentId
    ? [
        {
          query: COMMENT_COMMENTS,
          variables: { id: parentId }
        }
      ]
    : []

  const { data, client } = useQuery<CommentDraft>(COMMENT_DRAFT, {
    variables: {
      id: commentDraftId
    }
  })
  const { data: clientPreferenceData } = useQuery<ClientPreference>(
    CLIENT_PREFERENCE
  )
  const [putComment] = useMutation<PutComment>(PUT_COMMENT, {
    refetchQueries
  })

  const push =
    clientPreferenceData && clientPreferenceData.clientPreference.push
  const draftContent = (data && data.commentDraft.content) || ''

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

    event.preventDefault()
    setSubmitting(true)

    try {
      await putComment({ variables: { input } })

      if (submitCallback) {
        submitCallback()
      }

      setContent('')

      if (!push || !push.supported || push.enabled) {
        return
      }

      window.dispatchEvent(
        new CustomEvent(ADD_TOAST, {
          detail: {
            color: 'green',
            header: <Translate zh_hant="評論已送出" zh_hans="评论已送出" />,
            content: (
              <Translate
                zh_hant={TEXT.zh_hant.pushDescription}
                zh_hans={TEXT.zh_hans.pushDescription}
              />
            ),
            customButton: (
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
      // TODO
    }

    setSubmitting(false)
  }

  return (
    <form
      onSubmit={handleSubmit}
      className={expand ? 'expand' : ''}
      onFocus={() => setExpand(true)}
      onBlur={() => {
        client.writeData({
          id: `CommentDraft:${commentDraftId}`,
          data: {
            content
          }
        })
      }}
    >
      <CommentEditor
        content={content}
        expand={expand}
        update={(params: { content: string }) => setContent(params.content)}
      />
      <div className="buttons">
        {extraButton && extraButton}
        <Button
          type="submit"
          bgColor="green"
          disabled={
            isSubmitting || !isValid || !viewer.isAuthed || viewer.isInactive
          }
          icon={
            isSubmitting ? (
              <IconSpinner />
            ) : (
              <Icon id={ICON_POST.id} viewBox={ICON_POST.viewBox} />
            )
          }
        >
          <Translate zh_hant="送出" zh_hans="送出" />
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
      <ModalSwitch modalId="likeCoinTermModal">
        {(open: any) => (
          <button className="blocked" onClick={open}>
            <Translate
              zh_hant="設置 Liker ID 後即可參與精彩討論"
              zh_hans="设置 Liker ID 后即可参与精彩讨论"
            />

            <style jsx>{styles}</style>
          </button>
        )}
      </ModalSwitch>
    )
  }

  if (props.blocked) {
    return (
      <section className="blocked">
        <Translate
          zh_hant="因爲作者設置，你無法參與該作品下的討論。"
          zh_hans="因为作者设置，你无法参与该作品下的讨论。"
        />

        <style jsx>{styles}</style>
      </section>
    )
  }

  return <CommentForm {...props} />
}

export default CommentFormWrap
