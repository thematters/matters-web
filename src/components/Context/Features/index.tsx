import { gql } from '@apollo/client'
import React from 'react'

import { FeatureOfficial } from './__generated__/FeatureOfficial'

type FeatureName = 'payment' | 'add_credit' | 'payout'

export const FeaturesContext = React.createContext({
  payment: false,
  add_credit: false,
  payout: false,
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
