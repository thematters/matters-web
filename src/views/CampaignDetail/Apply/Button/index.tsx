import gql from 'graphql-tag'
import { useRouter } from 'next/router'
import { useContext } from 'react'
import { useIntl } from 'react-intl'

import IconCheck from '@/public/static/icons/24px/check.svg'
import {
  ERROR_CODES,
  ERROR_MESSAGES,
  OPEN_UNIVERSAL_AUTH_DIALOG,
  UNIVERSAL_AUTH_TRIGGER,
} from '~/common/enums'
import { toPath } from '~/common/utils'
import {
  Button,
  Icon,
  LanguageContext,
  TextIcon,
  toast,
  useMutation,
  useRoute,
  ViewerContext,
} from '~/components'
import {
  ApplyCampaignPrivateFragment,
  ApplyCampaignPublicFragment,
  SubmitCampaignArticleMutation,
} from '~/gql/graphql'

import { CampaignFeedType } from '../../ArticleFeeds/Tabs'

type ApplyCampaignButtonProps = {
  campaign: ApplyCampaignPublicFragment & Partial<ApplyCampaignPrivateFragment>
  size: 'lg' | 'sm'
  onClick: () => void
}

const SUBMIT_CAMPAIGN_ARTICLE = gql`
  mutation SubmitCampaignArticle($title: String!, $campaign: ID!, $stage: ID!) {
    putDraft(
      input: {
        title: $title
        campaigns: { campaign: $campaign, stage: $stage }
      }
    ) {
      id
    }
  }
`

const ApplyCampaignButton = ({
  campaign,
  size,
  onClick,
}: ApplyCampaignButtonProps) => {
  const intl = useIntl()
  const viewer = useContext(ViewerContext)
  const { lang } = useContext(LanguageContext)
  const { getQuery } = useRoute()
  const router = useRouter()
  const [submitCampaignArticle] = useMutation<SubmitCampaignArticleMutation>(
    SUBMIT_CAMPAIGN_ARTICLE
  )

  const qsType = getQuery('type') as CampaignFeedType
  const now = new Date()
  const { start: appStart, end: appEnd } = campaign.applicationPeriod || {}
  const applicationState = campaign.application?.state
  const appliedAt = campaign.application?.createdAt

  const isApplicationStarted = now >= new Date(appStart)
  const isInApplicationPeriod = !appEnd || now < new Date(appEnd)
  const isWritingPeriodStarted =
    campaign.writingPeriod && now >= new Date(campaign.writingPeriod.start)
  const isSucceeded = applicationState === 'succeeded'
  const isPending = applicationState === 'pending'
  const isRejected = applicationState === 'rejected'
  const isNotApplied = !applicationState
  const isAppliedDuringPeriod =
    (appliedAt && appEnd && new Date(appliedAt) <= new Date(appEnd)) ||
    (appliedAt && !appEnd)
  const isActiveCampaign = campaign.state === 'active'
  const isFinishedCampaign = campaign.state === 'finished'

  const selectedStage = campaign.stages.find((stage) => stage.id === qsType)
  const isSelectedStage = campaign.stages.some((stage) => stage.id === qsType)
  const todayStage = campaign.stages.find(
    (stage) =>
      now.toDateString() === new Date(stage.period?.start).toDateString()
  )

  const getButtonAppearance = () => {
    const primary =
      isInApplicationPeriod || (isSucceeded && isAppliedDuringPeriod)
    const isLateSucceeded = !isAppliedDuringPeriod && isSucceeded

    return {
      bgColor: primary ? 'green' : undefined,
      borderColor: primary ? 'green' : isLateSucceeded ? 'grey' : 'green',
      textColor: primary ? 'white' : isLateSucceeded ? 'grey' : 'green',
      disabled:
        isPending ||
        !isApplicationStarted ||
        (isSucceeded && !isWritingPeriodStarted),
    }
  }

  const getStageName = (stage: any) => {
    if (lang === 'zh_hans') return stage.nameZhHans
    if (lang === 'zh_hant') return stage.nameZhHant
    return stage.nameEn
  }

  const submit = async (campaignId: string, stageId: string) => {
    if (!viewer.isAuthed) {
      window.dispatchEvent(
        new CustomEvent(OPEN_UNIVERSAL_AUTH_DIALOG, {
          detail: { trigger: UNIVERSAL_AUTH_TRIGGER.applyCampaign },
        })
      )
      return
    }

    if (viewer.isInactive) {
      toast.error({
        message: intl.formatMessage(ERROR_MESSAGES[ERROR_CODES.FORBIDDEN]!),
      })
      return
    }

    const { data } = await submitCampaignArticle({
      variables: { title: '', campaign: campaignId, stage: stageId },
    })

    const { id } = data?.putDraft || {}
    if (id) {
      const path = toPath({ page: 'draftDetail', id })
      router.push(path.href)
    }
  }

  const handleAuthClick = () => {
    if (!viewer.isAuthed) {
      window.dispatchEvent(
        new CustomEvent(OPEN_UNIVERSAL_AUTH_DIALOG, {
          detail: { trigger: UNIVERSAL_AUTH_TRIGGER.applyCampaign },
        })
      )
    } else {
      onClick()
    }
  }

  const renderButton = (text: React.ReactNode, props: any = {}) => {
    const { bgColor, borderColor, textColor, disabled } = getButtonAppearance()
    const showCheckIcon = isSucceeded && !props.customIcon
    const buttonProps = {
      onClick: props.customClick || handleAuthClick,
      disabled: props.disabled !== undefined ? props.disabled : disabled,
      borderWidth: 'sm' as 'sm' | 'md',
      borderColor: props.borderColor || borderColor,
      bgColor: props.bgColor || bgColor,
    }

    const iconProps = {
      icon: showCheckIcon ? (
        <Icon icon={IconCheck} size={size === 'lg' ? 20 : 16} />
      ) : (
        props.icon
      ),
      color: props.textColor || textColor,
    }

    if (size === 'lg') {
      return (
        <Button {...buttonProps} size={['100%', '3rem']}>
          <TextIcon {...iconProps} size={16} weight="normal" placement="right">
            {text}
          </TextIcon>
        </Button>
      )
    }

    return (
      <Button {...buttonProps} size={[null, '1.875rem']} spacing={[0, 20]}>
        <TextIcon {...iconProps} spacing={4} size={14}>
          {text}
        </TextIcon>
      </Button>
    )
  }

  const renderEndedButton = () => {
    return renderButton(
      intl.formatMessage({
        defaultMessage: 'Ended',
        id: 'mbHf/6',
        description: 'src/views/CampaignDetail/Apply/Button/index.tsx',
      }),
      {
        disabled: true,
        borderColor: 'green',
        bgColor: 'green',
        textColor: 'white',
        icon: <Icon icon={IconCheck} size={size === 'lg' ? 20 : 16} />,
        customIcon: true,
      }
    )
  }

  const renderDefaultSubmitButton = () => {
    return renderButton(
      intl.formatMessage({
        defaultMessage: 'Submit',
        id: 'dE4mlL',
        description: 'src/views/CampaignDetail/Apply/Button/index.tsx',
      }),
      {
        customClick: () => submit(campaign.id, todayStage?.id || ''),
        borderColor: 'green',
        bgColor: 'white',
        textColor: 'green',
        customIcon: <></>,
        disabled: false,
      }
    )
  }

  const renderTodaySubmitButton = () => {
    return renderButton(
      intl.formatMessage({
        defaultMessage: 'Submit',
        id: 'dE4mlL',
        description: 'src/views/CampaignDetail/Apply/Button/index.tsx',
      }),
      {
        customClick: () => submit(campaign.id, selectedStage?.id || ''),
        borderColor: 'green',
        bgColor: 'white',
        textColor: 'green',
        customIcon: <></>,
        disabled: false,
      }
    )
  }

  const renderStageSubmitButton = () => {
    return renderButton(
      intl.formatMessage(
        {
          defaultMessage: 'Submit to {dayName}',
          id: 'UfvCjD',
          description: 'src/views/CampaignDetail/Apply/Button/index.tsx',
        },
        {
          dayName: getStageName(selectedStage),
        }
      ),
      {
        customClick: () => submit(campaign.id, selectedStage?.id || ''),
        borderColor: 'green',
        bgColor: 'white',
        textColor: 'green',
        customIcon: <></>,
        disabled: false,
      }
    )
  }

  const renderApplicationStateButton = () => {
    let buttonText = ''

    if (isPending) {
      buttonText = isInApplicationPeriod
        ? intl.formatMessage({
            defaultMessage: 'Reviewing...',
            description: 'type:apply',
            id: 'jLkKbI',
          })
        : intl.formatMessage({
            defaultMessage: 'Reviewing...',
            description: 'type:join',
            id: 'Pq/7m5',
          })
    } else if (isNotApplied) {
      buttonText = isInApplicationPeriod
        ? intl.formatMessage({
            defaultMessage: 'Apply',
            description: 'src/views/CampaignDetail/Apply/Button/index.tsx',
            id: 'HgY+72',
          })
        : intl.formatMessage({
            defaultMessage: 'Join',
            description: 'src/views/CampaignDetail/Apply/Button/index.tsx',
            id: 'gCafm/',
          })
    } else if (isSucceeded) {
      buttonText = isAppliedDuringPeriod
        ? intl.formatMessage({
            defaultMessage: 'Applied successfully',
            id: '4nHH2x',
          })
        : intl.formatMessage({
            defaultMessage: 'Joined successfully',
            id: 'al5/yQ',
          })
    }

    return renderButton(buttonText)
  }

  if (isRejected) {
    return null
  }

  if (isFinishedCampaign) {
    return isSucceeded ? renderEndedButton() : null
  }

  if (!isActiveCampaign) {
    return null
  }

  if (isSucceeded && isWritingPeriodStarted && !isSelectedStage) {
    return renderDefaultSubmitButton()
  }

  const isSelectedStageToday =
    now.toDateString() === new Date(selectedStage?.period?.start).toDateString()

  if (
    isSucceeded &&
    isWritingPeriodStarted &&
    isSelectedStage &&
    isSelectedStageToday
  ) {
    return renderTodaySubmitButton()
  }

  if (
    isSucceeded &&
    isWritingPeriodStarted &&
    isSelectedStage &&
    !isSelectedStageToday
  ) {
    return renderStageSubmitButton()
  }

  return renderApplicationStateButton()
}

export default ApplyCampaignButton
