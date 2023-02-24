import autosize from 'autosize'
import classNames from 'classnames'
import React, { useContext } from 'react'

import { KEYCODES } from '~/common/enums'
import { translate } from '~/common/utils'
import { LanguageContext } from '~/components'

/**
 * This is an optional component for user to add summary.
 *
 * Usage:
 *   <EditorSummary
 *      devalutValue="Default summary"
 *      enable={true}
 *      readOnly={false}
 *      texts={{}}
 *      update={() => func({ summary: '' })}
 *   />
 */

interface Props {
  defaultValue?: string
  enable?: boolean
  readOnly: boolean
  update: (params: { summary: any }) => void
}

const EditorSummary: React.FC<Props> = ({
  defaultValue = '',
  enable,
  readOnly,
  update,
}) => {
  const { lang } = useContext(LanguageContext)
  const instance: React.RefObject<any> | null = React.useRef(null)

  const [value, setValue] = React.useState(defaultValue)

  const length = (value && value.length) || 0

  const handleChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    const text = (event.target.value || '').replace(/\r\n|\r|\n/g, '')
    setValue(text)
  }

  const handleBlur = (event: React.FocusEvent<HTMLTextAreaElement>) =>
    update({ summary: value })

  const handleKeyPress = (event: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (event.charCode === KEYCODES.enter || event.key === 'Enter') {
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
    'u-area-disable': readOnly,
  })
  const counterClasses = classNames({
    counter: true,
    error: length > 200,
  })

  return (
    <section className={classes}>
      <textarea
        ref={instance}
        rows={1}
        aria-label={translate({
          en: 'Untitle',
          zh_hans: '未命名',
          zh_hant: '未命名',
          lang,
        })}
        placeholder={translate({
          en: 'Untitle',
          zh_hans: '未命名',
          zh_hant: '未命名',
          lang,
        })}
        value={value}
        onBlur={handleBlur}
        onChange={handleChange}
        onKeyPress={handleKeyPress}
      />
      {!readOnly && (
        <section className={counterClasses}>({length}/200)</section>
      )}
    </section>
  )
}

export default EditorSummary
