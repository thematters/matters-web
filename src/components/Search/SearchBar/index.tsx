import dynamic from 'next/dynamic'
import { useEffect, useRef, useState } from 'react'
import { useIntl } from 'react-intl'
import { useDebounce } from 'use-debounce'

import IconNavSearch from '@/public/static/icons/24px/nav-search.svg'
import IconTimes from '@/public/static/icons/24px/times.svg'
import {
  INPUT_DEBOUNCE,
  KEYVALUE,
  MAX_SEARCH_KEY_LENGTH,
  Z_INDEX,
} from '~/common/enums'
import { getSearchType, toPath } from '~/common/utils'
import {
  Button,
  Dropdown,
  Icon,
  SearchQuickResult,
  useNativeEventListener,
  useRoute,
} from '~/components'
import { QuickResultQuery } from '~/gql/graphql'

import styles from './styles.module.css'

interface SearchBarProps {
  onChange?: (key: string) => void
  hasDropdown?: boolean
}

const DynamicFormik = dynamic(
  () => import('formik').then((mod) => mod.Formik),
  {
    ssr: true, // enable for first screen
  }
)

const SearchButton = () => {
  const intl = useIntl()
  return (
    <Button
      type="submit"
      aria-label={intl.formatMessage({
        defaultMessage: 'Search',
        id: 'xmcVZ0',
      })}
    >
      <Icon icon={IconNavSearch} color="greyDark" size={22} />
    </Button>
  )
}

interface ClearButtonProps {
  onClick: () => void
}

const ClearButton = ({ onClick }: ClearButtonProps) => {
  const intl = useIntl()

  return (
    <Button
      size={['2rem', '2rem']}
      type="button"
      aria-label={intl.formatMessage({ defaultMessage: 'Clear', id: '/GCoTA' })}
      onClick={onClick}
    >
      <Icon icon={IconTimes} color="greyDark" />
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
  const [search, setSearch] = useState(q)
  const [debouncedSearch] = useDebounce(search, INPUT_DEBOUNCE)
  const intl = useIntl()

  const textAriaLabel = intl.formatMessage({
    defaultMessage: 'Search',
    id: 'xmcVZ0',
  })
  const textPlaceholder = intl.formatMessage({
    defaultMessage: 'Search',
    id: 'xmcVZ0',
  })

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

  useNativeEventListener('keydown', (event: KeyboardEvent) => {
    if (event.code?.toLowerCase() === KEYVALUE.arrowUp) {
      if (!showDropdown) return

      event.preventDefault()
      const activeIndex = items.indexOf(activeItem)
      if (activeIndex === 0) return

      setActiveItem(items[activeIndex - 1])
    }

    if (event.code?.toLowerCase() === KEYVALUE.arrowDown) {
      if (!showDropdown) return

      event.preventDefault()
      const activeIndex = items.indexOf(activeItem)
      if (activeIndex === items.length - 1) return

      setActiveItem(items[activeIndex + 1])
    }

    if (event.code?.toLowerCase() === KEYVALUE.escape) {
      if (!showDropdown) return

      setShowDropdown(false)
    }
  })

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
    <DynamicFormik
      initialValues={{ q }}
      enableReinitialize
      onSubmit={(values) => {
        const path = toPath({
          page: 'search',
          q: values.q.slice(0, MAX_SEARCH_KEY_LENGTH),
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
              className={styles.form}
              onSubmit={handleSubmit}
              aria-label={textPlaceholder}
              role="search"
              autoComplete="off"
              action=""
            >
              <input
                // FIMXME: FOUC on re-render
                style={{ borderColor: 'var(--color-line-grey-light)' }}
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
            </form>
          )
        }

        return (
          <Dropdown
            focusLock={false}
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
            placement="bottom-start"
            onClickOutside={closeDropdown}
            visible={showDropdown}
            zIndex={Z_INDEX.OVER_GLOBAL_HEADER}
          >
            {({ ref }) => (
              <form
                className={styles.form}
                onSubmit={handleSubmit}
                autoComplete="off"
                action=""
                ref={ref}
              >
                <input
                  // FIMXME: FOUC on re-render
                  style={{ borderColor: 'var(--color-line-grey-light)' }}
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
              </form>
            )}
          </Dropdown>
        )
      }}
    </DynamicFormik>
  )
}
