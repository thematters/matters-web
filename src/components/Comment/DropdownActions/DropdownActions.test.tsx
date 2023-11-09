import { describe, expect, it } from 'vitest'

import { TEST_ID } from '~/common/enums'
import { cleanup, render, screen } from '~/common/utils/test'
import { CommentState } from '~/gql/graphql'
import { MOCK_COMMENT } from '~/stories/mocks'

import DropdownActions from './'

describe('<Comment/DropdownActions>', () => {
  it('should not render dropdown actions if comment is archived', async () => {
    render(
      <DropdownActions
        comment={{ ...MOCK_COMMENT, state: CommentState.Archived }}
        type="article"
      />
    )
    const $button = screen.queryByLabelText('More Actions')
    expect($button).not.toBeInTheDocument()
  })

  // hasPin
  it('should render pin buttons', async () => {
    render(
      <DropdownActions
        comment={{ ...MOCK_COMMENT, pinned: false, parentComment: null }}
        type="article"
        hasPin
      />
    )

    // open menu and check if pin button is rendered
    const $button = screen.getByLabelText('More Actions')
    expect($button).toBeInTheDocument()
    $button.click()
    const $pinButton = screen.getByRole('menuitem', { name: 'Pin Comment' })
    expect($pinButton).toBeInTheDocument()

    // unpin button
    cleanup()
    render(
      <DropdownActions
        comment={{ ...MOCK_COMMENT, pinned: true, parentComment: null }}
        type="article"
        hasPin
      />
    )

    // open menu and check if pin button is rendered
    const $button2 = screen.getByLabelText('More Actions')
    expect($button2).toBeInTheDocument()
    $button2.click()
    const $unpinButton = screen.getByRole('menuitem', { name: 'Unpin Comment' })
    expect($unpinButton).toBeInTheDocument()
  })

  it('should not render pin buttons if viewer is not article author', async () => {
    render(
      <DropdownActions
        comment={{
          ...MOCK_COMMENT,
          node: {
            ...MOCK_COMMENT.node,
            author: { ...MOCK_COMMENT.node.author, id: 'another-user' },
          },
          pinned: false,
          parentComment: null,
        }}
        type="article"
        hasPin
      />
    )
    const $button = screen.getByLabelText('More Actions')
    expect($button).toBeInTheDocument()
    $button.click()
    const $pinButton = screen.queryByRole('menuitem', { name: 'Pin Comment' })
    expect($pinButton).not.toBeInTheDocument()
  })

  // hasEdit
  it('should render edit button', async () => {
    render(
      <DropdownActions
        comment={{ ...MOCK_COMMENT, state: CommentState.Active }}
        type="article"
      />
    )

    // open menu and check if edit button is rendered
    const $button = screen.getByLabelText('More Actions')
    expect($button).toBeInTheDocument()
    $button.click()
    const $editButton = screen.getByRole('menuitem', { name: 'Edit' })
    expect($editButton).toBeInTheDocument()
  })

  it('should not render edit button if viewer is not comment author', async () => {
    render(
      <DropdownActions
        comment={{
          ...MOCK_COMMENT,
          author: { ...MOCK_COMMENT.author, id: 'another_user' },
          state: CommentState.Active,
        }}
        type="article"
      />
    )
    const $button = screen.getByLabelText('More Actions')
    expect($button).toBeInTheDocument()
    $button.click()
    expect(
      screen.queryByRole('menuitem', { name: 'Edit' })
    ).not.toBeInTheDocument()
  })

  // hasDelete
  it('should render delete button', async () => {
    render(
      <DropdownActions
        comment={{ ...MOCK_COMMENT, state: CommentState.Active }}
        type="article"
      />
    )

    // open menu and check if delete button is rendered
    const $button = screen.getByLabelText('More Actions')
    expect($button).toBeInTheDocument()
    $button.click()
    const $deleteButton = screen.getByRole('menuitem', { name: 'Delete' })
    expect($deleteButton).toBeInTheDocument()

    // open dialog
    $deleteButton.click()
    const $dialog = screen.getByTestId(TEST_ID.DIALOG_COMMENT_DELETE)
    expect($dialog).toBeInTheDocument()
  })

  // hasBlockUser
  it('should render block user button if viewer is not comment author', async () => {
    render(
      <DropdownActions
        comment={{
          ...MOCK_COMMENT,
          author: { ...MOCK_COMMENT.author, id: 'another-user' },
        }}
        type="article"
      />
    )

    // open menu and check if block user button is rendered
    const $button = screen.getByLabelText('More Actions')
    expect($button).toBeInTheDocument()
    $button.click()
    const $blockUserButton = screen.getByRole('menuitem', {
      name: 'Block User',
    })
    expect($blockUserButton).toBeInTheDocument()

    // open dialog
    $blockUserButton.click()
    const $dialog = screen.getByTestId(TEST_ID.DIALOG_BLOCK_USER)
    expect($dialog).toBeInTheDocument()
  })

  // hasCollapse
  it('should render collapse button if viewer is article author but not comment author', async () => {
    render(
      <DropdownActions
        comment={{
          ...MOCK_COMMENT,
          author: { ...MOCK_COMMENT.author, id: 'another-user' },
        }}
        type="article"
      />
    )

    // open menu and check if collapse button is rendered
    const $button = screen.getByLabelText('More Actions')
    expect($button).toBeInTheDocument()
    $button.click()
    const $collapseButton = screen.getByRole('menuitem', {
      name: 'Collapse',
    })
    expect($collapseButton).toBeInTheDocument()

    // open dialog
    $collapseButton.click()
    const $dialog = screen.getByTestId(TEST_ID.DIALOG_COMMENT_COLLAPSE)
    expect($dialog).toBeInTheDocument()
  })

  // hasUncollapse
  it('should render uncollapse button if viewer is article author but not comment author', async () => {
    render(
      <DropdownActions
        comment={{
          ...MOCK_COMMENT,
          author: { ...MOCK_COMMENT.author, id: 'another-user' },
          state: CommentState.Collapsed,
        }}
        type="article"
      />
    )

    // open menu and check if uncollapse button is rendered
    const $button = screen.getByLabelText('More Actions')
    expect($button).toBeInTheDocument()
    $button.click()
    const $uncollapseButton = screen.getByRole('menuitem', {
      name: 'Uncollapse',
    })
    expect($uncollapseButton).toBeInTheDocument()
  })
})
