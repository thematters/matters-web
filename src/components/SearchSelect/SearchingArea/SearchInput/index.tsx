import VisuallyHidden from '@reach/visually-hidden'
import { useContext } from 'react'

import { translate } from '~/common/utils'
import { IconClear16, IconSearch16, LanguageContext } from '~/components'

import styles from './styles.css'

export type SearchType = 'Article' | 'Tag' | 'User' | 'Invitee'

interface SearchInputProps {
  type: SearchType
  value: string
  onChange: (value: string) => void
  onSubmit: (value: string) => void
  onFocus: () => void
  onBlur: () => void
}

const SearchInput: React.FC<SearchInputProps> = ({
  type,
  value,
  onChange,
  onSubmit,
  onFocus,
  onBlur,
}) => {
  const fieldId = `search-input-${type}`.toLocaleLowerCase()
  const { lang } = useContext(LanguageContext)
  const textAriaLabel = translate({ id: 'search', lang })
  const textPlaceholder = {
    Article: translate({
      zh_hant: '搜尋作品標題…',
      zh_hans: '搜索作品标题…',
      en: 'Search articles...',
      lang,
    }),
    Tag: translate({
      zh_hant: '搜尋標籤…',
      zh_hans: '搜索标签…',
      en: 'Search tags...',
      lang,
    }),
    User: translate({
      zh_hant: '搜尋作者…',
      zh_hans: '搜索作者…',
      en: 'Search authors...',
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
    <section>
      <form
        onSubmit={(e) => {
          onSubmit(value)
          e.preventDefault()
        }}
        autoComplete="off"
      >
        <VisuallyHidden>
          <label htmlFor={fieldId}>{textAriaLabel}</label>
        </VisuallyHidden>

        <input
          id={fieldId}
          type="search"
          name="q"
          value={value}
          aria-label={textAriaLabel}
          placeholder={textPlaceholder[type]}
          onChange={(e) => {
            onChange(e.target.value)
          }}
          onFocus={() => {
            onFocus()
          }}
          onBlur={() => {
            onBlur()
          }}
        />

        <button
          className="search"
          type="submit"
          aria-label={translate({ id: 'search', lang })}
        >
          <IconSearch16 color="grey" />
        </button>

        {value && (
          <button
            className="clear"
            type="button"
            aria-label={translate({ id: 'clear', lang })}
            onClick={() => onChange('')}
          >
            <IconClear16 color="grey" />
          </button>
        )}
      </form>

      <style jsx>{styles}</style>
    </section>
  )
}

export default SearchInput
