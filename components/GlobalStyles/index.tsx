import defaultsStyles from '~/common/styles/bases/defaults.css'
import resetStyles from '~/common/styles/bases/reset.css'
import gridsStyles from '~/common/styles/layouts/grids.css'

export const GlobalStyles = () => (
  <>
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
