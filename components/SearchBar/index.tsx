import { FormikProps, withFormik } from 'formik'
import Router, { withRouter, WithRouterProps } from 'next/router'
import { useContext, useState } from 'react'

import { Dropdown, Icon, LanguageContext, PopperInstance } from '~/components'
import AutoComplete from './AutoComplete'

import { toPath, translate } from '~/common/utils'
import ICON_SEARCH from '~/static/icons/search.svg?sprite'
import styles from './styles.css'

interface FormValues {
  q: string
}

interface SearchBarProps {
  autoComplete?: boolean
}

const SearchButton = () => (
  <button type="submit" aria-label="搜尋">
    <Icon
      id={ICON_SEARCH.id}
      viewBox={ICON_SEARCH.viewBox}
      className="u-motion-icon-hover"
    />
  </button>
)

const BaseSearchBar = ({
  values,
  handleChange,
  handleSubmit,
  autoComplete = true
}: FormikProps<FormValues> & SearchBarProps) => {
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
    if (dropdownInstance && !values.q) {
      dropdownInstance.show()
    }
  }
  // translations
  const { lang } = useContext(LanguageContext)
  const textAriaLabel = translate({
    translations: { zh_hant: '搜尋', zh_hans: '搜索' },
    lang
  })
  const textPlaceholder = translate({
    translations: {
      zh_hant: '搜尋文章、標籤、作者',
      zh_hans: '搜索文章、标签、作者'
    },
    lang
  })

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
          onChange={e => {
            values.q ? hideDropdown() : showDropdown()
            handleChange(e)
          }}
          onClick={showDropdown}
          onFocus={showDropdown}
          onBlur={hideDropdown}
        />
        <SearchButton />
        <style jsx>{styles}</style>
      </form>
    </Dropdown>
  )
}

export const SearchBar = withRouter(
  withFormik<WithRouterProps & SearchBarProps, FormValues>({
    mapPropsToValues: ({ router }) => {
      let q = router && router.query && router.query.q
      q = q instanceof Array ? q.join(',') : q
      return { q: q || '' }
    },

    handleSubmit: values => {
      const path = toPath({
        page: 'search',
        q: values.q
      })
      Router.push(path.href, path.as)
    },

    displayName: 'SearchBar'
  })(BaseSearchBar)
)
