import mockRouter from 'next-router-mock'
import React from 'react'
import { describe, expect, it, vi } from 'vitest'

import { fireEvent, render, screen } from '~/common/utils/test'
import { LinkWrapper } from '~/components'

describe('<LinkWrapper>', () => {
  it('should render a link', () => {
    const link = '/test-link'
    const handleClick = vi.fn()

    render(
      <LinkWrapper href={link} onClick={handleClick}>
        Click me
      </LinkWrapper>
    )

    const $link = screen.getByRole('link')
    expect($link).toBeInTheDocument()
    expect($link).toHaveAttribute('href', link)
    expect($link.tagName).toBe('A')
    expect(screen.getByText('Click me')).toBeInTheDocument()

    fireEvent.click($link)
    expect(mockRouter.asPath).toContain(link)
    expect(handleClick).toHaveBeenCalled()
  })

  it('should render a disabled link', () => {
    const link = '/test-link'
    const handleClick = vi.fn()

    render(
      <LinkWrapper href={link} onClick={handleClick} disabled>
        Click me
      </LinkWrapper>
    )

    expect(screen.queryByRole('link')).not.toBeInTheDocument()

    const $content = screen.getByText('Click me')
    expect($content).toBeInTheDocument()
    fireEvent.click($content)
    expect(mockRouter.asPath).not.toContain(link)
    expect(handleClick).not.toHaveBeenCalled()
  })

  it('should apply textActiveColor class', () => {
    render(
      <LinkWrapper href="/test" textActiveColor="green">
        Green hover
      </LinkWrapper>
    )

    const $link = screen.getByRole('link')
    expect($link.className).toContain('textActiveGreen')
  })

  it('should pass through additional props', () => {
    render(
      <LinkWrapper
        href="/test"
        className="custom-class"
        title="Test Title"
        aria-label="Test Link"
        data-custom="custom-data"
      >
        With extra props
      </LinkWrapper>
    )

    const $link = screen.getByRole('link')
    expect($link.className).toContain('custom-class')
    expect($link).toHaveAttribute('title', 'Test Title')
    expect($link).toHaveAttribute('aria-label', 'Test Link')
    expect($link).toHaveAttribute('data-custom', 'custom-data')
  })

  it('should stop event propagation when onClick is called', () => {
    const handleClick = vi.fn()
    const handleParentClick = vi.fn()

    render(
      <div onClick={handleParentClick}>
        <LinkWrapper href="/test" onClick={handleClick}>
          Click with propagation stop
        </LinkWrapper>
      </div>
    )

    screen.getByRole('link').click()
    expect(handleClick).toHaveBeenCalled()
    expect(handleParentClick).not.toHaveBeenCalled()
  })
})
