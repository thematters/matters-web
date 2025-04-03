import gql from 'graphql-tag'
import { useRouter } from 'next/router'
import { useContext } from 'react'
import { FormattedMessage } from 'react-intl'

import { ReactComponent as IconCheck } from '@/public/static/icons/24px/check.svg'
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
      slug
    }
  }
`

const ApplyCampaignButton = ({
  campaign,
  size,
  onClick,
}: ApplyCampaignButtonProps) => {
  const viewer = useContext(ViewerContext)
  const { lang } = useContext(LanguageContext)
  const { getQuery } = useRoute()
  const qsType = getQuery('type') as CampaignFeedType
  const now = new Date()
  const { start: appStart, end: appEnd } = campaign.applicationPeriod || {}
  const isInApplicationPeriod = !appEnd || now < new Date(appEnd)
  const applicationState = campaign.application?.state
  const appliedAt = campaign.application?.createdAt
  const isSucceeded = applicationState === 'succeeded'
  const isPending = applicationState === 'pending'
  const isRejected = applicationState === 'rejected'
  const isNotApplied = !applicationState
  const isAppliedDuringPeriod =
    (appliedAt && appEnd && new Date(appliedAt) <= new Date(appEnd)) ||
    (appliedAt && !appEnd)
  const isApplicationStarted = now >= new Date(appStart)
  const isActiveCampaign = campaign.state === 'active'
  const isFinishedCampaign = campaign.state === 'finished'
  const isWritingPeriodStarted =
    campaign.writingPeriod && now >= new Date(campaign.writingPeriod.start)
  const selectedStage = campaign.stages.find((stage) => stage.id === qsType)
  const isSelectedStage = campaign.stages.some((stage) => stage.id === qsType)
  // 今天是活動的第幾天
  const todayStage = campaign.stages.find(
    (stage) =>
      now.toDateString() === new Date(stage.period?.start).toDateString()
  )

  const [submitCampaignArticle] = useMutation<SubmitCampaignArticleMutation>(
    SUBMIT_CAMPAIGN_ARTICLE
  )
  const router = useRouter()

  const submit = async (campaignId: string, stageId: string) => {
    if (!viewer.isAuthed) {
      window.dispatchEvent(
        new CustomEvent(OPEN_UNIVERSAL_AUTH_DIALOG, {
          detail: { trigger: UNIVERSAL_AUTH_TRIGGER.collectArticle },
        })
      )

      return
    }

    if (viewer.isInactive) {
      toast.error({
        message: (
          <FormattedMessage {...ERROR_MESSAGES[ERROR_CODES.FORBIDDEN]} />
        ),
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

  /**
   * Rejected or inactive
   */
  if (isRejected) {
    return null
  }

  // 活動已結束
  if (isFinishedCampaign) {
    // 已報名者顯示「已結束」按鈕
    if (isSucceeded) {
      return (
        <Button
          size={size === 'lg' ? ['100%', '3rem'] : [null, '1.875rem']}
          spacing={size === 'lg' ? undefined : [0, 20]}
          disabled={true}
          borderWidth="sm"
          borderColor="green"
          bgColor="green"
        >
          <TextIcon
            icon={<Icon icon={IconCheck} size={size === 'lg' ? 20 : 16} />}
            size={size === 'lg' ? 16 : 14}
            spacing={size === 'lg' ? undefined : 4}
            color="white"
            weight="normal"
            placement="right"
          >
            <FormattedMessage
              defaultMessage="Ended"
              id="mbHf/6"
              description="src/views/CampaignDetail/Apply/Button/index.tsx"
            />
          </TextIcon>
        </Button>
      )
    }

    // 未報名者不顯示任何按鈕
    return null
  }

  // 報名成功 活動進行中
  if (isSucceeded && isActiveCampaign && isWritingPeriodStarted) {
    if (!isSelectedStage) {
      return (
        <Button
          size={size === 'lg' ? ['100%', '3rem'] : [null, '1.875rem']}
          spacing={size === 'lg' ? undefined : [0, 20]}
          borderWidth="sm"
          borderColor="green"
          bgColor="green"
          onClick={() => {
            submit(campaign.id, todayStage?.id || '')
          }}
        >
          <TextIcon
            size={size === 'lg' ? 16 : 14}
            spacing={size === 'lg' ? undefined : 4}
            color="white"
            weight="normal"
          >
            <FormattedMessage
              defaultMessage="Submit"
              description="src/views/CampaignDetail/Apply/Button/index.tsx"
              id="dE4mlL"
            />
          </TextIcon>
        </Button>
      )
    }

    // 檢測是否在當天內
    const isInCurrentDay =
      now.toDateString() ===
      new Date(selectedStage?.period?.start).toDateString()
    if (isInCurrentDay) {
      return (
        <Button
          size={size === 'lg' ? ['100%', '3rem'] : [null, '1.875rem']}
          spacing={size === 'lg' ? undefined : [0, 20]}
          borderWidth="sm"
          borderColor="green"
          bgColor="green"
          onClick={() => {
            console.log('submit', '跳轉編輯器選中「當前」天 / 寫後感')
            submit(campaign.id, selectedStage?.id || '')
          }}
        >
          <TextIcon
            size={size === 'lg' ? 16 : 14}
            spacing={size === 'lg' ? undefined : 4}
            color="white"
            weight="normal"
          >
            <FormattedMessage
              defaultMessage="Submit"
              description="src/views/CampaignDetail/Apply/Button/index.tsx"
              id="dE4mlL"
            />
          </TextIcon>
        </Button>
      )
    } else {
      return (
        <Button
          size={size === 'lg' ? ['100%', '3rem'] : [null, '1.875rem']}
          spacing={size === 'lg' ? undefined : [0, 20]}
          borderWidth="sm"
          borderColor="green"
          bgColor="green"
          onClick={() => {
            console.log(
              'submit',
              `跳轉編輯器投稿至 ${
                selectedStage?.[
                  lang === 'zh_hans'
                    ? 'nameZhHans'
                    : lang === 'zh_hant'
                      ? 'nameZhHant'
                      : 'nameEn'
                ]
              }`
            )
            submit(campaign.id, selectedStage?.id || '')
          }}
        >
          <TextIcon
            size={size === 'lg' ? 16 : 14}
            spacing={size === 'lg' ? undefined : 4}
            color="white"
            weight="normal"
          >
            <FormattedMessage
              defaultMessage="Submit to {dayName}"
              description="src/views/CampaignDetail/Apply/Button/index.tsx"
              id="UfvCjD"
              values={{
                dayName:
                  selectedStage?.[
                    lang === 'zh_hans'
                      ? 'nameZhHans'
                      : lang === 'zh_hant'
                        ? 'nameZhHant'
                        : 'nameEn'
                  ],
              }}
            />
          </TextIcon>
        </Button>
      )
    }
  }

  if (!isActiveCampaign) {
    return null
  }

  /**
   * Pending, not applied or succeeded
   */
  let text: React.ReactNode = ''
  if (isPending) {
    text = isInApplicationPeriod ? (
      <FormattedMessage
        defaultMessage="Reviewing..."
        description="type:apply"
        id="jLkKbI"
      />
    ) : (
      <FormattedMessage
        defaultMessage="Reviewing..."
        description="type:join"
        id="Pq/7m5"
      />
    )
  } else if (isNotApplied) {
    text = isInApplicationPeriod ? (
      <FormattedMessage
        defaultMessage="Apply"
        description="src/views/CampaignDetail/Apply/Button/index.tsx"
        id="HgY+72"
      />
    ) : (
      <FormattedMessage
        defaultMessage="Join"
        description="src/views/CampaignDetail/Apply/Button/index.tsx"
        id="gCafm/"
      />
    )
  } else if (isSucceeded) {
    text = isAppliedDuringPeriod ? (
      <FormattedMessage defaultMessage="Applied successfully" id="4nHH2x" />
    ) : (
      <FormattedMessage defaultMessage="Joined successfully" id="al5/yQ" />
    )
  }

  if (!viewer.isAuthed) {
    onClick = () => {
      window.dispatchEvent(
        new CustomEvent(OPEN_UNIVERSAL_AUTH_DIALOG, {
          detail: { trigger: UNIVERSAL_AUTH_TRIGGER.applyCampaign },
        })
      )
    }
  }

  const primary =
    isInApplicationPeriod || (isSucceeded && isAppliedDuringPeriod)
  const isLateSucceeded = !isAppliedDuringPeriod && isSucceeded
  const bgColor = primary ? 'green' : undefined
  const borderColor = primary ? 'green' : isLateSucceeded ? 'grey' : 'green'
  const textColor = primary ? 'white' : isLateSucceeded ? 'grey' : 'green'

  if (size === 'lg') {
    return (
      <Button
        onClick={onClick}
        size={['100%', '3rem']}
        disabled={isPending || !isApplicationStarted || isSucceeded}
        borderWidth="sm"
        borderColor={borderColor}
        bgColor={bgColor}
      >
        <TextIcon
          icon={isSucceeded ? <Icon icon={IconCheck} size={20} /> : null}
          size={16}
          color={textColor}
          weight="normal"
          placement="right"
        >
          {text}
        </TextIcon>
      </Button>
    )
  } else {
    return (
      <Button
        onClick={onClick}
        size={[null, '1.875rem']}
        spacing={[0, 20]}
        borderWidth="sm"
        disabled={isPending || !isApplicationStarted || isSucceeded}
        bgColor={bgColor}
        borderColor={borderColor}
      >
        <TextIcon
          spacing={4}
          size={14}
          icon={isSucceeded ? <Icon icon={IconCheck} size={16} /> : null}
          color={textColor}
        >
          {text}
        </TextIcon>
      </Button>
    )
  }
}

export default ApplyCampaignButton
