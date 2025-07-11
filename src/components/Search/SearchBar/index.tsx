import { FormikValues } from 'formik'
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
  setShowSearchQuickResult?: (show: boolean) => void
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
      <Icon icon={IconNavSearch} color="greyDark" size={16} />
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
      <Icon icon={IconTimes} color="greyDark" size={14} />
    </Button>
  )
}

export const SearchBar: React.FC<SearchBarProps> = ({
  onChange,
  hasDropdown = true,
  setShowSearchQuickResult,
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

  const handleKeyDown = (event: KeyboardEvent) => {
    // skip if current focus is on another input element,
    const target = event.target as HTMLElement
    if (
      target.tagName.toLowerCase() === 'input' ||
      target.tagName.toLowerCase() === 'textarea' ||
      target.contentEditable === 'true'
    ) {
      return
    }

    if (event.key === KEYVALUE.slash) {
      if (document.activeElement === searchTextInput.current) {
        return
      }

      event.preventDefault()
      searchTextInput.current?.focus()
      // set cursor to the end
      searchTextInput.current?.setSelectionRange(
        searchTextInput.current.value.length,
        searchTextInput.current.value.length
      )
    }
  }

  useNativeEventListener('keydown', handleKeyDown)

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
    userEdges.map(({ cursor }) => {
      items.push(`user${cursor}`)
    })
  }
  if (hasTags) {
    tagEdges.map(({ cursor }) => {
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

  const handleFormSubmit = (values: FormikValues) => {
    const path = toPath({
      page: 'search',
      q: (values.q as string).slice(0, MAX_SEARCH_KEY_LENGTH),
      type,
    })

    if ((values.q as string).length <= 0) return

    searchTextInput.current?.blur()

    if (isInSearch) {
      router.replace(path.href)
    } else {
      router.push(path.href)
    }

    closeDropdown()
  }

  const renderSearchQuickResult = (inPage = false) => (
    <SearchQuickResult
      searchKey={debouncedSearch}
      onUpdateData={(newData: QuickResultQuery | undefined) => {
        setData(newData)
      }}
      closeDropdown={() => {
        closeDropdown()
        // clear input
        if (setValues) {
          setValues({ q: '' })
        }
        setSearch('')
      }}
      activeItem={activeItem}
      inPage={inPage}
      itemHorizontalSpacing={inPage ? 0 : undefined}
      setShowSearchQuickResult={setShowSearchQuickResult}
    />
  )

  let setValues: ((values: FormikValues) => void) | undefined

  const renderForm = (
    formProps: {
      values: FormikValues
      handleSubmit: (e?: React.FormEvent<HTMLFormElement>) => void
      handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void
      setValues: (values: FormikValues) => void
    },
    ref?: React.Ref<HTMLFormElement>
  ) => {
    const { values, handleSubmit, handleChange } = formProps
    setValues = formProps.setValues

    return (
      <form
        className={styles.form}
        onSubmit={handleSubmit}
        aria-label={textPlaceholder}
        role={!hasDropdown ? 'search' : undefined}
        autoComplete="off"
        action=""
        ref={ref}
      >
        <input
          style={{ borderColor: 'var(--color-grey-lighter)' }}
          type="search"
          name="q"
          ref={searchTextInput}
          aria-label={textAriaLabel}
          placeholder={textPlaceholder}
          autoCorrect="off"
          onChange={(e) => {
            handleChange(e)
            setSearch(e.target.value)
            if (hasDropdown) {
              resetActiveItem()
              openDropdown()
            }
          }}
          onFocus={hasDropdown ? openDropdown : undefined}
          onClick={hasDropdown ? openDropdown : undefined}
          value={values.q as string}
          maxLength={MAX_SEARCH_KEY_LENGTH}
        />

        <SearchButton />

        {search.length > 0 && (
          <ClearButton
            onClick={() => {
              formProps.setValues({ q: '' })
              setSearch('')
            }}
          />
        )}
      </form>
    )
  }

  return (
    <DynamicFormik
      initialValues={{ q }}
      enableReinitialize
      onSubmit={handleFormSubmit}
    >
      {(formProps) => {
        if (!hasDropdown) {
          return (
            <>
              {renderForm(formProps)}
              {!q && (
                <section className={styles.searchQuickResult}>
                  {renderSearchQuickResult(true)}
                </section>
              )}
            </>
          )
        }

        return (
          <Dropdown
            focusLock={false}
            content={debouncedSearch && renderSearchQuickResult()}
            trigger={undefined}
            placement="bottom-start"
            onClickOutside={closeDropdown}
            visible={showDropdown}
            zIndex={Z_INDEX.OVER_STICKY_TABS}
          >
            {({ ref }) => renderForm(formProps, ref)}
          </Dropdown>
        )
      }}
    </DynamicFormik>
  )
}
