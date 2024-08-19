import { VisuallyHidden } from '@reach/visually-hidden'
import { Formik } from 'formik'
import { useIntl } from 'react-intl'

import { ReactComponent as IconNavSearch } from '@/public/static/icons/24px/nav-search.svg'
import { ReactComponent as IconTimes } from '@/public/static/icons/24px/times.svg'
import { Icon } from '~/components'

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
              <Icon icon={IconNavSearch} color="greyDark" />
            </button>

            {values.q !== '' && (
              <button
                className={styles.clear}
                type="button"
                aria-label={intl.formatMessage({
                  defaultMessage: 'Clear',
                  id: '/GCoTA',
                })}
                onClick={() => {
                  onChange('')
                  setValues({ q: '' })
                }}
              >
                <Icon icon={IconTimes} color="greyDark" />
              </button>
            )}
          </form>
        )
      }}
    </Formik>
  )
}

export default SearchInput
