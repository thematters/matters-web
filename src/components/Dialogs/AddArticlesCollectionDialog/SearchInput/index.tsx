import { VisuallyHidden } from '@reach/visually-hidden'
import { Formik } from 'formik'
import { useContext } from 'react'
import { useIntl } from 'react-intl'

import { translate } from '~/common/utils'
import { IconClose20, IconSearch20, LanguageContext } from '~/components'

import styles from './styles.module.css'

export interface SearchInputProps {
  value: string
  onChange: (value: string) => void
  onFocus?: () => void
  onBlur?: () => void
  autoFocus?: boolean
}

const SearchInput: React.FC<SearchInputProps> = ({
  value,
  onChange,
  onFocus,
  onBlur,
  autoFocus,
}) => {
  const fieldId = `search-input`
  const intl = useIntl()
  const searchCopy = intl.formatMessage({
    defaultMessage: 'Search',
    id: 'xmcVZ0',
  })
  const { lang } = useContext(LanguageContext)

  return (
    <Formik initialValues={{ q: '' }} enableReinitialize onSubmit={() => {}}>
      {({ values, setValues, handleSubmit, handleChange }) => {
        return (
          <form
            className={styles.form}
            onSubmit={handleSubmit}
            role="search"
            autoComplete="off"
            action=""
          >
            <VisuallyHidden>
              <label htmlFor={fieldId}>{searchCopy}</label>
            </VisuallyHidden>

            <input
              id={fieldId}
              type="search"
              name="q"
              autoCorrect="off"
              autoFocus={!!autoFocus}
              value={values.q}
              aria-label={searchCopy}
              placeholder={searchCopy}
              onChange={(e) => {
                handleChange(e)
                onChange(e.target.value)
              }}
              onFocus={() => {
                onFocus && onFocus()
              }}
              onBlur={() => {
                onBlur && onBlur()
              }}
            />

            <button className={styles.search} aria-label={searchCopy}>
              <IconSearch20 color="greyDark" />
            </button>

            {values.q !== '' && (
              <button
                className={styles.clear}
                type="button"
                aria-label={translate({ id: 'clear', lang })}
                onClick={() => {
                  onChange('')
                  setValues({ q: '' })
                }}
              >
                <IconClose20 color="greyDark" />
              </button>
            )}
          </form>
        )
      }}
    </Formik>
  )
}

export default SearchInput
