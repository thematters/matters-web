import { Formik } from 'formik'
import Router, { withRouter, WithRouterProps } from 'next/router'
import { useContext, useState } from 'react'

import { Dropdown, Icon, LanguageContext, PopperInstance } from '~/components'

import { toPath, translate } from '~/common/utils'
import ICON_SEARCH from '~/static/icons/search.svg?sprite'

import AutoComplete from './AutoComplete'
import styles from './styles.css'

const SearchButton = () => (
  <button type="submit" aria-label="搜尋">
    <Icon
      id={ICON_SEARCH.id}
      viewBox={ICON_SEARCH.viewBox}
      className="u-motion-icon-hover"
    />
  </button>
)

const BaseSearchBar: React.FC<
  WithRouterProps & {
    autoComplete?: boolean
  }
> = ({ router, autoComplete = true }) => {
  // translations
  const { lang } = useContext(LanguageContext)
  const textAriaLabel = translate({
    zh_hant: '搜尋',
    zh_hans: '搜索',
    lang
  })
  const textPlaceholder = translate({
    zh_hant: '搜尋文章、標籤、作者',
    zh_hans: '搜索文章、标签、作者',
    lang
  })

  // dropdown
  const [
    dropdownInstance,
    setDropdownInstance
  ] = useState<PopperInstance | null>(null)
  const onCreate = (instance: any) => setDropdownInstance(instance)
  const hideDropdown = () => {
    if (dropdownInstance) {
      dropdownInstance.hide()
    }
  }
  const showDropdown = () => {
    if (dropdownInstance) {
      setTimeout(() => {
        dropdownInstance.show()
      }, 100) // unknown bug, needs set a timeout
    }
  }

  // parse query
  let routerQ = router && router.query && router.query.q
  routerQ = routerQ instanceof Array ? routerQ[0] : routerQ

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
      validate={values => {
        if (values.q) {
          hideDropdown()
        } else {
          showDropdown()
        }
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
            content={<AutoComplete hideDropdown={hideDropdown} />}
            zIndex={101}
            trigger="manual"
            onCreate={onCreate}
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
                onChange={handleChange}
                onFocus={() => !values.q && showDropdown()}
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

export const SearchBar = withRouter(BaseSearchBar)
