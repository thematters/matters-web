import { afterEach, describe, expect, it, vi } from 'vitest'

import { cleanup, render, screen } from '~/common/utils/test'
import { processViewer, ViewerContext } from '~/components'
import { CommentState, UserRole } from '~/gql/graphql'
import { MOCK_COMMENT, MOCK_USER } from '~/stories/mocks'

import { CommentContent } from './'

describe('<Comemnt.Content>', () => {
  afterEach(() => {
    vi.unstubAllEnvs()
  })

  it('should render a Comment.Content', () => {
    render(<CommentContent comment={MOCK_COMMENT} />)

    const $content = screen.getByText(MOCK_COMMENT.content)
    expect($content).toBeInTheDocument()
  })

  it('should render a collapsed Comment.Content', () => {
    // collapsed by author
    render(
      <CommentContent
        comment={{
          ...MOCK_COMMENT,
          state: CommentState.Collapsed,
          author: { ...MOCK_COMMENT.author, isBlocked: false },
        }}
      />
    )
    expect(screen.getByText('Comment has been hidden')).toBeInTheDocument()

    // blocked by user
    cleanup()
    render(
      <CommentContent
        comment={{
          ...MOCK_COMMENT,
          state: CommentState.Active,
          author: { ...MOCK_COMMENT.author, isBlocked: true },
        }}
      />
    )
    expect(screen.getByText('Comment has been hidden')).toBeInTheDocument()

    // banned by user
    cleanup()
    render(
      <CommentContent
        comment={{
          ...MOCK_COMMENT,
          state: CommentState.Banned,
        }}
      />
    )
    expect(
      screen.getByText('The comment has been forcibly hidden')
    ).toBeInTheDocument()
  })

  it('should render an archived Comment.Content', () => {
    render(
      <CommentContent
        comment={{
          ...MOCK_COMMENT,
          state: CommentState.Archived,
        }}
      />
    )
    expect(
      screen.getByText('This comment has been deleted by the author')
    ).toBeInTheDocument()
  })

  it('should render a Community Watch placeholder link', () => {
    render(
      <CommentContent
        comment={{
          ...MOCK_COMMENT,
          state: CommentState.Banned,
          communityWatchAction: {
            uuid: 'community-watch-action-uuid',
          },
        }}
      />
    )

    const $link = screen.getByRole('link', {
      name: '本則貼文已由守望相助隊檢舉',
    })
    expect($link).toHaveAttribute(
      'href',
      'https://community-watch.matters.town/records/community-watch-action-uuid/'
    )
    expect(
      screen.queryByRole('button', { name: /恢復留言|Restore comment/ })
    ).not.toBeInTheDocument()
  })

  it('should not render a Community Watch restore button for admins outside admin view', () => {
    const admin = processViewer({
      ...MOCK_USER,
      status: {
        ...MOCK_USER.status,
        role: UserRole.Admin,
      },
    })

    render(
      <ViewerContext.Provider value={admin}>
        <CommentContent
          comment={{
            ...MOCK_COMMENT,
            state: CommentState.Banned,
            communityWatchAction: {
              uuid: 'community-watch-action-uuid',
            },
          }}
        />
      </ViewerContext.Provider>
    )

    expect(
      screen.queryByRole('button', { name: /恢復留言|Restore comment/ })
    ).not.toBeInTheDocument()
  })

  it('should render a Community Watch restore button for admins in admin view', () => {
    vi.stubEnv('NEXT_PUBLIC_ADMIN_VIEW', 'true')

    const admin = processViewer({
      ...MOCK_USER,
      status: {
        ...MOCK_USER.status,
        role: UserRole.Admin,
      },
    })

    render(
      <ViewerContext.Provider value={admin}>
        <CommentContent
          comment={{
            ...MOCK_COMMENT,
            state: CommentState.Banned,
            communityWatchAction: {
              uuid: 'community-watch-action-uuid',
            },
          }}
        />
      </ViewerContext.Provider>
    )

    expect(
      screen.getByRole('button', { name: /恢復留言|Restore comment/ })
    ).toBeInTheDocument()
  })
})
