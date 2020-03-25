import { Formik } from 'formik'
import { useRouter } from 'next/router'
import { useContext, useEffect, useRef, useState } from 'react'
import { useDebounce } from 'use-debounce'

import {
  Button,
  Dropdown,
  Icon,
  LanguageContext,
  PopperInstance,
} from '~/components'

import { INPUT_DEBOUNCE, TEXT, Z_INDEX } from '~/common/enums'
import { getQuery, routerPush, toPath, translate } from '~/common/utils'

import { SearchAutoComplete } from '../SearchAutoComplete'
import { SearchOverview } from '../SearchOverview'
import styles from './styles.css'

interface SearchBarProps {
  onChange?: (key: string) => void
  hasDropdown?: boolean
}

const SearchButton = () => (
  <Button
    size={['2rem', '2rem']}
    type="submit"
    aria-label={TEXT.zh_hant.search}
  >
    <Icon.SearchMedium size="md" color="grey-dark" />
  </Button>
)

export const SearchBar: React.FC<SearchBarProps> = ({
  onChange,
  hasDropdown = true,
}) => {
  const router = useRouter()
  const q = getQuery({ router, key: 'q' }) || ''
  const { lang } = useContext(LanguageContext)
  const [search, setSearch] = useState('')
  const [debouncedSearch] = useDebounce(search, INPUT_DEBOUNCE)
  const textAriaLabel = translate({ id: 'search', lang })
  const textPlaceholder = translate({
    zh_hant: '搜尋作品、標籤、作者',
    zh_hans: '搜索作品、标签、作者',
    lang,
  })

  // dropdown
  const instanceRef = useRef<PopperInstance>()
  const hideDropdown = () => {
    instanceRef.current?.hide()
  }
  const showDropdown = () => {
    instanceRef.current?.show()
  }

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
        routerPush(path.href, path.as)
        hideDropdown()
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
            trigger="manual"
            placement="bottom-start"
            onCreate={(instance) => (instanceRef.current = instance)}
            appendTo={process.browser ? document.body : undefined}
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
                  showDropdown()
                }}
                onFocus={showDropdown}
                onClick={showDropdown}
                onBlur={hideDropdown}
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
