import { describe, expect, it } from 'vitest'

import { TEST_ID } from '~/common/enums'
import { cleanup, fireEvent, render, screen } from '~/common/utils/test'
import { CommentState } from '~/gql/graphql'
import { MOCK_CIRCLE_COMMENT } from '~/stories/mocks'

import DropdownActions from './'

describe('<CircleComment/DropdownActions>', () => {
  it('should not render dropdown actions if comment is archived', async () => {
    render(
      <DropdownActions
        comment={{ ...MOCK_CIRCLE_COMMENT, state: CommentState.Archived }}
        type="circleBroadcast"
      />
    )
    const $button = screen.queryByLabelText('More Actions')
    expect($button).not.toBeInTheDocument()
  })

  // hasPin
  it('should render pin buttons', async () => {
    render(
      <DropdownActions
        comment={{
          ...MOCK_CIRCLE_COMMENT,
          pinned: false,
          parentComment: null,
        }}
        type="circleBroadcast"
        hasPin
      />
    )

    // open menu and check if pin button is rendered
    const $button = screen.getByLabelText('More Actions')
    expect($button).toBeInTheDocument()
    fireEvent.click($button)
    const $pinButton = screen.getByRole('menuitem', { name: 'Pin Broadcast' })
    expect($pinButton).toBeInTheDocument()

    // unpin button
    cleanup()
    render(
      <DropdownActions
        comment={{ ...MOCK_CIRCLE_COMMENT, pinned: true, parentComment: null }}
        type="circleBroadcast"
        hasPin
      />
    )

    // open menu and check if pin button is rendered
    const $button2 = screen.getByLabelText('More Actions')
    expect($button2).toBeInTheDocument()
    fireEvent.click($button2)
    const $unpinButton = screen.getByRole('menuitem', {
      name: 'Unpin Broadcast',
    })
    expect($unpinButton).toBeInTheDocument()
  })

  it('should not render pin buttons if viewer is not circle author', async () => {
    render(
      <DropdownActions
        comment={{
          ...MOCK_CIRCLE_COMMENT,
          node: {
            ...MOCK_CIRCLE_COMMENT.node,
            owner: { ...MOCK_CIRCLE_COMMENT.node.owner, id: 'another_user' },
          },
          pinned: false,
          parentComment: null,
        }}
        type="circleBroadcast"
        hasPin
      />
    )
    const $button = screen.getByLabelText('More Actions')
    expect($button).toBeInTheDocument()
    fireEvent.click($button)
    const $pinButton = screen.queryByRole('menuitem', { name: 'Pin Broadcast' })
    expect($pinButton).not.toBeInTheDocument()
  })

  // hasEdit
  it('should render edit button', async () => {
    render(
      <DropdownActions
        comment={{ ...MOCK_CIRCLE_COMMENT, state: CommentState.Active }}
        type="circleBroadcast"
      />
    )

    // open menu and check if edit button is rendered
    const $button = screen.getByLabelText('More Actions')
    expect($button).toBeInTheDocument()
    fireEvent.click($button)
    const $editButton = screen.getByRole('menuitem', { name: 'Edit' })
    expect($editButton).toBeInTheDocument()
  })

  it('should not render edit button if viewer is not comment author', async () => {
    render(
      <DropdownActions
        comment={{
          ...MOCK_CIRCLE_COMMENT,
          author: { ...MOCK_CIRCLE_COMMENT.author, id: 'another_user' },
          state: CommentState.Active,
        }}
        type="circleBroadcast"
      />
    )
    const $button = screen.getByLabelText('More Actions')
    expect($button).toBeInTheDocument()
    fireEvent.click($button)
    expect(
      screen.queryByRole('menuitem', { name: 'Edit' })
    ).not.toBeInTheDocument()
  })

  // hasDelete
  it('should render delete button', async () => {
    render(
      <DropdownActions
        comment={{ ...MOCK_CIRCLE_COMMENT, state: CommentState.Active }}
        type="circleBroadcast"
      />
    )

    // open menu and check if delete button is rendered
    const $button = screen.getByLabelText('More Actions')
    expect($button).toBeInTheDocument()
    fireEvent.click($button)
    const $deleteButton = screen.getByRole('menuitem', { name: 'Delete' })
    expect($deleteButton).toBeInTheDocument()

    // open dialog
    fireEvent.click($deleteButton)
    const $dialog = screen.getByTestId(TEST_ID.DIALOG_COMMENT_DELETE)
    expect($dialog).toBeInTheDocument()
  })

  // hasBlockUser
  it('should render block user button if viewer is not comment author', async () => {
    render(
      <DropdownActions
        comment={{
          ...MOCK_CIRCLE_COMMENT,
          author: { ...MOCK_CIRCLE_COMMENT.author, id: 'another-user' },
        }}
        type="circleBroadcast"
      />
    )

    // open menu and check if block user button is rendered
    const $button = screen.getByLabelText('More Actions')
    expect($button).toBeInTheDocument()
    fireEvent.click($button)
    const $blockUserButton = screen.getByRole('menuitem', {
      name: 'Block User',
    })
    expect($blockUserButton).toBeInTheDocument()

    // open dialog
    fireEvent.click($blockUserButton)
    const $dialog = screen.getByTestId(TEST_ID.DIALOG_BLOCK_USER)
    expect($dialog).toBeInTheDocument()
  })

  // hasCollapse
  it('should render collapse button if viewer is circle author but not comment author', async () => {
    render(
      <DropdownActions
        comment={{
          ...MOCK_CIRCLE_COMMENT,
          author: { ...MOCK_CIRCLE_COMMENT.author, id: 'another-user' },
        }}
        type="circleBroadcast"
      />
    )

    // open menu and check if collapse button is rendered
    const $button = screen.getByLabelText('More Actions')
    expect($button).toBeInTheDocument()
    fireEvent.click($button)
    const $collapseButton = screen.getByRole('menuitem', {
      name: 'Collapse',
    })
    expect($collapseButton).toBeInTheDocument()

    // open dialog
    fireEvent.click($collapseButton)
    const $dialog = screen.getByTestId(TEST_ID.DIALOG_COMMENT_COLLAPSE)
    expect($dialog).toBeInTheDocument()
  })

  // hasUncollapse
  it('should render uncollapse button if viewer is circle author but not comment author', async () => {
    render(
      <DropdownActions
        comment={{
          ...MOCK_CIRCLE_COMMENT,
          author: { ...MOCK_CIRCLE_COMMENT.author, id: 'another-user' },
          state: CommentState.Collapsed,
        }}
        type="circleBroadcast"
      />
    )

    // open menu and check if uncollapse button is rendered
    const $button = screen.getByLabelText('More Actions')
    expect($button).toBeInTheDocument()
    fireEvent.click($button)
    const $uncollapseButton = screen.getByRole('menuitem', {
      name: 'Uncollapse',
    })
    expect($uncollapseButton).toBeInTheDocument()
  })
})
