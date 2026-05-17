import { describe, expect, it } from 'vitest'

import { TEST_ID } from '~/common/enums'
import { cleanup, fireEvent, render, screen } from '~/common/utils/test'
import { processViewer, ViewerContext } from '~/components'
import { CommentState, UserFeatureFlagType } from '~/gql/graphql'
import { MOCK_COMMENT, MOCK_USER } from '~/stories/mocks'

import DropdownActions from './'

describe('<Comment/DropdownActions>', () => {
  // hasPin
  it('should render pin buttons', async () => {
    render(
      <DropdownActions
        comment={{ ...MOCK_COMMENT, pinned: false, parentComment: null }}
        hasPin
      />
    )

    // open menu and check if pin button is rendered
    const $button = screen.getByLabelText('More Actions')
    expect($button).toBeInTheDocument()
    fireEvent.click($button)
    const $pinButton = screen.getByRole('menuitem', { name: 'Pin' })
    expect($pinButton).toBeInTheDocument()

    // unpin button
    cleanup()
    render(
      <DropdownActions
        comment={{ ...MOCK_COMMENT, pinned: true, parentComment: null }}
        hasPin
      />
    )

    // open menu and check if pin button is rendered
    const $button2 = screen.getByLabelText('More Actions')
    expect($button2).toBeInTheDocument()
    fireEvent.click($button2)
    const $unpinButton = screen.getByRole('menuitem', { name: 'Unpin' })
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
        hasPin
      />
    )
    const $button = screen.getByLabelText('More Actions')
    expect($button).toBeInTheDocument()
    fireEvent.click($button)
    const $pinButton = screen.queryByRole('menuitem', { name: 'Pin' })
    expect($pinButton).not.toBeInTheDocument()
  })

  // hasDelete
  it('should render delete button', async () => {
    render(
      <DropdownActions
        comment={{ ...MOCK_COMMENT, state: CommentState.Active }}
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

  it('should render community watch actions for community watch members', async () => {
    const viewer = processViewer({
      ...MOCK_USER,
      oss: {
        ...MOCK_USER.oss,
        featureFlags: [
          {
            __typename: 'UserFeatureFlag',
            type: UserFeatureFlagType.CommunityWatch,
          },
        ],
      },
    })

    render(
      <ViewerContext.Provider value={viewer}>
        <DropdownActions
          comment={{ ...MOCK_COMMENT, state: CommentState.Active }}
        />
      </ViewerContext.Provider>
    )

    const $button = screen.getByLabelText('More Actions')
    expect($button).toBeInTheDocument()
    fireEvent.click($button)

    expect(
      screen.getByRole('menuitem', { name: '色情廣告' })
    ).toBeInTheDocument()
    expect(
      screen.getByRole('menuitem', { name: '濫發廣告' })
    ).toBeInTheDocument()
    expect(screen.getByText('所有處理都會公開留痕')).toBeInTheDocument()
  })
})
