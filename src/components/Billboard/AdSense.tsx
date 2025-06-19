import { useEffect } from 'react'

import { Media } from '~/components'

interface AdSenseProps {
  adSlot?: string
  adClient?: string
  style?: React.CSSProperties
  adFormat?: string
  isResponsive?: boolean
}

// Extend Window interface to include adsbygoogle
declare global {
  interface Window {
    adsbygoogle: Record<string, unknown>[]
  }
}

export const AdSenseUnit = ({
  adClient = 'ca-pub-4792129775270382',
  style = { display: 'block' },
  adFormat = 'rectangle',
  isResponsive = false,
}: AdSenseProps) => {
  useEffect(() => {
    try {
      // Initialize adsbygoogle array if it doesn't exist
      window.adsbygoogle = window.adsbygoogle || []
      // Push the ad unit to be rendered
      window.adsbygoogle.push({})
    } catch (error) {
      console.error('Error loading AdSense:', error)
    }
  }, [])

  return (
    <>
      <Media lessThan="md">
        <ins
          className="adsbygoogle"
          style={{ display: 'block' }}
          data-ad-format="fluid"
          data-ad-layout-key="-eo-12+91+49-159"
          data-ad-client={adClient}
          data-ad-slot="6282066188"
        ></ins>
      </Media>
      <Media greaterThanOrEqual="md">
        <ins
          className="adsbygoogle"
          style={style}
          data-ad-client={adClient}
          data-ad-slot="5156934195"
          data-ad-format={adFormat}
          {...(isResponsive && { 'data-full-width-responsive': 'true' })}
        />
      </Media>
    </>
  )
}
