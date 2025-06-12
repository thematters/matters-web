import { describe, expect, it } from 'vitest'

import { render, screen } from '~/common/utils/test'
import { MOCK_COMMENT } from '~/stories/mocks'

import { CircleThreadComment } from './'

describe('<ThreadComment>', () => {
  it('should render a ThreadComment', () => {
    render(
      <CircleThreadComment
        comment={{
          ...MOCK_COMMENT,
          comments: {
            __typename: 'CommentConnection',
            edges: [
              { node: MOCK_COMMENT, cursor: 'cursor-1' },
              { node: MOCK_COMMENT, cursor: 'cursor-2' },
              { node: MOCK_COMMENT, cursor: 'cursor-3' },
            ],
          },
        }}
        type="circleBroadcast"
      />
    )

    // list
    const $list = screen.getByRole('list')
    expect($list).toBeInTheDocument()

    // list items
    const $items = screen.getAllByRole('listitem')
    expect($items.length).toBe(2)

    // expand button
    const $expandButton = screen.getByRole('button', {
      name: `Load the rest 1 replies`,
    })
    expect($expandButton).toBeInTheDocument()
  })

  it('should render a ThreadComment without expand', () => {
    render(
      <CircleThreadComment
        comment={{
          ...MOCK_COMMENT,
          comments: {
            __typename: 'CommentConnection',
            edges: [{ node: MOCK_COMMENT, cursor: 'cursor-1' }],
          },
        }}
        type="circleBroadcast"
      />
    )

    // list
    const $list = screen.getByRole('list')
    expect($list).toBeInTheDocument()

    // list items
    const $items = screen.getAllByRole('listitem')
    expect($items.length).toBe(1)

    // expand button
    const $expandButton = screen.queryByRole('button', {
      name: `Load the rest 1 replies`,
    })
    expect($expandButton).not.toBeInTheDocument()
  })
})
