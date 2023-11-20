import { describe, expect, it } from 'vitest'

import { render, screen } from '~/common/utils/test'

import FieldContent from './'

describe('<Form.Field.Content>', () => {
  it('should render a Form.Field.Content', () => {
    const content = 'This is a content'

    render(<FieldContent>{content}</FieldContent>)

    expect(screen.getByText(content)).toBeInTheDocument()
  })
})
