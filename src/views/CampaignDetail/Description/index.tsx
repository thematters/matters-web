import gql from 'graphql-tag'
import { useContext } from 'react'

import { LanguageContext, Layout, Spacer } from '~/components'
import { DescriptionCampaignFragment } from '~/gql/graphql'

import styles from './styles.module.css'

const Description = ({
  campaign,
}: {
  campaign: DescriptionCampaignFragment
}) => {
  const { lang } = useContext(LanguageContext)

  return (
    <Layout.Main.Spacing hasVertical={false}>
      <section
        className={styles.description}
        dangerouslySetInnerHTML={{
          __html:
            campaign[
              lang === 'zh_hans'
                ? 'descriptionZhHans'
                : lang === 'zh_hant'
                  ? 'descriptionZhHant'
                  : 'descriptionEn'
            ],
        }}
      />

      <Spacer size="sp40" />
    </Layout.Main.Spacing>
  )
}

Description.fragments = gql`
  fragment DescriptionCampaign on WritingChallenge {
    id
    descriptionZhHant: description(input: { language: zh_hant })
    descriptionZhHans: description(input: { language: zh_hans })
    descriptionEn: description(input: { language: en })
  }
`

export default Description
