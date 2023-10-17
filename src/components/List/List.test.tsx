import React from 'react'
import { describe, expect, it } from 'vitest'

import { render, screen } from '~/common/utils/test'
import { List } from '~/components'

describe('<List>', () => {
  it('should render list with items', () => {
    render(
      <List>
        <List.Item>Item 1</List.Item>
        <List.Item>Item 2</List.Item>
      </List>
    )

    expect(screen.getByRole('list')).toBeInTheDocument()
    expect(screen.getAllByRole('listitem')).toHaveLength(2)
  })
})
