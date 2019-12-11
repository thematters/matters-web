import { useQuery } from '@apollo/react-hooks'
import classNames from 'classnames'
import { useState } from 'react'
import { useDebounce } from 'use-debounce/lib'

import { Dropdown, PopperInstance } from '~/components'

import { INPUT_DEBOUNCE } from '~/common/enums'

import styles from './styles.css'

interface Props {
  className?: string[]
  type: 'text' | 'search'
  field: string
  placeholder?: string
  floatElement?: any
  hint?: string
  style?: { [key: string]: any }

  values: any
  errors: any
  touched: any
  handleBlur: (event: React.FocusEvent<HTMLInputElement>) => void
  handleChange: (event: React.ChangeEvent<HTMLInputElement>) => void

  dropdownAppendTo?: string
  dropdownAutoSizing?: boolean
  DropdownContent: any
  dropdownCallback?: (params: any) => void
  dropdownZIndex?: number
  query: any

  [key: string]: any
}

const DropdownInput: React.FC<Props> = ({
  className = [],
  type,
  field,
  placeholder,
  floatElement,
  hint,
  style,

  values,
  errors,
  touched,
  handleBlur,
  handleChange,

  dropdownAppendTo = '',
  dropdownAutoSizing = false,
  DropdownContent,
  dropdownCallback,
  dropdownZIndex,
  query,

  ...restProps
}) => {
  const value = values[field]
  const error = errors[field]
  const isTouched = touched[field]

  const [search, setSearch] = useState('')
  const [instance, setInstance] = useState<PopperInstance | null>(null)
  const [debouncedSearch] = useDebounce(search, INPUT_DEBOUNCE)

  const inputId = `form-dropdown-input-${field}`

  const inputClass = classNames('input', ...className)
  const containerClass = classNames({
    container: true,
    'has-float': floatElement
  })

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

  const dropdownContentCallback = (params: any) => {
    setSearch('')
    if (dropdownCallback) {
      dropdownCallback(params)
    }
  }

  const getDropdownSize = () => {
    if (dropdownAutoSizing) {
      const element = document.getElementById(inputId)
      if (element) {
        return element.getBoundingClientRect().width
      }
    }
  }

  const { data, loading } = useQuery(query, {
    variables: { search: debouncedSearch },
    skip: !debouncedSearch
  })

  const items = ((data && data.search.edges) || []).map(({ node }: any) => node)

  const dropdownContentProps = {
    loading,
    search,
    items,
    callback: dropdownContentCallback,
    hideDropdown,
    width: getDropdownSize()
  }

  return (
    <>
      <div id="dropdown-container" className={containerClass}>
        <Dropdown
          trigger="manual"
          placement="bottom-start"
          onCreate={setInstance}
          content={<DropdownContent {...dropdownContentProps} />}
          zIndex={dropdownZIndex || 101}
          appendTo={document.getElementById(dropdownAppendTo) || document.body}
        >
          <input
            id={inputId}
            className={inputClass}
            type={type}
            name={field}
            placeholder={placeholder}
            onBlur={handleBlur}
            onClick={() => search && showDropdown()}
            onFocus={() => search && showDropdown()}
            onChange={e => {
              handleChange(e)
              const trimedValue = e.target.value.trim()
              setSearch(trimedValue)
              if (trimedValue) {
                showDropdown()
              } else {
                hideDropdown()
              }
            }}
            value={value}
            style={style}
            {...restProps}
          />
        </Dropdown>

        <div className="info">
          {error && isTouched && <div className="error">{error}</div>}
          {(!error || !isTouched) && hint && <div className="hint">{hint}</div>}
        </div>
      </div>

      <style jsx>{styles}</style>
    </>
  )
}

export default DropdownInput
