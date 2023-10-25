import { useQuery } from '@apollo/react-hooks'
import gql from 'graphql-tag'
import { FormattedMessage } from 'react-intl'

import { PATHS } from '~/common/enums'
import { Tabs, useRoute } from '~/components'
import { MeWorksTabsQuery } from '~/gql/graphql'

export const ME_WORKS_TABS = gql`
  query MeWorksTabs {
    viewer {
      id
      drafts(input: { first: 0 }) @connection(key: "viewerDrafts") {
        totalCount
      }
    }
  }
`

const WorksTabs: React.FC = () => {
  const { isInPath } = useRoute()
  const { data } = useQuery<MeWorksTabsQuery>(ME_WORKS_TABS)

  const isDrafts = isInPath('ME_WORKS')
  const isPublished = isInPath('ME_WORKS_PUBLISHED')
  const isArchived = isInPath('ME_WORKS_ARCHIVED')

  const draftsCount = data?.viewer?.drafts.totalCount || 0

  return (
    <Tabs>
      <Tabs.Tab
        href={PATHS.ME_WORKS}
        selected={isDrafts}
        count={draftsCount > 0 ? draftsCount : undefined}
      >
        <FormattedMessage
          defaultMessage="Drafts"
          id="VeEfHm"
          description="src/views/Me/Works/WorksTabs/index.tsx"
        />
      </Tabs.Tab>

      {/* TODO: add count props */}
      <Tabs.Tab href={PATHS.ME_WORKS_PUBLISHED} selected={isPublished}>
        <FormattedMessage
          defaultMessage="Published"
          id="pAQR0S"
          description="src/views/Me/Works/WorksTabs/index.tsx"
        />
      </Tabs.Tab>

      {/* TODO: add count props */}
      <Tabs.Tab href={PATHS.ME_WORKS_ARCHIVED} selected={isArchived}>
        <FormattedMessage
          defaultMessage="Archived"
          id="qPqap+"
          description="src/views/Me/Works/WorksTabs/index.tsx"
        />
      </Tabs.Tab>
    </Tabs>
  )
}

export default WorksTabs
