import gql from 'graphql-tag'
import React from 'react'

import { FeatureOfficialFragment } from '~/gql/graphql'

type FeatureName =
  | 'payment'
  | 'add_credit'
  | 'payout'
  | 'NOTICE_TAG_ADOPTION'
  | 'circle_management'
  | 'circle_interact'

export const FeaturesContext = React.createContext({
  payment: false,
  add_credit: false,
  payout: false,
  NOTICE_TAG_ADOPTION: false,
  circle_management: false,
  circle_interact: false,
})

export const FeaturesConsumer = FeaturesContext.Consumer

export const FeaturesProvider = ({
  children,
  official,
}: {
  children: React.ReactNode
  official: FeatureOfficialFragment | undefined
}) => {
  const featuresList = official?.features || []
  const featureObject = featuresList.reduce(
    (
      accu: { [key: string]: boolean },
      curr: { name: string; enabled: boolean }
    ) => ({ [curr.name]: curr.enabled, ...accu }),
    {}
  ) as { [key in FeatureName]: boolean }

  return (
    <FeaturesContext.Provider value={featureObject}>
      {children}
    </FeaturesContext.Provider>
  )
}

FeaturesProvider.fragments = {
  official: gql`
    fragment FeatureOfficial on Official {
      features {
        name
        enabled
      }
    }
  `,
}
