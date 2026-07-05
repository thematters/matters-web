import { afterEach, describe, expect, it, vi } from 'vitest'

import { fireEvent, render, screen, waitFor } from '~/common/utils/test'

import Edit from '.'

const { mockPutMoment } = vi.hoisted(() => ({
  mockPutMoment: vi.fn().mockResolvedValue({
    data: { putMoment: { id: 'moment-1', shortHash: 'abc', tags: [] } },
  }),
}))

vi.mock('~/components/GQL/hooks', async (importOriginal) => {
  const original = await importOriginal<object>()
  return {
    ...original,
    useMutation: () => [mockPutMoment, { loading: false }],
  }
})

vi.mock('~/components/Editor/Moment', () => ({
  default: ({ update }: { update: (params: { content: string }) => void }) => (
    <textarea
      data-test-id="mock-moment-editor"
      onChange={(e) => update({ content: e.target.value })}
    />
  ),
}))

vi.mock('~/components/Editor/Sidebar/Tags/TagInput', () => ({
  default: ({ onAddTag }: { onAddTag: (tag: string) => void }) => (
    <input
      data-test-id="mock-tag-input"
      onKeyDown={(e) => {
        if (e.key === 'Enter') {
          onAddTag((e.target as HTMLInputElement).value)
        }
      }}
    />
  ),
}))

// adding a tag closes the input, so reopen it via the # button when needed
const addTag = (tag: string) => {
  if (!screen.queryByTestId('mock-tag-input')) {
    fireEvent.click(screen.getByRole('button', { name: 'Add Tags' }))
  }
  const $input = screen.getByTestId('mock-tag-input')
  fireEvent.change($input, { target: { value: tag } })
  fireEvent.keyDown($input, { key: 'Enter' })
}

describe('src/views/MomentDetail/Edit/Edit.test.tsx', () => {
  afterEach(() => {
    localStorage.clear()
    mockPutMoment.mockClear()
  })

  it('should add a tag and render it as an InlineTag', () => {
    render(<Edit />)

    fireEvent.click(screen.getByRole('button', { name: 'Add Tags' }))
    addTag('photography')

    // the tag text shows up in the tag row
    expect(screen.getByText('photography')).toBeInTheDocument()
    // one tag means one remove button
    expect(screen.getAllByRole('button', { name: 'Remove' })).toHaveLength(1)

    // the input closes after adding and reopens via the # button
    expect(screen.queryByTestId('mock-tag-input')).not.toBeInTheDocument()
    fireEvent.click(screen.getByRole('button', { name: 'Add Tags' }))
    expect(screen.getByTestId('mock-tag-input')).toBeInTheDocument()
  })

  it('should disable tag button when tags reach the limit', () => {
    render(<Edit />)

    const $tagButton = screen.getByRole('button', { name: 'Add Tags' })
    expect($tagButton).toBeEnabled()

    fireEvent.click($tagButton)
    addTag('tag1')
    addTag('tag2')
    addTag('tag3')

    // tag button is disabled and tag input is hidden
    expect($tagButton).toBeDisabled()
    expect(screen.queryByTestId('mock-tag-input')).not.toBeInTheDocument()

    // image uploader is not affected by the tag limit
    const $upload = screen.getByLabelText('Upload Moment Assets')
    expect($upload).toBeEnabled()
  })

  it('should submit tags along with content', async () => {
    render(<Edit />)

    fireEvent.change(screen.getByTestId('mock-moment-editor'), {
      target: { value: '<p>hello world</p>' },
    })

    fireEvent.click(screen.getByRole('button', { name: 'Add Tags' }))
    addTag('tag1')
    addTag('tag2')

    fireEvent.click(screen.getByRole('button', { name: 'Post' }))

    await waitFor(() => {
      expect(mockPutMoment).toHaveBeenCalledTimes(1)
    })

    const { variables } = mockPutMoment.mock.calls[0][0]
    expect(variables.input.tags).toEqual(['tag1', 'tag2'])
    expect(variables.input.content).toContain('hello world')
  })

  it('should not allow publishing with tags only', () => {
    render(<Edit />)

    fireEvent.click(screen.getByRole('button', { name: 'Add Tags' }))
    addTag('tag1')

    // no content and no assets: post stays disabled
    expect(screen.getByRole('button', { name: 'Post' })).toBeDisabled()
  })

  it('should collapse the tag row when all tags are removed', () => {
    render(<Edit />)

    fireEvent.click(screen.getByRole('button', { name: 'Add Tags' }))
    addTag('tag1')

    fireEvent.click(screen.getByRole('button', { name: 'Remove' }))

    // tag row is collapsed: input and tag are gone
    expect(screen.queryByTestId('mock-tag-input')).not.toBeInTheDocument()
    expect(screen.queryByRole('button', { name: 'Remove' })).toBeNull()
  })
})
