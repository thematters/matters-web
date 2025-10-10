import { FormattedMessage } from 'react-intl'

import { PATHS } from '~/common/enums'
import { Button, PageHeader, TextIcon } from '~/components'

const SectionHeader = () => {
  return (
    <PageHeader
      title={
        <FormattedMessage
          defaultMessage="More events"
          id="jL/ZAU"
          description="src/views/CampaignDetail/OtherCampaigns/SectionHeader/index.tsx"
        />
      }
      is="h2"
      hasBorder={false}
      type="base"
      spacingBottom={12}
    >
      <Button textColor="grey" textActiveColor="black" href={PATHS.CAMPAIGNS}>
        <TextIcon size={14} weight="medium">
          <FormattedMessage
            defaultMessage="View all"
            id="9Lr84S"
            description="src/views/CampaignDetail/OtherCampaigns/SectionHeader/index.tsx"
          />
        </TextIcon>
      </Button>
    </PageHeader>
  )
}

export default SectionHeader
