import { describe, expect, it, vi } from 'vitest'

import { PATHS } from '~/common/enums'
import { fireEvent, render, screen } from '~/common/utils/test'
import { Button } from '~/components'

describe('<Button>', () => {
  it('should allow to be clicked', async () => {
    const handleClick = vi.fn()

    // ARRANGE
    render(<Button onClick={handleClick} />)
    const $button = screen.getByRole('button')
    expect($button).toBeDefined()
    expect($button).toHaveAttribute('type', 'button')

    // ACT
    fireEvent.click($button)

    // ASSERT
    expect(handleClick).toHaveBeenCalled()
    expect($button).not.toHaveFocus() // blur after clicking
  })

  it('should allow to be a form submit button', async () => {
    const handleClick = vi.fn()
    const formId = '__form_id'

    // ARRANGE
    render(<Button onClick={handleClick} type="submit" form={formId} />)
    const $button = screen.getByRole('button')
    expect($button).toHaveAttribute('type', 'submit')
    expect($button).toHaveAttribute('form', formId)

    // ACT
    fireEvent.click($button)

    // ASSERT
    expect(handleClick).toHaveBeenCalled()
  })

  it('should allow to be disabled', async () => {
    const handleClick = vi.fn()

    // ARRANGE
    render(<Button onClick={handleClick} disabled />)
    const $button = screen.getByRole('button')
    expect($button).toHaveAttribute('disabled')

    // ACT
    fireEvent.click($button)

    // ASSERT
    expect(handleClick).not.toHaveBeenCalled()
  })

  it('should allow to be a link', async () => {
    // internal link
    const { unmount } = render(<Button href={PATHS.ABOUT} />)
    let $link = screen.getByRole('link')
    expect($link).toHaveAttribute('href', PATHS.ABOUT)
    unmount()

    // external link
    const externalLink = 'https://example.com'
    const { unmount: unmount2 } = render(
      <Button htmlHref={externalLink} htmlTarget="_blank" />
    )
    $link = screen.getByRole('link')
    expect($link).toHaveAttribute('href', externalLink)
    expect($link).toHaveAttribute('target', '_blank')
    unmount2()

    // external link: provide both `href` and `htmlHref`
    render(<Button href={PATHS.ABOUT} htmlHref={externalLink} />)
    $link = screen.getByRole('link')
    expect($link).toHaveAttribute('href', externalLink)
  })

  it('should allow to be a <span>', async () => {
    render(<Button href={PATHS.ABOUT} aria-label="span" is="span" />)
    const $span = screen.getByLabelText('span')
    expect($span.tagName.toLowerCase()).toBe('span')
  })

  it('should allow to have custom attributes', async () => {
    const props = {
      ariaLabel: '__label',
      ariaHasPopup: 'listbox',
      testId: '__test_id',
    }
    render(
      <Button
        aria-label={props.ariaLabel}
        aria-haspopup={props.ariaHasPopup}
        testId={props.testId}
      />
    )
    const $button = screen.getByRole('button')
    expect($button).toHaveAttribute('aria-label', props.ariaLabel)
    expect($button).toHaveAttribute('aria-haspopup', props.ariaHasPopup)
    expect($button).toHaveAttribute('data-test-id', props.testId)
  })
})
