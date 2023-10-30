import { FormattedMessage } from 'react-intl'

import { PATHS } from '~/common/enums'
import { Tabs, useRoute } from '~/components'

const WorksTabs: React.FC = () => {
  const { isInPath } = useRoute()

  const isDrafts = isInPath('ME_DRAFTS')
  const isPublished = isInPath('ME_PUBLISHED')
  const isArchived = isInPath('ME_ARCHIVED')

  return (
    <Tabs>
      <Tabs.Tab href={PATHS.ME_DRAFTS} selected={isDrafts}>
        <FormattedMessage
          defaultMessage="Drafts"
          id="VeEfHm"
          description="src/views/Me/Works/WorksTabs/index.tsx"
        />
      </Tabs.Tab>

      {/* TODO: add count props */}
      <Tabs.Tab href={PATHS.ME_PUBLISHED} selected={isPublished}>
        <FormattedMessage
          defaultMessage="Published"
          id="pAQR0S"
          description="src/views/Me/Works/WorksTabs/index.tsx"
        />
      </Tabs.Tab>

      {/* TODO: add count props */}
      <Tabs.Tab href={PATHS.ME_ARCHIVED} selected={isArchived}>
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
