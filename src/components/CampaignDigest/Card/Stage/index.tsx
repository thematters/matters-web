import { useContext } from 'react'

import { LanguageContext } from '~/components'
import { CampaignDigestCardCampaignFragment, UserLanguage } from '~/gql/graphql'

import styles from './styles.module.css'

type StageProps = {
  campaign: CampaignDigestCardCampaignFragment
}

const Stage = ({ campaign }: StageProps) => {
  const { lang } = useContext(LanguageContext)
  const stages = campaign?.stages

  if (!stages || stages.length === 0) {
    return null
  }

  const now = new Date().getTime()
  const { index } = stages.reduce(
    (r, d, i) => {
      const start = d?.period?.start
      if (!start) {
        return r
      }
      const curr = new Date(start).getTime()
      const diff = Math.abs(curr - now)

      if (diff < r.minDiff) {
        return { minDiff: diff, index: i }
      } else {
        return r
      }
    },
    { minDiff: Infinity, index: -1 }
  )

  if (index === -1) {
    return null
  }

  const stage = stages[index]
  const stageName =
    lang === UserLanguage.En
      ? stage.nameEn
      : lang === UserLanguage.ZhHans
        ? stage.nameZhHans
        : stage.nameZhHant

  return <span className={styles.stage}>{stageName}</span>
}

export default Stage
