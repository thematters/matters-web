import { useQuery } from '@apollo/client'
import { FormattedMessage } from 'react-intl'

import { PATHS } from '~/common/enums'
import { Tabs, useRoute } from '~/components'
import { MeWorksTabsQuery } from '~/gql/graphql'

import { ME_WORKS_TABS } from './gql'

const WorksTabs: React.FC = () => {
  const { isInPath } = useRoute()
  const { data } = useQuery<MeWorksTabsQuery>(ME_WORKS_TABS)

  const isDrafts = isInPath('ME_DRAFTS')
  const isPublished = isInPath('ME_PUBLISHED')
  const isArchived = isInPath('ME_ARCHIVED')

  const draftsCount = data?.viewer?.drafts.totalCount || 0
  const publishedCount = data?.viewer?.publishedArticles.totalCount || 0
  const archivedCount = data?.viewer?.archivedArticles.totalCount || 0

  return (
    <Tabs>
      <Tabs.Tab
        href={PATHS.ME_DRAFTS}
        selected={isDrafts}
        count={draftsCount > 0 ? draftsCount : undefined}
      >
        <FormattedMessage
          defaultMessage="Drafts"
          id="VeEfHm"
          description="src/views/Me/Works/WorksTabs/index.tsx"
        />
      </Tabs.Tab>

      <Tabs.Tab
        href={PATHS.ME_PUBLISHED}
        selected={isPublished}
        count={publishedCount > 0 ? publishedCount : undefined}
      >
        <FormattedMessage
          defaultMessage="Published"
          id="pAQR0S"
          description="src/views/Me/Works/WorksTabs/index.tsx"
        />
      </Tabs.Tab>

      {archivedCount > 0 && (
        <Tabs.Tab
          href={PATHS.ME_ARCHIVED}
          selected={isArchived}
          count={archivedCount > 0 ? archivedCount : undefined}
        >
          <FormattedMessage
            defaultMessage="Archived"
            id="qPqap+"
            description="src/views/Me/Works/WorksTabs/index.tsx"
          />
        </Tabs.Tab>
      )}
    </Tabs>
  )
}

export default WorksTabs
