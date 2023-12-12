import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'

import { INPUT_DEBOUNCE } from '~/common/enums'
import { act, fireEvent, render, screen } from '~/common/utils/test'
import { SearchBar } from '~/components'

beforeEach(() => {
  // Tests should run in serial for improved isolation
  // To prevent collision with global state, reset all toasts for each test
  vi.useFakeTimers()
})

afterEach(() => {
  act(() => {
    vi.runAllTimers()
    vi.useRealTimers()
  })
})

const waitTime = (time: number) => {
  act(() => {
    vi.advanceTimersByTime(time)
  })
}

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

  it('should update search bar value when typing', async () => {
    const handleOnChange = vi.fn()

    render(<SearchBar onChange={handleOnChange} />)

    const $searchInput = screen.getByPlaceholderText('Search')
    expect($searchInput).toBeInTheDocument()

    const searchValue = 'test'
    fireEvent.change($searchInput, { target: { value: searchValue } })
    expect($searchInput).toHaveValue(searchValue)

    waitTime(INPUT_DEBOUNCE)
    expect(handleOnChange).toBeCalledWith(searchValue)

    // dropdown
    const $dropdown = screen.getByText(/Loading/i)
    expect($dropdown).toBeInTheDocument()
  })
})
