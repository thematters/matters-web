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

interface FormProps {
  defaultAutoComplete?: boolean
}

const BaseSearchBar = ({
  values,
  handleChange,
  handleSubmit
}: FormikProps<FormValues>) => {
  const [
    dropdownInstance,
    setDropdownInstance
  ] = useState<PopperInstance | null>(null)
  const onCreate = (instance: any) => setDropdownInstance(instance)
  const hideDropdown = () => {
    console.log('hideDropdown', dropdownInstance)

    if (!dropdownInstance) {
      return
    }
    dropdownInstance.hide()
  }
  const showDropdown = () => {
    console.log('showDropdown', dropdownInstance)
    if (!dropdownInstance) {
      return
    }
    dropdownInstance.show()
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
          onChange={handleChange}
          value={values.q}
          aria-label="搜尋"
          placeholder="搜尋文章、標籤、作者"
          autoComplete="off"
          onFocus={() => showDropdown()}
          onBlur={hideDropdown}
        />
        <button type="submit" aria-label="搜尋">
          <Icon
            id={ICON_SEARCH.id}
            viewBox={ICON_SEARCH.viewBox}
            className="u-motion-icon-hover"
          />
        </button>
        <style jsx>{styles}</style>
      </form>
    </Dropdown>
  )
}

export const SearchBar = withFormik<FormProps, FormValues>({
  mapPropsToValues: () => ({ q: '' }),

  handleSubmit: (values, { setSubmitting }) => {
    const path = toPath({
      page: 'search',
      q: values.q
    })
    Router.push(path.href, path.as)
  },

  displayName: 'SearchBar'
})(BaseSearchBar)
