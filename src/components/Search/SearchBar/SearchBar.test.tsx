import { describe, expect, it } from 'vitest'

import { fireEvent, render, screen } from '~/common/utils/test'
import { SearchBar } from '~/components'

describe('<SearchBar>', () => {
  it('should render a SeachBar', () => {
    render(<SearchBar />)

    // search button
    const $searchButton = screen.getByRole('button', { name: 'Search' })
    expect($searchButton).toBeInTheDocument()

    // search input
    const $searchInput = screen.getByPlaceholderText('Search')
    expect($searchInput).toBeInTheDocument()
    expect($searchInput).toHaveAttribute('type', 'search')
    expect($searchInput).toHaveAttribute('aria-label', 'Search')
    expect($searchInput).toHaveAttribute('name', 'q')
    expect($searchInput).toHaveAttribute('value', '')
  })

  it('should update search bar value when typing', () => {
    render(<SearchBar />)

    const $searchInput = screen.getByPlaceholderText('Search')
    expect($searchInput).toBeInTheDocument()

    const searchValue = 'test'
    fireEvent.change($searchInput, { target: { value: searchValue } })
    expect($searchInput).toHaveValue(searchValue)
  })
})
