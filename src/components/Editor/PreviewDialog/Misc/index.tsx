import gql from 'graphql-tag'
import { FormattedMessage } from 'react-intl'

import IconCircle from '@/public/static/icons/24px/circle.svg'
import IconCircleCheck from '@/public/static/icons/24px/circle-check.svg'
import IconInvisible from '@/public/static/icons/24px/invisible.svg'
import { BREAKPOINTS } from '~/common/enums'
import { toPath } from '~/common/utils'
import { Icon } from '~/components'
import { useMediaQuery } from '~/components/Hook/useMediaQuery'
import { useRoute } from '~/components/Hook/useRoute'
import { TextIcon } from '~/components/TextIcon'
import { EditorPreviewDialogMiscDraftFragment } from '~/gql/graphql'

import styles from './styles.module.css'

const fragment = gql`
  fragment EditorPreviewDialogMiscDraft on Draft {
    id
    canComment
    sensitiveByAuthor
    access {
      circle {
        id
      }
    }
  }
`

export const Misc = ({
  draft,
  closeDialog,
}: {
  draft: EditorPreviewDialogMiscDraftFragment
  closeDialog: () => void
}) => {
  const { getQuery, isInPath, router } = useRoute()
  const draftId = getQuery('draftId') || draft.id
  const shortHash = getQuery('shortHash')
  const isInArticleEdit = isInPath('ARTICLE_DETAIL_EDIT')
  const isInDrafts = isInPath('ME_DRAFTS')

  const isSmUp = useMediaQuery(`(min-width: ${BREAKPOINTS.MD}px)`)
  const path = isInArticleEdit
    ? toPath({
        page: 'articleEdit',
        article: { shortHash },
      })
    : isInDrafts && isSmUp
      ? toPath({
          page: 'draftDetail',
          id: draftId,
        })
      : toPath({
          page: 'draftDetailOptions',
          id: draftId,
        })

  const goToOptionsPage = (type: string) => {
    if (isInArticleEdit) {
      router.push(path.href + `?page=options&type=${type}`)
    } else {
      router.push(path.href + `?type=${type}`)
    }
  }

  const onClick = (type: string) => {
    closeDialog()
    if (isSmUp && !isInDrafts) {
      window.dispatchEvent(
        new CustomEvent('open-drawer', {
          detail: {
            type,
          },
        })
      )
      return
    }

    if (isSmUp && isInDrafts) {
      router.push(path.href + `?page=options&type=${type}`)
      return
    }

    goToOptionsPage(type)
  }
  const { canComment, sensitiveByAuthor, access } = draft

  if (!canComment && !sensitiveByAuthor && !access?.circle?.id) {
    return null
  }

  return (
    <>
      <hr />
      <section className={styles.container}>
        {canComment && (
          <button onClick={() => onClick('allowComment')}>
            <TextIcon
              icon={<Icon icon={IconCircleCheck} size={16} />}
              size={14}
              color="black"
            >
              <FormattedMessage defaultMessage="Allow comments" id="zJLPmE" />
            </TextIcon>
          </button>
        )}
        {sensitiveByAuthor && (
          <button onClick={() => onClick('sensitiveByAuthor')}>
            <TextIcon
              icon={<Icon icon={IconInvisible} size={16} />}
              size={14}
              color="black"
            >
              <FormattedMessage
                defaultMessage="Sensitive by author"
                id="OhSg5a"
              />
            </TextIcon>
          </button>
        )}
        {access?.circle?.id && (
          <button onClick={() => onClick('joinCircle')}>
            <TextIcon
              icon={<Icon icon={IconCircle} size={16} />}
              size={14}
              color="black"
            >
              <FormattedMessage defaultMessage="Join the Circle" id="0r9bbv" />
            </TextIcon>
          </button>
        )}
      </section>
    </>
  )
}

Misc.fragment = fragment
