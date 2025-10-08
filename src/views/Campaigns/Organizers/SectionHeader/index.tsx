import { FormattedMessage } from 'react-intl'

import { PageHeader } from '~/components'

const SectionHeader = () => {
  return (
    <PageHeader
      title={
        <FormattedMessage
          defaultMessage="Curators"
          id="FVltBy"
          description="src/views/Campaigns/Organizers/SectionHeader/index.tsx"
        />
      }
      is="h2"
      hasBorder={false}
      type="base"
      spacingBottom={12}
    />
  )
}

export default SectionHeader
