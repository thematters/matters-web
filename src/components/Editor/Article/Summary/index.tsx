import autosize from 'autosize'
import classNames from 'classnames'
import React from 'react'
import { useIntl } from 'react-intl'

import { KEYVALUE, MAX_ARTICE_SUMMARY_LENGTH } from '~/common/enums'

/**
 * This is an optional component for user to add summary.
 *
 * Usage:
 *   <EditorSummary
 *      devalutValue="Default summary"
 *      enable={true}
 *      texts={{}}
 *      update={() => func({ summary: '' })}
 *   />
 */

interface Props {
  defaultValue?: string
  enable?: boolean
  update: (params: { summary: any }) => void
}

const EditorSummary: React.FC<Props> = ({
  defaultValue = '',
  enable,
  update,
}) => {
  const intl = useIntl()
  const instance: React.RefObject<any> | null = React.useRef(null)

  const [value, setValue] = React.useState(defaultValue)

  const length = (value && value.length) || 0

  const handleChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    const text = (event.target.value || '').replace(/\r\n|\r|\n/g, '')
    setValue(text)
  }

  const handleBlur = (event: React.FocusEvent<HTMLTextAreaElement>) =>
    update({ summary: value })

  const handleKeyDown = (event: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (event.key.toLowerCase() === KEYVALUE.enter) {
      event.preventDefault()
    }
  }

  React.useEffect(() => {
    if (enable && instance) {
      autosize(instance.current)
    }
  }, [])

  if (!enable) {
    return null
  }

  const classes = classNames({
    'editor-summary': true,
  })
  const counterClasses = classNames({
    counter: true,
    error: length > MAX_ARTICE_SUMMARY_LENGTH,
  })

  return (
    <section className={classes}>
      <textarea
        ref={instance}
        rows={1}
        aria-label={intl.formatMessage({
          defaultMessage: 'Enter summary…',
          id: '16zJ3o',
        })}
        placeholder={intl.formatMessage({
          defaultMessage: 'Enter summary…',
          id: '16zJ3o',
        })}
        value={value}
        onBlur={handleBlur}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
      />
      <section className={counterClasses}>
        ({length}/{MAX_ARTICE_SUMMARY_LENGTH})
      </section>
    </section>
  )
}

export default EditorSummary
