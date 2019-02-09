import breakpointsVars from '~/common/styles/variables/breakpoints.css'
import colorsVars from '~/common/styles/variables/colors.css'
import sizingVars from '~/common/styles/variables/sizing.css'
import spacingVars from '~/common/styles/variables/spacing.css'
import typographyVars from '~/common/styles/variables/typography.css'

import defaultsStyles from '~/common/styles/bases/defaults.css'
import resetStyles from '~/common/styles/bases/reset.css'
import gridsStyles from '~/common/styles/layouts/grids.css'

export const GlobalStyles = () => (
  <>
    {/* variables */}
    <style jsx global>
      {breakpointsVars}
    </style>
    <style jsx global>
      {colorsVars}
    </style>
    <style jsx global>
      {sizingVars}
    </style>
    <style jsx global>
      {spacingVars}
    </style>
    <style jsx global>
      {typographyVars}
    </style>

    {/* styles */}
    <style jsx global>
      {resetStyles}
    </style>
    <style jsx global>
      {defaultsStyles}
    </style>
    <style jsx global>
      {gridsStyles}
    </style>
  </>
)
