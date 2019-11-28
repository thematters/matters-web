import { Formik } from 'formik'
import Router, { useRouter } from 'next/router'
import { useContext, useState } from 'react'
import { useDebounce } from 'use-debounce'

import { Dropdown, Icon, LanguageContext, PopperInstance } from '~/components'

import { INPUT_DEBOUNCE, TEXT } from '~/common/enums'
import { getQuery, toPath, translate } from '~/common/utils'
import ICON_SEARCH from '~/static/icons/search.svg?sprite'

import AutoComplete from './AutoComplete'
import styles from './styles.css'

const SearchButton = () => (
  <button type="submit" aria-label="搜尋">
    <Icon id={ICON_SEARCH.id} viewBox={ICON_SEARCH.viewBox} />
  </button>
)

const BaseSearchBar: React.FC<{
  autoComplete?: boolean
}> = ({ autoComplete = true }) => {
  const router = useRouter()
  const q = getQuery({ router, key: 'q' }) || ''
  const { lang } = useContext(LanguageContext)
  const [search, setSearch] = useState('')
  const [debouncedSearch] = useDebounce(search, INPUT_DEBOUNCE)
  const textAriaLabel = translate({
    zh_hant: TEXT.zh_hant.search,
    zh_hans: TEXT.zh_hans.search,
    lang
  })
  const textPlaceholder = translate({
    zh_hant: '搜尋作品、標籤、作者',
    zh_hans: '搜索作品、标签、作者',
    lang
  })

  // dropdown
  const [instance, setInstance] = useState<PopperInstance | null>(null)
  const [shown, setShown] = useState(false)
  const hideDropdown = () => {
    if (instance) {
      instance.hide()
    }
  }
  const showDropdown = () => {
    if (instance) {
      instance.show()
    }
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
            <form onSubmit={handleSubmit}>
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
                isShown={shown}
              />
            }
            trigger="manual"
            onCreate={setInstance}
            onShown={() => setShown(true)}
            theme="dropdown shadow-light"
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

export const SearchBar = BaseSearchBar
