import { FormikProps, withFormik } from 'formik'
import Router from 'next/router'
import { useState } from 'react'

import { Dropdown, Icon, PopperInstance } from '~/components'
import AutoComplete from './AutoComplete'

import { toPath } from '~/common/utils'
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

  if (!autoComplete) {
    return (
      <form onSubmit={handleSubmit}>
        <input
          type="search"
          name="q"
          aria-label="搜尋"
          placeholder="搜尋文章、標籤、作者"
          autoComplete="off"
          onChange={handleChange}
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
          aria-label="搜尋"
          placeholder="搜尋文章、標籤、作者"
          autoComplete="off"
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

export const SearchBar = withFormik<SearchBarProps, FormValues>({
  handleSubmit: (values, { setSubmitting }) => {
    console.log(values)
    const path = toPath({
      page: 'search',
      q: values.q
    })
    Router.push(path.href, path.as)
  },

  displayName: 'SearchBar'
})(BaseSearchBar)
