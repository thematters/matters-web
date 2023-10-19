import { createMedia } from '@artsy/fresnel'
import { createContext, useEffect, useState } from 'react'

import { BREAKPOINTS } from '~/common/enums'

const AppMedia = createMedia({
  breakpoints: {
    sm: 0,
    md: BREAKPOINTS.MD,
    lg: BREAKPOINTS.LG,
    xl: BREAKPOINTS.XL,
  },
})

export const mediaStyle = AppMedia.createMediaStyle()
export const { Media, MediaContextProvider } = AppMedia

export type Breakpoint = 'sm' | 'md' | 'lg' | 'xl'

export const MediaContext = createContext(
  {} as {
    currentBreakpoint: Breakpoint
  }
)

export const MediaConsumer = MediaContext.Consumer

const UpdateBreakpoint = ({
  setBreakpoint,
  breakponint,
}: {
  breakponint: Breakpoint
  setBreakpoint: any
}) => {
  useEffect(() => {
    setBreakpoint(breakponint)
  })

  return null
}

export const MediaProvider = ({ children }: { children: React.ReactNode }) => {
  const [breakpoint, setBreakpoint] = useState<Breakpoint>('sm')

  return (
    <MediaContext.Provider
      value={{
        currentBreakpoint: breakpoint,
      }}
    >
      <Media at="sm">
        <UpdateBreakpoint breakponint="sm" setBreakpoint={setBreakpoint} />
      </Media>
      <Media at="md">
        <UpdateBreakpoint breakponint="md" setBreakpoint={setBreakpoint} />
      </Media>
      <Media at="lg">
        <UpdateBreakpoint breakponint="lg" setBreakpoint={setBreakpoint} />
      </Media>
      <Media greaterThanOrEqual="xl">
        <UpdateBreakpoint breakponint="xl" setBreakpoint={setBreakpoint} />
      </Media>
      {children}
    </MediaContext.Provider>
  )
}
