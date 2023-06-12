import classNames from 'classnames'
import React, { useContext } from 'react'

import { translate } from '~/common/utils'
import { LanguageContext } from '~/components'

import styles from './styles.module.css'

interface Props {
  defaultValue?: string
  readOnly?: boolean
  update: (params: { title: any }) => void
}

const getValidTitleValue = (value: any, fallback: any): string => {
  return value && value !== fallback ? value : ''
}

const EditorTitle: React.FC<Props> = ({
  defaultValue = '',
  readOnly,
  update,
}) => {
  const { lang } = useContext(LanguageContext)
  const classes = classNames(
    [styles.editorTitle],
    readOnly ? 'u-area-disable' : ''
  )

  const [value, setValue] = React.useState(defaultValue)

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) =>
    setValue(event.target.value)

  const handleBlur = (event: React.FocusEvent<HTMLInputElement>) =>
    update({ title: value })

  React.useEffect(() => setValue(defaultValue), [defaultValue])

  return (
    <header className={classes}>
      <input
        type="text"
        aria-label={translate({
          en: 'Enter title ...',
          zh_hans: '请输入标题…',
          zh_hant: '請輸入標題…',
          lang,
        })}
        placeholder={translate({
          en: 'Enter title ...',
          zh_hans: '请输入标题…',
          zh_hant: '請輸入標題…',
          lang,
        })}
        onChange={handleChange}
        onBlur={handleBlur}
        value={getValidTitleValue(
          value,
          translate({
            en: 'Untitle',
            zh_hans: '未命名',
            zh_hant: '未命名',
            lang,
          })
        )}
      />
    </header>
  )
}

export default EditorTitle
