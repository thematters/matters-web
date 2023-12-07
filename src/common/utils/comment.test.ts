import { describe, expect, it } from 'vitest'

import { ArticleState, CommentState } from '~/gql/graphql'
import { MOCK_ARTILCE, MOCK_COMMENT } from '~/stories/mocks'

import { filterComments, filterResponses } from './comment'

describe('utils/comment/filterComments', () => {
  it('should not filter comment that are active or collapse', () => {
    const comments = [
      { ...MOCK_COMMENT, state: CommentState.Active },
      { ...MOCK_COMMENT, state: CommentState.Collapsed },
    ]
    const result = filterComments(comments)
    expect(result.length).toEqual(comments.length)
  })

  it('should filter out comment that are banned or archived', () => {
    const comments = [
      { ...MOCK_COMMENT, state: CommentState.Banned },
      { ...MOCK_COMMENT, state: CommentState.Archived },
    ]
    const result = filterComments(comments)
    expect(result.length).toEqual(0)
  })

  it('should filter out comment that are decendant', () => {
    const comments = [
      {
        ...MOCK_COMMENT,
        state: CommentState.Banned,
        parentComment: { id: '1' },
      },
    ]
    const result = filterComments(comments)
    expect(result.length).toEqual(0)
  })

  it('should not filter out comment that are not decendant and has active descendant comments', () => {
    const comments = [
      {
        ...MOCK_COMMENT,
        state: CommentState.Banned,
        parentComment: null,
        comments: {
          edges: [
            {
              node: {
                ...MOCK_COMMENT,
                state: CommentState.Active,
              },
            },
          ],
        },
      },
    ]
    const result = filterComments(comments)
    expect(result.length).toEqual(comments.length)
  })

  it('should filter out comment that are not decendant and has banned descendant comments', () => {
    const comments = [
      {
        ...MOCK_COMMENT,
        state: CommentState.Banned,
        parentComment: null,
        comments: {
          edges: [
            {
              node: {
                ...MOCK_COMMENT,
                state: CommentState.Banned,
              },
            },
          ],
        },
      },
    ]
    const result = filterComments(comments)
    expect(result.length).toEqual(0)
  })
})

describe('utils/comment/filterResponses', () => {
  it('should not filter out responses that are articles', () => {
    const responses = [
      { ...MOCK_ARTILCE, state: ArticleState.Active },
      { ...MOCK_ARTILCE, state: ArticleState.Banned },
      { ...MOCK_COMMENT, state: CommentState.Active },
      { ...MOCK_COMMENT, state: CommentState.Banned },
    ]
    const result = filterResponses(responses)
    expect(result.length).toEqual(responses.length - 1)
  })
})
