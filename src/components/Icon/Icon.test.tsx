import { describe, expect, it } from 'vitest'

import IconDot from '@/public/static/icons/dot.svg'
import { render } from '~/common/utils/test'
import { Icon, withIcon } from '~/components'

describe('<Icon>', () => {
  it('should allow to render', async () => {
    const { container } = render(<Icon icon={IconDot} />)
    /* eslint-disable */
    const $icon = container.querySelector('svg')
    expect($icon).toBeDefined()
    expect($icon).toHaveAttribute('aria-hidden', 'true')
  })

  it('should allow to render with custom attribute', async () => {
    const className = '__className'
    const style = { width: '10px', height: '10px' }

    const { container } = render(
      <>{withIcon(IconDot)({ size: 24, className, style })}</>
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
