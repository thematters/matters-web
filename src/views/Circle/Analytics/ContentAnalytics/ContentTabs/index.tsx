import { useIntl } from 'react-intl'

import { SquareTabs } from '~/components'

export type CircleContentAnalyticsType = 'public' | 'paywall'

interface Props {
  type: CircleContentAnalyticsType
  setType: (type: CircleContentAnalyticsType) => void
}

const ContentTabs: React.FC<Props> = ({ type, setType }) => {
  const intl = useIntl()

  const isPublic = type === 'public'
  const isPaywall = type === 'paywall'

  return (
    <SquareTabs spacing="sm">
      <SquareTabs.Tab
        onClick={() => setType('paywall')}
        selected={isPaywall}
        title={intl.formatMessage({
          defaultMessage: 'Paywalled',
          id: 'LOefol',
          description:
            'src/views/Circle/Analytics/ContentAnalytics/ContentTabs/index.tsx',
        })}
      />

      <SquareTabs.Tab
        onClick={() => setType('public')}
        selected={isPublic}
        title={intl.formatMessage({
          defaultMessage: 'Public',
          id: '/podGX',
          description:
            'src/views/Circle/Analytics/ContentAnalytics/ContentTabs/index.tsx',
        })}
      />
    </SquareTabs>
  )
}

export default ContentTabs
