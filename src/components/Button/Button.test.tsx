import { render, screen } from '@testing-library/react'
import { describe, expect, it, vitest } from 'vitest'

import { PATHS } from '~/common/enums'

import { Button } from './'

describe('Button', () => {
  it('should allow to be clicked', async () => {
    const handleClick = vitest.fn()

    // ARRANGE
    render(<Button onClick={handleClick} />)
    const $button = screen.getByRole('button')
    expect($button).toBeDefined()
    expect($button).toHaveAttribute('type', 'button')

    // ACT
    $button.click()

    // ASSERT
    expect(handleClick).toHaveBeenCalled()
    expect($button).not.toHaveFocus() // blur after clicking
  })

  it('should allow to be a form submit button', async () => {
    const handleClick = vitest.fn()
    const formId = '__form_id'

    // ARRANGE
    render(<Button onClick={handleClick} type="submit" form={formId} />)
    const $button = screen.getByRole('button')
    expect($button).toHaveAttribute('type', 'submit')
    expect($button).toHaveAttribute('form', formId)

    // ACT
    $button.click()

    // ASSERT
    expect(handleClick).toHaveBeenCalled()
  })

  it('should allow to be disabled', async () => {
    const handleClick = vitest.fn()

    // ARRANGE
    render(<Button onClick={handleClick} disabled />)
    const $button = screen.getByRole('button')
    expect($button).toHaveAttribute('disabled')

    // ACT
    $button.click()

    // ASSERT
    expect(handleClick).not.toHaveBeenCalled()
  })

  it('should allow to be a link', async () => {
    // internal link
    render(<Button href={PATHS.ABOUT} />)
    let $links = screen.getAllByRole('link')
    expect($links[0]).toHaveAttribute('href', PATHS.ABOUT)

    // external link
    const externalLink = 'https://example.com'
    render(<Button htmlHref={externalLink} htmlTarget="_blank" />)
    $links = screen.getAllByRole('link')
    expect($links[1]).toHaveAttribute('href', externalLink)
    expect($links[1]).toHaveAttribute('target', '_blank')

    // external link: provide both `href` and `htmlHref`
    render(<Button href={PATHS.ABOUT} htmlHref={externalLink} />)
    $links = screen.getAllByRole('link')
    expect($links[2]).toHaveAttribute('href', externalLink)
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
