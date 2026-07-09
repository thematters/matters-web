import { afterEach, describe, expect, it, vi } from 'vitest'

import { fireEvent, render, screen, waitFor } from '~/common/utils/test'

import MomentForm from '.'

const { mockPutMoment, mockFeatures } = vi.hoisted(() => ({
  mockPutMoment: vi.fn().mockResolvedValue({
    data: { putMoment: { id: 'moment-1', tags: [] } },
  }),
  mockFeatures: { moment_tag: true },
}))

vi.mock('~/components/Hook/useFeatures', () => ({
  useFeatures: () => mockFeatures,
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

const openForm = () => {
  render(<MomentForm />)
  fireEvent.click(
    screen.getByRole('button', {
      name: 'Say something? Someone might listen.',
    })
  )
}

// adding a tag closes the input, so reopen it via the # button when needed
const addTag = (tag: string) => {
  if (!screen.queryByTestId('mock-tag-input')) {
    fireEvent.click(screen.getByRole('button', { name: 'Add Tags' }))
  }
  const $input = screen.getByTestId('mock-tag-input')
  fireEvent.change($input, { target: { value: tag } })
  fireEvent.keyDown($input, { key: 'Enter' })
}

describe('src/components/Forms/MomentForm/MomentForm.test.tsx', () => {
  afterEach(() => {
    localStorage.clear()
    mockPutMoment.mockClear()
    mockFeatures.moment_tag = true
  })

  it('should not render tag button when moment_tag is off', () => {
    mockFeatures.moment_tag = false

    openForm()

    expect(
      screen.queryByRole('button', { name: 'Add Tags' })
    ).not.toBeInTheDocument()
  })

  it('should disable tag button when tags reach the limit', () => {
    openForm()

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
    openForm()

    fireEvent.change(screen.getByTestId('mock-moment-editor'), {
      target: { value: '<p>hello world</p>' },
    })

    fireEvent.click(screen.getByRole('button', { name: 'Add Tags' }))
    addTag('tag1')
    addTag('tag2')

    fireEvent.click(screen.getByRole('button', { name: 'Publish' }))

    await waitFor(() => {
      expect(mockPutMoment).toHaveBeenCalledTimes(1)
    })

    const { variables } = mockPutMoment.mock.calls[0][0]
    expect(variables.input.tags).toEqual(['tag1', 'tag2'])
    expect(variables.input.content).toContain('hello world')
  })

  it('should close the tag row when the editor collapses with no tag', () => {
    openForm()

    fireEvent.click(screen.getByRole('button', { name: 'Add Tags' }))
    expect(screen.getByTestId('mock-tag-input')).toBeInTheDocument()

    // click outside collapses the empty editor
    fireEvent.click(document.body)

    // reopen: the tag row starts collapsed
    fireEvent.click(
      screen.getByRole('button', {
        name: 'Say something? Someone might listen.',
      })
    )
    expect(screen.queryByTestId('mock-tag-input')).not.toBeInTheDocument()
  })

  it('should not allow publishing with tags only', () => {
    openForm()

    fireEvent.click(screen.getByRole('button', { name: 'Add Tags' }))
    addTag('tag1')

    // no content and no assets: publish stays disabled
    expect(screen.getByRole('button', { name: 'Publish' })).toBeDisabled()
  })

  it('should add a tag and render it as an InlineTag', () => {
    openForm()

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

  it('should remove one tag while keeping the rest and the row open', () => {
    openForm()

    fireEvent.click(screen.getByRole('button', { name: 'Add Tags' }))
    addTag('tag1')
    addTag('tag2')
    addTag('tag3')

    expect(screen.getAllByRole('button', { name: 'Remove' })).toHaveLength(3)

    // remove the second tag
    fireEvent.click(screen.getAllByRole('button', { name: 'Remove' })[1])

    // removed tag is gone, the others remain
    expect(screen.queryByText('tag2')).not.toBeInTheDocument()
    expect(screen.getByText('tag1')).toBeInTheDocument()
    expect(screen.getByText('tag3')).toBeInTheDocument()
    expect(screen.getAllByRole('button', { name: 'Remove' })).toHaveLength(2)

    // row stays open since tags remain; input stays closed
    expect(screen.queryByTestId('mock-tag-input')).not.toBeInTheDocument()
  })

  it('should collapse the tag row when all tags are removed', () => {
    openForm()

    fireEvent.click(screen.getByRole('button', { name: 'Add Tags' }))
    addTag('tag1')

    fireEvent.click(screen.getByRole('button', { name: 'Remove' }))

    // tag row is collapsed: input and tag are gone
    expect(screen.queryByTestId('mock-tag-input')).not.toBeInTheDocument()
    expect(screen.queryByRole('button', { name: 'Remove' })).toBeNull()
  })
})
