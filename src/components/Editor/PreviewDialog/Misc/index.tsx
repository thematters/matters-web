import gql from 'graphql-tag'
import { FormattedMessage } from 'react-intl'

import IconCircleCheck from '@/public/static/icons/24px/circle-check.svg'
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
  const { getQuery, router } = useRoute()
  const draftId = getQuery('draftId')
  const path = toPath({
    page: 'draftDetailOptions',
    id: draftId,
  })

  const goToOptionsPage = (type: string) => {
    router.push(path.href + `?type=${type}`)
  }

  const isSmUp = useMediaQuery(`(min-width: ${BREAKPOINTS.MD}px)`)

  const onClick = (type: string) => {
    closeDialog()
    if (isSmUp) {
      window.dispatchEvent(
        new CustomEvent('open-drawer', {
          detail: {
            type,
          },
        })
      )
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
              icon={<Icon icon={IconCircleCheck} size={16} />}
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
              icon={<Icon icon={IconCircleCheck} size={16} />}
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
