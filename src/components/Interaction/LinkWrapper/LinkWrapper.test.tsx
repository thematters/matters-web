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
})
