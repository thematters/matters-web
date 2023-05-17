import { useEffect } from 'react'

import defaultsStyles from '~/common/styles/bases/defaults.css'
import resetStyles from '~/common/styles/bases/reset.css'
import layoutStyles from '~/common/styles/layouts.css'
import interactionStyles from '~/common/styles/utils/interaction.css'
import linkStyles from '~/common/styles/utils/link.css'
import motionStyles from '~/common/styles/utils/motion.css'
// import breakpointsStyles from '~/common/styles/variables/breakpoints.css'
import colorsStyles from '~/common/styles/variables/colors.css'
// import layoutsStyles from '~/common/styles/variables/layouts.css'
import shadowsStyles from '~/common/styles/variables/shadows.css'
import sizingStyles from '~/common/styles/variables/sizing.css'
import spacingStyles from '~/common/styles/variables/spacing.css'
import typographyStyles from '~/common/styles/variables/typography.css'
import zIndexStyles from '~/common/styles/variables/z-index.css'
import fresnelStyles from '~/common/styles/vendors/fresnel.css'
import ptrStyles from '~/common/styles/vendors/ptr.css'
import tippyStyles from '~/common/styles/vendors/tippy.css'
import { useWindowResize } from '~/components'

export const GlobalStyles = () => {
  const size = useWindowResize()
  const height = size[1]

  useEffect(() => {
    if (height) {
      // First we get the viewport height and we multiple it by 1% to get a value for a vh unit
      const vh = height * 0.01
      // Then we set the value in the --vh custom property to the root of the document
      document.documentElement.style.setProperty('--vh', `${vh}px`)
    }
  })

  useEffect(() => {
    document.documentElement.style.setProperty('--reach-dialog', '1')
  }, [])

  return (
    <>
      <style jsx global>
        {colorsStyles}
      </style>
      <style jsx global>
        {sizingStyles}
      </style>
      <style jsx global>
        {zIndexStyles}
      </style>
      <style jsx global>
        {spacingStyles}
      </style>
      <style jsx global>
        {typographyStyles}
      </style>
      <style jsx global>
        {shadowsStyles}
      </style>

      <style jsx global>
        {resetStyles}
      </style>
      <style jsx global>
        {defaultsStyles}
      </style>

      {/* layout */}
      <style jsx global>
        {layoutStyles}
      </style>

      {/* utils */}
      <style jsx global>
        {linkStyles}
      </style>
      <style jsx global>
        {motionStyles}
      </style>
      <style jsx global>
        {interactionStyles}
      </style>

      {/* vendors */}
      <style jsx global>
        {tippyStyles}
      </style>
      <style jsx global>
        {ptrStyles}
      </style>
      <style jsx global>
        {fresnelStyles}
      </style>
    </>
  )
}
