import { Formik } from 'formik'
import AutosizeInput from 'react-input-autosize'
import { useIntl } from 'react-intl'

import { ReactComponent as IconHashTag } from '@/public/static/icons/24px/hashtag.svg'
import { validateTagName } from '~/common/utils'
import { Icon, SpinnerBlock, toast } from '~/components'

import styles from './styles.module.css'

type TagInputProps = {
  onAddTag: (tag: string) => void
  saving?: boolean
}

const TagInput = ({ onAddTag, saving }: TagInputProps) => {
  const fieldId = 'search-input-tag'
  const intl = useIntl()
  const textAriaLabel = intl.formatMessage({
    defaultMessage: 'Input tags',
    id: 'xk1AW6',
  })

  return (
    <Formik
      initialValues={{ tag: '' }}
      enableReinitialize
      onSubmit={(values) => {
        const msg = validateTagName(values.tag, intl)
        if (msg) {
          toast.error({
            message: msg,
          })
          return
        }
        onAddTag(values.tag)
      }}
    >
      {({ values, setValues, handleSubmit, handleChange, setFieldValue }) => {
        return (
          <form
            className={styles.form}
            onSubmit={handleSubmit}
            role="search"
            autoComplete="off"
            action=""
          >
            <Icon icon={IconHashTag} color="greyDark" />
            <AutosizeInput
              id={fieldId}
              type="text"
              name="tag"
              autoCorrect="off"
              autoFocus
              value={values.tag}
              disabled={saving}
              aria-label={textAriaLabel}
              placeholder={intl.formatMessage({
                defaultMessage: 'Input tags',
                id: 'xk1AW6',
              })}
              className={styles.input}
              onChange={(e) => {
                handleChange(e)
                // onChange(e.target.value)
              }}
              onFocus={() => {
                // onFocus && onFocus()
              }}
              onBlur={() => {
                // onBlur && onBlur()
              }}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  e.preventDefault()
                  handleSubmit()
                }
              }}
            />
            {saving && <SpinnerBlock size={16} noSpacing />}
          </form>
        )
      }}
    </Formik>
  )
}

export default TagInput
