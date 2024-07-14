import gql from 'graphql-tag'
import { FormattedMessage } from 'react-intl'

import { datetimeFormat } from '~/common/utils'
import { Form } from '~/components'
import {
  ArticleCampaignInput,
  EditorSelectCampaignFragment,
} from '~/gql/graphql'

export interface SelectCampaignProps {
  selectedCampaign: EditorSelectCampaignFragment
  selectedStage?: string
  editCampaign: (value?: ArticleCampaignInput) => any
}

const SelectCampaign = ({
  selectedCampaign,
  selectedStage,
  editCampaign,
}: SelectCampaignProps) => {
  const RESET_OPTION = {
    name: <FormattedMessage defaultMessage="Please select..." id="VrK0Q0" />,
    value: undefined,
    selected: !selectedStage,
  }
  const now = new Date()
  const availableStages = selectedCampaign.stages.filter((s) => {
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
            ? { campaign: selectedCampaign.id, stage: option.value }
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
            selected: s.id === selectedStage,
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
