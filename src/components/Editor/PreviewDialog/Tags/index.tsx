import gql from 'graphql-tag'
import { FormattedMessage } from 'react-intl'

import IconRight from '@/public/static/icons/24px/right.svg'
import { BREAKPOINTS } from '~/common/enums'
import { toPath } from '~/common/utils'
import { Icon, useMediaQuery, useRoute } from '~/components'
import { EditorPreviewDialogTagsDraftFragment } from '~/gql/graphql'

import styles from './styles.module.css'

const fragment = gql`
  fragment EditorPreviewDialogTagsDraft on Draft {
    tags
  }
`

export const Tags = ({
  draft,
  closeDialog,
}: {
  draft: EditorPreviewDialogTagsDraftFragment
  closeDialog: () => void
}) => {
  const { getQuery, router } = useRoute()
  const draftId = getQuery('draftId')
  const path = toPath({
    page: 'draftDetailOptions',
    id: draftId,
  })
  const goToOptionsPage = () => {
    router.push(path.href + '?type=tags')
  }
  const { tags } = draft
  const isSmUp = useMediaQuery(`(min-width: ${BREAKPOINTS.MD}px)`)
  const onClick = () => {
    closeDialog()
    if (isSmUp) {
      window.dispatchEvent(
        new CustomEvent('open-drawer', {
          detail: {
            type: 'tags',
          },
        })
      )
      return
    }

    goToOptionsPage()
  }
  if (!tags) {
    return null
  }
  return (
    <button className={styles.container} onClick={onClick}>
      <section className={styles.left}>
        <span className={styles.title}>
          <FormattedMessage
            defaultMessage="Tags"
            id="gccvX4"
            description="src/components/Editor/PreviewDialog/Tags/index.tsx"
          />
        </span>
        <section className={styles.tags}>
          {tags.map((tag) => (
            <div className={styles.name} key={tag}>
              {tag}
            </div>
          ))}
        </section>
      </section>
      <section className={styles.right}>
        <Icon icon={IconRight} size={14} color="black" />
      </section>
    </button>
  )
}

Tags.fragment = fragment
