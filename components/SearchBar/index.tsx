import { Formik } from 'formik'
import Router, { useRouter } from 'next/router'
import { useContext, useState } from 'react'

import { Dropdown, Icon, LanguageContext, PopperInstance } from '~/components'

import { TEXT } from '~/common/enums'
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

  // translations
  const { lang } = useContext(LanguageContext)
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
  const hideDropdown = () => {
    if (instance) {
      instance.hide()
    }
  }
  const showDropdown = () => {
    if (instance) {
      setTimeout(() => {
        instance.show()
      }, 100) // unknown bug, needs set a timeout
    }
  }

  // parse query
  const routerQ = getQuery({ router, key: 'q' })

  return (
    <Formik
      initialValues={{ q: routerQ || '' }}
      enableReinitialize
      onSubmit={values => {
        const path = toPath({
          page: 'search',
          q: values.q
        })
        Router.push(path.href, path.as)
      }}
      render={({ values, handleSubmit, handleChange }) => {
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
              <AutoComplete searchKey={values.q} hideDropdown={hideDropdown} />
            }
            trigger="manual"
            onCreate={setInstance}
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
                  showDropdown()
                }}
                onFocus={() => !values.q && showDropdown()}
                onClick={() => !values.q && showDropdown()}
                onBlur={hideDropdown}
              />
              <SearchButton />
              <style jsx>{styles}</style>
            </form>
          </Dropdown>
        )
      }}
    />
  )
}

export const SearchBar = BaseSearchBar
