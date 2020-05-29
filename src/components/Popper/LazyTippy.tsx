import Tippy, { TippyProps } from '@tippy.js/react'
import React from 'react'

/**
 * Lazy mounting `content`
 *
 * @see {@url https://gist.github.com/atomiks/520f4b0c7b537202a23a3059d4eec908}
 */
const LazyTippy = (props: TippyProps) => {
  const [mounted, setMounted] = React.useState(false)

  const lazyPlugin = {
    fn: () => ({
      onShow: () => setMounted(true),
      onHidden: () => setMounted(false),
    }),
  }

  const computedProps = { ...props }

  computedProps.plugins = [lazyPlugin, ...(props.plugins || [])]
  computedProps.content = mounted ? props.content : ''

  return <Tippy {...computedProps} />
}

export default LazyTippy
