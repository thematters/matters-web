import { Formik } from 'formik'
import React, { useContext, useEffect, useRef, useState } from 'react'
import { useDebounce } from 'use-debounce'

import {
  Button,
  Dropdown,
  IconClear16,
  IconSearch16,
  LanguageContext,
  SearchQuickResult,
  useNativeEventListener,
  useRoute,
} from '~/components'

import { INPUT_DEBOUNCE, Z_INDEX } from '~/common/enums'
import { getSearchType, toPath, translate } from '~/common/utils'

import styles from './styles.css'

import { QuickResult } from '../SearchQuickResult/__generated__/QuickResult'

interface SearchBarProps {
  onChange?: (key: string) => void
  hasDropdown?: boolean
}

const SearchButton = () => {
  const { lang } = useContext(LanguageContext)

  return (
    <Button
      size={['2rem', '2rem']}
      type="submit"
      aria-label={translate({ id: 'search', lang })}
    >
      <IconSearch16 color="grey-dark" />
    </Button>
  )
}

interface ClearButtonProps {
  onClick: () => void
}

const ClearButton = ({ onClick }: ClearButtonProps) => {
  const { lang } = useContext(LanguageContext)

  return (
    <Button
      size={['2rem', '2rem']}
      type="button"
      aria-label={translate({ id: 'clear', lang })}
      onClick={onClick}
    >
      <IconClear16 color="grey-dark" />
    </Button>
  )
}

export const SearchBar: React.FC<SearchBarProps> = ({
  onChange,
  hasDropdown = true,
}) => {
  const { getQuery, router, isInPath } = useRoute()
  const isSearch = isInPath('SEARCH')
  const q = getQuery('q')
  const type = getSearchType(getQuery('type'))
  const { lang } = useContext(LanguageContext)
  const [search, setSearch] = useState(q)
  const [debouncedSearch] = useDebounce(search, INPUT_DEBOUNCE)
  const textAriaLabel = translate({ id: 'search', lang })
  const textPlaceholder = translate({ id: 'search', lang })

  const searchTextInput = useRef<HTMLInputElement>(null)

  // dropdown
  const [showDropdown, setShowDropdown] = useState(false)
  const closeDropdown = () => setShowDropdown(false)
  const openDropdown = () => setShowDropdown(true)

  // quick result hotkeys
  const [data, setData] = useState<QuickResult>()
  const [activeItem, setActiveItem] = useState('input')
  const items = ['input']
  const { edges: userEdges } = data?.user || {}
  const { edges: tagEdges } = data?.tag || {}
  const hasUsers = userEdges && userEdges.length > 0
  const hasTags = tagEdges && tagEdges.length > 0

  if (hasUsers) {
    userEdges.map(({ cursor }, i) => {
      items.push(`user${cursor}`)
    })
  }
  if (hasTags) {
    tagEdges.map(({ cursor }, i) => {
      items.push(`tag${cursor}`)
    })
  }

  useNativeEventListener(
    'keydown',
    (e: { code: string; preventDefault: () => void }) => {
      if (e.code === 'ArrowUp') {
        if (!showDropdown) return

        e.preventDefault()
        const activeIndex = items.indexOf(activeItem)
        if (activeIndex === 0) return

        setActiveItem(items[activeIndex - 1])
      }

      if (e.code === 'ArrowDown') {
        if (!showDropdown) return

        e.preventDefault()
        const activeIndex = items.indexOf(activeItem)
        if (activeIndex === items.length - 1) return

        setActiveItem(items[activeIndex + 1])
      }

      if (e.code === 'Escape') {
        if (!showDropdown) return

        setShowDropdown(false)
      }
    },
    true
  )

  useEffect(() => {
    if (
      hasDropdown &&
      showDropdown &&
      searchTextInput.current &&
      activeItem === 'input'
    ) {
      searchTextInput.current.focus()
    }
  }, [activeItem])

  useEffect(() => {
    setSearch(q)
  }, [q])

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
          type,
        })

        if (isSearch) {
          router.replace(path.href)
        } else {
          router.push(path.href)
        }

        closeDropdown()
      }}
    >
      {({ values, setValues, handleSubmit, handleChange }) => {
        if (!hasDropdown) {
          return (
            <form
              onSubmit={handleSubmit}
              aria-label={textPlaceholder}
              role="search"
              autoComplete="off"
              action=""
            >
              <input
                type="search"
                name="q"
                ref={searchTextInput}
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
              {search.length > 0 && (
                <ClearButton
                  onClick={() => {
                    setValues({ q: '' })
                    setSearch('')
                  }}
                />
              )}

              <style jsx>{styles}</style>
            </form>
          )
        }

        return (
          <Dropdown
            content={
              debouncedSearch && (
                <SearchQuickResult
                  searchKey={debouncedSearch}
                  onUpdateData={(newData: QuickResult | undefined) => {
                    setData(newData)
                  }}
                  activeItem={activeItem}
                />
              )
            }
            trigger={undefined}
            appendTo={typeof window !== 'undefined' ? document.body : undefined}
            placement="bottom-start"
            onClickOutside={closeDropdown}
            visible={showDropdown}
            zIndex={Z_INDEX.OVER_GLOBAL_HEADER}
          >
            <form onSubmit={handleSubmit} autoComplete="off" action="">
              <input
                type="search"
                name="q"
                ref={searchTextInput}
                aria-label={textAriaLabel}
                placeholder={textPlaceholder}
                value={values.q}
                onChange={(e) => {
                  handleChange(e)
                  setSearch(e.target.value)
                  openDropdown()
                }}
                onFocus={openDropdown}
                onClick={openDropdown}
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
