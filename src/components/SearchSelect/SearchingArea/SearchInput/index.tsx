import { Formik } from 'formik'
import { useContext, useId } from 'react'
import { useVisuallyHidden } from 'react-aria'
import { useIntl } from 'react-intl'

import IconMinus from '@/public/static/icons/24px/minus.svg'
import IconNavSearch from '@/public/static/icons/24px/nav-search.svg'
import { translate } from '~/common/utils'
import { Icon, LanguageContext } from '~/components'

import styles from './styles.module.css'

export type SearchType = 'Article' | 'Tag' | 'User' | 'Invitee'

export interface SearchInputProps {
  type: SearchType
  value: string
  onChange: (value: string) => void
  onSubmit: (value: string) => void
  onFocus?: () => void
  onBlur?: () => void
  autoFocus?: boolean
}

const SearchInput: React.FC<SearchInputProps> = ({
  type,
  value,
  onChange,
  onSubmit,
  onFocus,
  onBlur,
  autoFocus,
}) => {
  const fieldId = useId()
  const { lang } = useContext(LanguageContext)
  const intl = useIntl()
  const { visuallyHiddenProps } = useVisuallyHidden()

  const textAriaLabel = intl.formatMessage({
    defaultMessage: 'Search',
    id: 'xmcVZ0',
  })
  const textPlaceholder = {
    Article: translate({
      zh_hant: '輸入作品標題或貼上作品連結',
      zh_hans: '输入作品标题或贴上作品连结',
      en: 'Enter article title or paste article link',
      lang,
    }),
    Tag: translate({
      zh_hant: '搜尋標籤',
      zh_hans: '搜索标签',
      en: 'Search tags',
      lang,
    }),
    User: translate({
      zh_hant: '搜尋作者',
      zh_hans: '搜索作者',
      en: 'Search authors',
      lang,
    }),
    Invitee: translate({
      zh_hant: '搜尋名稱、Matters ID，站外請輸入電子信箱',
      zh_hans: '搜寻名称、Matters ID，站外请输入电子信箱',
      en: 'Search users, or enter email',
      lang,
    }),
  }

  return (
    <Formik
      initialValues={{ q: '' }}
      enableReinitialize
      onSubmit={(values) => {
        onSubmit(values.q)
      }}
    >
      {({ values, setValues, handleSubmit, handleChange }) => {
        return (
          <form
            className={styles.form}
            onSubmit={handleSubmit}
            role="search"
            autoComplete="off"
            action=""
          >
            <label htmlFor={fieldId} {...visuallyHiddenProps}>
              {textAriaLabel}
            </label>

            <input
              id={fieldId}
              type="search"
              name="q"
              autoCorrect="off"
              autoFocus={!!autoFocus}
              value={values.q}
              aria-label={textAriaLabel}
              placeholder={textPlaceholder[type]}
              onChange={(e) => {
                handleChange(e)
                onChange(e.target.value)
              }}
              onFocus={() => {
                onFocus?.()
              }}
              onBlur={() => {
                onBlur?.()
              }}
            />

            <button
              className={styles.search}
              type="submit"
              aria-label={textAriaLabel}
            >
              <Icon icon={IconNavSearch} color="green" />
            </button>

            {value && (
              <button
                className={styles.clear}
                type="button"
                aria-label={intl.formatMessage({
                  defaultMessage: 'Clear',
                  id: '/GCoTA',
                })}
                onClick={() => {
                  onChange('')
                  setValues({ q: '' })
                }}
              >
                <Icon icon={IconMinus} color="grey" />
              </button>
            )}
          </form>
        )
      }}
    </Formik>
  )
}

export default SearchInput
