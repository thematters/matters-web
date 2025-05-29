import { Formik } from 'formik'
import { useId } from 'react'
import { useVisuallyHidden } from 'react-aria'
import { useIntl } from 'react-intl'

import IconNavSearch from '@/public/static/icons/24px/nav-search.svg'
import IconTimes from '@/public/static/icons/24px/times.svg'
import { Icon } from '~/components'

import styles from './styles.module.css'

export interface SearchInputProps {
  onChange: (value: string) => void
  onFocus?: () => void
  onBlur?: () => void
  autoFocus?: boolean
}

const SearchInput: React.FC<SearchInputProps> = ({
  onChange,
  onFocus,
  onBlur,
  autoFocus,
}) => {
  const fieldId = useId()
  const intl = useIntl()
  const searchCopy = intl.formatMessage({
    defaultMessage: 'Search',
    id: 'xmcVZ0',
  })

  const { visuallyHiddenProps } = useVisuallyHidden()

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
            <label htmlFor={fieldId} {...visuallyHiddenProps}>
              {searchCopy}
            </label>

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
                onFocus?.()
              }}
              onBlur={() => {
                onBlur?.()
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
