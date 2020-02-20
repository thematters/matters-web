import { useQuery } from '@apollo/react-hooks'
import { useState } from 'react'
import { useDebounce } from 'use-debounce/lib'

import { Dropdown, hidePopperOnClick, PopperInstance } from '~/components'

import { INPUT_DEBOUNCE } from '~/common/enums'

import styles from './styles.css'

interface DropdownProps {
  dropdownAppendTo?: string
  dropdownAutoSizing?: boolean
  DropdownContent: any
  dropdownCallback?: (params: any) => void
  dropdownZIndex?: number
  query: any
}

type InputProps = {
  type: 'text' | 'password' | 'email' | 'search'
  name: string
  label?: string | React.ReactNode

  error?: string | React.ReactNode
  hint?: string | React.ReactNode

  extraButton?: React.ReactNode
} & React.DetailedHTMLProps<
  React.InputHTMLAttributes<HTMLInputElement>,
  HTMLInputElement
>

type DropdownInputProps = InputProps & DropdownProps

const DropdownInput: React.FC<DropdownInputProps> = ({
  type,
  name,
  label,

  error,
  hint,

  dropdownAppendTo = '',
  dropdownAutoSizing = false,
  DropdownContent,
  dropdownCallback,
  dropdownZIndex,
  query,

  ...inputProps
}) => {
  const [search, setSearch] = useState('')
  const [instance, setInstance] = useState<PopperInstance | null>(null)
  const [debouncedSearch] = useDebounce(search, INPUT_DEBOUNCE)

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
      const element = document.getElementById(name)
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
    <section id="dropdown-container" className="container">
      <header>
        <label htmlFor={name}>{label}</label>
      </header>

      <Dropdown
        trigger="manual"
        placement="bottom-start"
        onCreate={setInstance}
        content={<DropdownContent {...dropdownContentProps} />}
        zIndex={dropdownZIndex}
        appendTo={document.getElementById(dropdownAppendTo) || document.body}
        onShown={i => {
          hidePopperOnClick(i)
        }}
      >
        <input
          {...inputProps}
          id={name}
          name={name}
          type={type}
          onClick={e => {
            if (inputProps.onClick) {
              inputProps.onClick(e)
            }

            if (search) {
              showDropdown()
            }
          }}
          onFocus={e => {
            if (inputProps.onFocus) {
              inputProps.onFocus(e)
            }

            if (search) {
              showDropdown()
            }
          }}
          onChange={e => {
            if (inputProps.onChange) {
              inputProps.onChange(e)
            }

            const trimedValue = e.target.value.trim()

            setSearch(trimedValue)

            if (trimedValue) {
              showDropdown()
            } else {
              hideDropdown()
            }
          }}
        />
      </Dropdown>

      <footer>
        {error && <div className="error">{error}</div>}
        {hint && !error && <div className="hint">{hint}</div>}
      </footer>

      <style jsx>{styles}</style>
    </section>
  )
}

export default DropdownInput
