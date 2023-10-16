import { render } from '@testing-library/react'
import { describe, expect, it } from 'vitest'

import { ReactComponent as IconX } from '@/public/static/icons/22px/x.svg'
import { IconX22, withIcon } from '~/components'

describe('<Icon>', () => {
  it('should allow to render', async () => {
    const { container } = render(<IconX22 />)
    /* eslint-disable */
    const $icon = container.querySelector('svg')
    expect($icon).toBeDefined()
    expect($icon).toHaveAttribute('aria-hidden', 'true')
  })

  it('should allow to render with custom attribute', async () => {
    const className = '__className'
    const style = { width: '10px', height: '10px' }

    const { container } = render(
      <>{withIcon(IconX)({ size: 'md', className, style })}</>
    )

    /* eslint-disable */
    const $icon = container.querySelector('svg')

    expect($icon).toHaveAttribute(
      'class',
      expect.stringMatching(new RegExp(className))
    )
    expect($icon).toHaveAttribute(
      'style',
      expect.stringMatching(new RegExp(style.width))
    )
  })
})
