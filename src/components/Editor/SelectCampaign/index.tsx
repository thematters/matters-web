import gql from 'graphql-tag'
import { useContext } from 'react'
import { FormattedMessage } from 'react-intl'

import { datetimeFormat } from '~/common/utils'
import { Form, LanguageContext } from '~/components'
import {
  ArticleCampaignInput,
  EditorSelectCampaignFragment,
} from '~/gql/graphql'

export interface SelectCampaignProps {
  appliedCampaign: EditorSelectCampaignFragment
  selectedStage?: string
  editCampaign: (value?: ArticleCampaignInput) => any
}

export const getSelectCampaign = ({
  applied,
  attached,
  createdAt,
}: {
  applied?: EditorSelectCampaignFragment
  attached: Array<{ campaign: { id: string }; stage: { id: string } }>
  createdAt: string // draft or article creation time
}) => {
  const { start, end } = applied?.writingPeriod || {}
  const isCampaignStarted = !!start && new Date(createdAt) >= new Date(start)
  const isCampaignEnded = !end || (!!end && new Date(createdAt) < new Date(end))

  // only show appliedCampaign if the article or draft is created during the writing period
  const appliedCampaign =
    isCampaignStarted && isCampaignEnded ? applied : undefined
  const selectedCampaign = attached.filter(
    (c) => c.campaign.id === applied?.id
  )[0]
  const selectedStage = selectedCampaign?.stage?.id

  return {
    appliedCampaign,
    selectedStage,
  }
}

const SelectCampaign = ({
  appliedCampaign,
  selectedStage,
  editCampaign,
}: SelectCampaignProps) => {
  const { lang } = useContext(LanguageContext)
  const RESET_OPTION = {
    name: <FormattedMessage defaultMessage="Please select..." id="VrK0Q0" />,
    value: undefined,
    selected: !selectedStage,
  }
  const now = new Date()
  const availableStages = appliedCampaign.stages.filter((s) => {
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
            ? { campaign: appliedCampaign.id, stage: option.value }
            : undefined
        )
      }
      options={[
        RESET_OPTION,
        ...availableStages.reverse().map((s) => {
          return {
            name: s.period?.start
              ? `${s.name} - ${datetimeFormat.absolute({
                  date: s.period.start,
                  lang,
                  optionalYear: false,
                  utc8: true,
                })}`
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
    writingPeriod {
      start
      end
    }
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
