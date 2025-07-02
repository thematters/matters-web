import { useEffect, useRef } from 'react'

import { BREAKPOINTS } from '~/common/enums'
import { useMediaQuery } from '~/components'

interface AdSenseProps {
  adSlot?: string
  adClient?: string
  style?: React.CSSProperties
  adFormat?: string
  isResponsive?: boolean
  onAdFilled?: () => void
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
  onAdFilled,
}: AdSenseProps) => {
  const mobileRef = useRef<HTMLModElement>(null)
  const desktopRef = useRef<HTMLModElement>(null)
  const isMdUp = useMediaQuery(`(min-width: ${BREAKPOINTS.LG}px)`)

  useEffect(() => {
    // Helper to observe a given ins element
    const observeAdStatus = (ins: HTMLElement | null) => {
      if (!ins) return undefined
      const observer = new MutationObserver((mutations) => {
        mutations.forEach((mutation) => {
          if (
            mutation.type === 'attributes' &&
            mutation.attributeName === 'data-ad-status' &&
            (mutation.target as Element).getAttribute('data-ad-status') ===
              'filled'
          ) {
            onAdFilled?.()
          }
        })
      })
      observer.observe(ins, { attributes: true })
      return observer
    }

    // Wait for ins elements to be rendered
    const mobileIns = mobileRef.current as HTMLElement | null
    const desktopIns = desktopRef.current as HTMLElement | null
    const observers: MutationObserver[] = []
    if (mobileIns) {
      observers.push(observeAdStatus(mobileIns)!)
    }
    if (desktopIns) {
      observers.push(observeAdStatus(desktopIns)!)
    }

    return () => {
      observers.forEach((observer) => observer && observer.disconnect())
    }
  }, [mobileRef.current, desktopRef.current])

  useEffect(() => {
    // Initialize adsbygoogle
    try {
      window.adsbygoogle = window.adsbygoogle || []
      window.adsbygoogle.push({})
    } catch (error) {
      console.error('Error loading AdSense:', error)
    }
  }, [])

  return (
    <>
      {isMdUp ? (
        <ins
          className="adsbygoogle"
          style={style}
          data-ad-client={adClient}
          data-ad-slot="5156934195"
          data-ad-format={adFormat}
          {...(isResponsive && { 'data-full-width-responsive': 'true' })}
          ref={desktopRef}
        />
      ) : (
        <ins
          className="adsbygoogle"
          style={{ display: 'block' }}
          data-ad-format="fluid"
          data-ad-layout-key="-h9"
          data-ad-client={adClient}
          data-ad-slot="6282066188"
          ref={mobileRef}
        />
      )}
    </>
  )
}
