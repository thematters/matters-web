import { Formik } from 'formik'
import Router, { useRouter } from 'next/router'
import { useContext, useRef, useState } from 'react'
import { useDebounce } from 'use-debounce'

import {
  Button,
  Dropdown,
  hidePopperOnClick,
  Icon,
  LanguageContext,
  PopperInstance
} from '~/components'

import { INPUT_DEBOUNCE, Z_INDEX } from '~/common/enums'
import { getQuery, toPath, translate } from '~/common/utils'

import AutoComplete from './AutoComplete'
import styles from './styles.css'

const SearchButton = () => (
  <Button
    size={[null, '2.25rem']}
    spacing={[0, 'xtight']}
    type="submit"
    aria-label="搜尋"
  >
    <Icon.SearchLarge size="md" color="black" />
  </Button>
)

export const SearchBar: React.FC<{
  autoComplete?: boolean
}> = ({ autoComplete = true }) => {
  const router = useRouter()
  const q = getQuery({ router, key: 'q' }) || ''
  const { lang } = useContext(LanguageContext)
  const [search, setSearch] = useState('')
  const [debouncedSearch] = useDebounce(search, INPUT_DEBOUNCE)
  const textAriaLabel = translate({ id: 'search', lang })
  const textPlaceholder = translate({
    zh_hant: '搜尋作品、標籤、作者',
    zh_hans: '搜索作品、标签、作者',
    lang
  })

  // dropdown
  const instanceRef = useRef<PopperInstance>()
  const hideDropdown = () => {
    instanceRef.current?.hide()
  }
  const showDropdown = () => {
    instanceRef.current?.show()
  }

  return (
    <Formik
      initialValues={{ q }}
      enableReinitialize
      onSubmit={values => {
        const path = toPath({
          page: 'search',
          q: values.q.slice(0, 100)
        })
        Router.push(path.href, path.as)
        hideDropdown()
      }}
    >
      {({ values, handleSubmit, handleChange }) => {
        if (!autoComplete) {
          return (
            <form
              onSubmit={handleSubmit}
              aria-label={textPlaceholder}
              role="search"
            >
              <input
                type="search"
                name="q"
                aria-label={textAriaLabel}
                placeholder={textPlaceholder}
                autoComplete="off"
                autoCorrect="off"
                onChange={handleChange}
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
              <AutoComplete
                searchKey={debouncedSearch}
                hideDropdown={hideDropdown}
              />
            }
            trigger="manual"
            onShown={instance => {
              hidePopperOnClick(instance)
            }}
            onCreate={instance => (instanceRef.current = instance)}
            appendTo={document.body}
            zIndex={Z_INDEX.OVER_GLOBAL_HEADER}
          >
            <form onSubmit={handleSubmit}>
              <input
                type="search"
                name="q"
                aria-label={textAriaLabel}
                placeholder={textPlaceholder}
                autoComplete="off"
                value={values.q}
                onChange={e => {
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
