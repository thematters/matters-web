import gql from 'graphql-tag'
import { FormattedMessage } from 'react-intl'

import IconRight from '@/public/static/icons/24px/right.svg'
import { BREAKPOINTS } from '~/common/enums'
import { toPath } from '~/common/utils'
import { Icon, useMediaQuery, useRoute } from '~/components'
import { EditorPreviewDialogCampaignDraftFragment } from '~/gql/graphql'

import styles from './styles.module.css'

const fragment = gql`
  fragment EditorPreviewDialogCampaignDraft on Draft {
    campaigns {
      campaign {
        id
        name
      }
    }
  }
`

export const Campaign = ({
  draft,
  closeDialog,
}: {
  draft: EditorPreviewDialogCampaignDraftFragment
  closeDialog: () => void
}) => {
  const { getQuery, router } = useRoute()
  const draftId = getQuery('draftId')
  const path = toPath({
    page: 'draftDetailOptions',
    id: draftId,
  })
  const goToOptionsPage = () => {
    router.push(path.href + '?type=campaign')
  }
  const { campaign } = draft.campaigns[0]
  const isSmUp = useMediaQuery(`(min-width: ${BREAKPOINTS.MD}px)`)
  const onClick = () => {
    closeDialog()
    if (isSmUp) {
      window.dispatchEvent(
        new CustomEvent('open-drawer', {
          detail: {
            type: 'campaign',
            id: campaign.id,
            name: campaign.name,
          },
        })
      )
      return
    }

    goToOptionsPage()
  }
  return (
    <button className={styles.container} onClick={onClick}>
      <section className={styles.left}>
        <span className={styles.title}>
          <FormattedMessage
            defaultMessage="Event"
            id="+SgLoK"
            description="src/components/Editor/PreviewDialog/Campaign/index.tsx"
          />
        </span>
        <div className={styles.name}>{campaign.name}</div>
      </section>
      <section className={styles.right}>
        <Icon icon={IconRight} size={14} color="black" />
      </section>
    </button>
  )
}

Campaign.fragment = fragment
