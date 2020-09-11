import gql from 'graphql-tag'
import React from 'react'

import { FeatureOfficial } from './__generated__/FeatureOfficial'

type FeatureName = 'payment' | 'add_credit' | 'payout' | 'tag_adoption'

export const FeaturesContext = React.createContext({
  payment: false,
  add_credit: false,
  payout: false,
  tag_adoption: false,
})

export const FeaturesConsumer = FeaturesContext.Consumer

export const FeaturesProvider = ({
  children,
  official,
}: {
  children: React.ReactNode
  official: FeatureOfficial | undefined
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
