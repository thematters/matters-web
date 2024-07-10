import gql from 'graphql-tag'

import { datetimeFormat } from '~/common/utils'
import { Form } from '~/components'
import { EditorSelectCampaignFragment } from '~/gql/graphql'

export interface SelectCampaignProps {
  campaign: EditorSelectCampaignFragment
  stage?: string // selected stage
  editCampaign: (value?: { campaign: string; stage: string }) => Promise<any>
}

const SelectCampaign = ({
  campaign,
  stage,
  editCampaign,
}: SelectCampaignProps) => {
  const RESET_OPTION = {
    name: '---',
    value: undefined,
    selected: !stage,
  }
  const now = new Date()
  const availableStages = campaign.stages.filter((s) => {
    const period = s.period

    if (!period) return false

    return now >= new Date(period.start)
  })

  return (
    <Form.Select<string | undefined>
      name="select-campaign"
      onChange={(option) =>
        editCampaign(
          option.value
            ? { campaign: campaign.id, stage: option.value }
            : undefined
        )
      }
      options={[
        RESET_OPTION,
        ...availableStages.map((s) => {
          return {
            name: s.period?.start
              ? `${s.name} - ${datetimeFormat.absolute(s.period?.start)}`
              : s.name,
            value: s.id,
            selected: s.id === stage,
          }
        }),
      ]}
      size={14}
      color="freeWriteBlue"
    />
  )
}

SelectCampaign.fragments = gql`
  fragment EditorSelectCampaign on WritingChallenge {
    id
    stages {
      id
      name
      period {
        start
        end
      }
    }
  }
`

export default SelectCampaign
