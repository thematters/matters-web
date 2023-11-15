import { describe, expect, it } from 'vitest'

import { cleanup, render, screen } from '~/common/utils/test'

import FieldFooter from './'

describe('<Form.Field.Footer>', () => {
  it('should render a Form.Field.Footer with hint', () => {
    const name = 'userName'
    const fieldMsgId = `field-msg-${name}`

    const hint = 'This is a hint'

    render(<FieldFooter fieldMsgId={fieldMsgId} hint={hint} />)

    expect(screen.getByText(hint)).toBeInTheDocument()
    expect(screen.queryByRole('alert')).not.toBeInTheDocument()
  })

  it('should render a Form.Field.Footer with error', () => {
    const name = 'userName'
    const fieldMsgId = `field-msg-${name}`

    const hint = 'This is a hint'
    const error = 'This is an error'

    // hint + error
    render(<FieldFooter fieldMsgId={fieldMsgId} hint={hint} error={error} />)
    expect(screen.queryByText(hint)).not.toBeInTheDocument()
    expect(screen.getByRole('alert')).toHaveTextContent(error)

    // error only
    cleanup()
    render(<FieldFooter fieldMsgId={fieldMsgId} error={error} />)
    expect(screen.queryByText(hint)).not.toBeInTheDocument()
    expect(screen.getByRole('alert')).toHaveTextContent(error)
  })
})
