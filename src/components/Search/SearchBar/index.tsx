import dynamic from 'next/dynamic'
import { useEffect, useState } from 'react'
import { useIntl } from 'react-intl'
import { useDebounce } from 'use-debounce'

import { INPUT_DEBOUNCE, Z_INDEX } from '~/common/enums'
import { toPath } from '~/common/utils'
import {
  Button,
  Dropdown,
  IconSearch16,
  SearchAutoComplete,
  SearchOverview,
  useRoute,
} from '~/components'

import styles from './styles.css'

interface SearchBarProps {
  onChange?: (key: string) => void
  hasDropdown?: boolean
}

const DynamicFormik = dynamic(
  () => import('formik').then((mod) => mod.Formik),
  {
    ssr: true, // enable for first screen
  }
)

const SearchButton = () => {
  const intl = useIntl()
  return (
    <Button
      size={['2rem', '2rem']}
      type="submit"
      aria-label={intl.formatMessage({
        defaultMessage: 'Search',
        description: '',
      })}
    >
      <IconSearch16 color="grey-dark" />
    </Button>
  )
}

export const SearchBar: React.FC<SearchBarProps> = ({
  onChange,
  hasDropdown = true,
}) => {
  const { getQuery, router } = useRoute()
  const q = getQuery('q')
  const [search, setSearch] = useState('')
  const [debouncedSearch] = useDebounce(search, INPUT_DEBOUNCE)
  const intl = useIntl()

  const textAriaLabel = intl.formatMessage({
    defaultMessage: 'Search',
    description: '',
  })
  const textPlaceholder = intl.formatMessage({
    defaultMessage: 'Search',
    description: '',
  })

  // dropdown
  const [showDropdown, setShowDropdown] = useState(false)
  const closeDropdown = () => setShowDropdown(false)
  const openDropdown = () => setShowDropdown(true)

  useEffect(() => {
    if (onChange) {
      onChange(debouncedSearch)
    }
  }, [debouncedSearch])

  return (
    <DynamicFormik
      initialValues={{ q }}
      enableReinitialize
      onSubmit={(values) => {
        const path = toPath({
          page: 'search',
          q: values.q.slice(0, 100),
        })
        router.push(path.href)
        closeDropdown()
      }}
    >
      {({ values, handleSubmit, handleChange }) => {
        if (!hasDropdown) {
          return (
            <form
              onSubmit={handleSubmit}
              aria-label={textPlaceholder}
              role="search"
              autoComplete="off"
            >
              <input
                type="search"
                name="q"
                aria-label={textAriaLabel}
                placeholder={textPlaceholder}
                autoCorrect="off"
                onChange={(e) => {
                  handleChange(e)
                  setSearch(e.target.value)
                }}
                value={values.q}
              />

              <SearchButton />

              <style jsx>{styles}</style>
            </form>
          )
        }

        return (
          <Dropdown
            content={
              debouncedSearch ? (
                <SearchAutoComplete searchKey={debouncedSearch} />
              ) : (
                <SearchOverview />
              )
            }
            trigger={undefined}
            appendTo={typeof window !== 'undefined' ? document.body : undefined}
            placement="bottom-start"
            onClickOutside={closeDropdown}
            visible={showDropdown}
            zIndex={Z_INDEX.OVER_GLOBAL_HEADER}
          >
            <form onSubmit={handleSubmit} autoComplete="off">
              <input
                type="search"
                name="q"
                aria-label={textAriaLabel}
                placeholder={textPlaceholder}
                value={values.q}
                onChange={(e) => {
                  handleChange(e)
                  setSearch(e.target.value)
                  openDropdown()
                }}
                onFocus={openDropdown}
                onClick={openDropdown}
              />

              <SearchButton />

              <style jsx>{styles}</style>
            </form>
          </Dropdown>
        )
      }}
    </DynamicFormik>
  )
}
