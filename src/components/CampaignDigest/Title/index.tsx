import classNames from 'classnames'
import Link from 'next/link'
import { useContext } from 'react'

import { capitalizeFirstLetter, toPath } from '~/common/utils'
import { LanguageContext } from '~/components'
import { CampaignDigestTitleCampaignFragment } from '~/gql/graphql'

import { fragments } from './gql'
import styles from './styles.module.css'

export type CampaignDigestTitleTextSize = 16
export type CampaignDigestTitleTextWeight = 'normal' | 'medium'
export type CampaignDigestTitleIs = 'h2' | 'span'

type CampaignDigestTitleProps = {
  campaign: CampaignDigestTitleCampaignFragment
  textSize?: CampaignDigestTitleTextSize
  textWeight?: CampaignDigestTitleTextWeight
  lineClamp?: boolean | 1 | 2 | 3
  is?: CampaignDigestTitleIs
  className?: string
}

const getTitleName = (
  campaign: CampaignDigestTitleCampaignFragment,
  lang: string
) => {
  if (!campaign) return ''

  switch (lang) {
    case 'zh_hans':
      return campaign.nameZhHans
    case 'zh_hant':
      return campaign.nameZhHant
    default:
      return campaign.nameEn
  }
}

const CampaignDigestTitle = ({
  campaign,
  textSize = 16,
  textWeight = 'medium',
  lineClamp = true,
  is = 'h2',
  className,
}: CampaignDigestTitleProps) => {
  const { lang } = useContext(LanguageContext)

  const path = toPath({ page: 'campaignDetail', campaign })
  const title = getTitleName(campaign, lang)

  const titleClasses = classNames({
    [styles.title]: true,
    [styles[`text${textSize}`]]: !!textSize,
    [styles[`font${capitalizeFirstLetter(textWeight)}`]]: !!textWeight,
    [styles.lineClamp]: !!lineClamp,
    [styles[`lineClampLine${lineClamp}`]]: lineClamp === 1 || lineClamp === 3,
    [`${className}`]: true,
  })

  const titleElement = (
    <>
      {is === 'h2' ? (
        <h2 className={titleClasses} title={title}>
          {title}
        </h2>
      ) : (
        <span className={titleClasses} title={title}>
          {title}
        </span>
      )}
    </>
  )

  return (
    <Link {...path} className="u-link-active-green">
      {titleElement}
    </Link>
  )
}

CampaignDigestTitle.fragments = fragments

export default CampaignDigestTitle
