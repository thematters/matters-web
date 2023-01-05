import { Formik } from 'formik'
import React, { useContext, useEffect, useRef, useState } from 'react'
import { useDebounce } from 'use-debounce'

import { INPUT_DEBOUNCE, MAX_SEARCH_KEY_LENGTH, Z_INDEX } from '~/common/enums'
import { getSearchType, toPath, translate } from '~/common/utils'
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
import { QuickResultQuery } from '~/gql/graphql'

import styles from './styles.css'

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
  const isInSearch = isInPath('SEARCH')
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
  const [data, setData] = useState<QuickResultQuery>()
  const [activeItem, setActiveItem] = useState('input')
  const resetActiveItem = () => setActiveItem('input')
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
          q: encodeURIComponent(values.q.slice(0, MAX_SEARCH_KEY_LENGTH)),
          type,
        })

        if (values.q.length <= 0) return

        searchTextInput.current?.blur()

        if (isInSearch) {
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
                maxLength={MAX_SEARCH_KEY_LENGTH}
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
              !isInSearch &&
              debouncedSearch && (
                <SearchQuickResult
                  searchKey={debouncedSearch}
                  onUpdateData={(newData: QuickResultQuery | undefined) => {
                    setData(newData)
                  }}
                  closeDropdown={() => {
                    closeDropdown()

                    // clear input
                    setValues({ q: '' })
                    setSearch('')
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
                  resetActiveItem()
                  openDropdown()
                }}
                onFocus={openDropdown}
                onClick={openDropdown}
                maxLength={MAX_SEARCH_KEY_LENGTH}
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
