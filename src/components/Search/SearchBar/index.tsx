import { Formik } from 'formik'
import { useContext, useEffect, useState } from 'react'
import { useDebounce } from 'use-debounce'

import {
  Button,
  Dropdown,
  IconClear16,
  IconSearch16,
  LanguageContext,
  SearchQuickResult,
  useRoute,
} from '~/components'

import { INPUT_DEBOUNCE, Z_INDEX } from '~/common/enums'
import { toPath, translate } from '~/common/utils'

import styles from './styles.css'

interface SearchBarProps {
  onChange?: (key: string) => void
  hasDropdown?: boolean
}

const SearchButton = () => {
  const { lang } = useContext(LanguageContext)

  return (
    <Button
      size={['2rem', '2rem']}
      type="submit"
      aria-label={translate({ id: 'search', lang })}
    >
      <IconSearch16 color="grey-dark" />
    </Button>
  )
}

interface ClearButtonProps {
  onClick: () => void
}

const ClearButton = ({ onClick }: ClearButtonProps) => {
  const { lang } = useContext(LanguageContext)

  return (
    <Button
      size={['2rem', '2rem']}
      type="button"
      aria-label={translate({ id: 'clear', lang })}
      onClick={onClick}
    >
      <IconClear16 color="grey-dark" />
    </Button>
  )
}

export const SearchBar: React.FC<SearchBarProps> = ({
  onChange,
  hasDropdown = true,
}) => {
  const { getQuery, router, isInPath } = useRoute()
  const isSearch = isInPath('SEARCH')
  const q = getQuery('q')
  const { lang } = useContext(LanguageContext)
  const [search, setSearch] = useState('')
  const [debouncedSearch] = useDebounce(search, INPUT_DEBOUNCE)
  const textAriaLabel = translate({ id: 'search', lang })
  const textPlaceholder = translate({ id: 'search', lang })

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
    <Formik
      initialValues={{ q }}
      enableReinitialize
      onSubmit={(values) => {
        const path = toPath({
          page: 'search',
          q: values.q.slice(0, 100),
        })

        if (isSearch) {
          router.replace(path.href)
        } else {
          router.push(path.href)
        }

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
              {search.length > 0 && (
                <ClearButton
                  onClick={() => {
                    setSearch('')
                    values.q = ''
                  }}
                />
              )}

              <style jsx>{styles}</style>
            </form>
          )
        }

        return (
          <Dropdown
            content={
              debouncedSearch ? (
                <SearchQuickResult searchKey={debouncedSearch} />
              ) : null
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
    </Formik>
  )
}
