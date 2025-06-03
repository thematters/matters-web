import mockRouter from 'next-router-mock'
import React from 'react'
import { describe, expect, it, vi } from 'vitest'

import { fireEvent, render, screen } from '~/common/utils/test'
import { Card } from '~/components'

describe('<Card>', () => {
  it('should render Card as a button', () => {
    const handleClick = vi.fn()

    render(<Card onClick={handleClick}>Click me</Card>)

    const $button = screen.getByRole('button', { name: 'Click me' })
    expect($button).toBeInTheDocument()

    fireEvent.click($button)
    expect(handleClick).toHaveBeenCalled()
  })

  it('should render Card as a button with redirection', () => {
    const link = '/about'
    const handleClick = vi.fn()

    render(
      <Card href={link} onClick={handleClick}>
        About
      </Card>
    )

    const $button = screen.getByRole('button', { name: 'About' })
    expect($button).toBeInTheDocument()
    expect($button).not.toHaveAttribute('href', '/about')

    fireEvent.click($button)
    expect(mockRouter.asPath).toContain(link)
    expect(handleClick).toHaveBeenCalled()
  })

  it('should render Card as a link', () => {
    const link = '/about'
    const handleClick = vi.fn()

    render(
      <Card is="link" href={link} onClick={handleClick}>
        About
      </Card>
    )

    const $link = screen.getByRole('link', { name: 'About' })
    expect($link).toBeInTheDocument()
    expect($link).toHaveAttribute('href', '/about')

    fireEvent.click($link)
    expect(handleClick).toHaveBeenCalled()
    expect(mockRouter.asPath).toContain(link)
  })

  it('should render Card as a external link', () => {
    const link = 'https://www.google.com'
    const handleClick = vi.fn()

    render(
      <Card
        is="anchor"
        htmlHref={link}
        htmlTarget="_blank"
        onClick={handleClick}
      >
        Google
      </Card>
    )

    const $link = screen.getByRole('link', { name: 'Google' })
    expect($link).toBeInTheDocument()
    expect($link).toHaveAttribute('href', link)
    expect($link).toHaveAttribute('target', '_blank')

    fireEvent.click($link)
    expect(mockRouter.asPath).not.toContain(link)
    expect(handleClick).toHaveBeenCalled()
  })

  it('should render Card as a disabled button', () => {
    render(<Card>Disabled</Card>)

    expect(screen.queryByRole('button')).not.toBeInTheDocument()
    expect(screen.queryByRole('link')).not.toBeInTheDocument()
    expect(screen.getByText('Disabled')).toBeInTheDocument()
  })

  it('should render nested Cards', () => {
    const link1 = '/about'
    const link2 = '/contact'
    render(
      <Card href={link1}>
        About
        <Card href={link2}>Contact</Card>
      </Card>
    )

    const $link1 = screen.getByRole('button', { name: /^About/ })
    expect($link1).toBeInTheDocument()

    const $link2 = screen.getByRole('button', { name: 'Contact' })
    expect($link2).toBeInTheDocument()

    fireEvent.click($link2)
    expect(mockRouter.asPath).toContain(link2)
  })
})
