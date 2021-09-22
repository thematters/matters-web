import classNames from 'classnames'
import { useContext } from 'react'

import {
  IconChecked,
  IconMultiCheck,
  IconMultiChecked,
  IconSort16,
  IconUnChecked,
  LanguageContext,
} from '~/components'

import { translate } from '~/common/utils'

import styles from './styles.css'

type OperationItemProps = {
  type: 'drag' | 'multi-select' | 'select'
  selected: boolean
}

const OperationItem: React.FC<OperationItemProps> = ({
  type,
  selected,
  children,
}) => {
  const { lang } = useContext(LanguageContext)

  const itemClasses = classNames({
    item: true,
  })

  const isDrag = type === 'drag'
  const isSelect = type === 'select'
  const isMultiSelect = type === 'multi-select'

  return (
    <section className={itemClasses}>
      {isDrag && (
        <span
          aria-label={translate({
            zh_hant: '拖拽',
            zh_hans: '拖拽',
            en: 'Drag',
            lang,
          })}
        >
          <IconSort16 color="grey-light" />
        </span>
      )}

      {(isSelect || isMultiSelect) && (
        <button
          type="button"
          onClick={() => console.log('isSelect: ', !selected)}
          aria-label={translate(
            selected
              ? {
                  zh_hant: '取消選中',
                  zh_hans: '取消选中',
                  en: 'Unselect',
                  lang,
                }
              : {
                  zh_hant: '選中',
                  zh_hans: '选中',
                  en: 'Select',
                  lang,
                }
          )}
        >
          {isMultiSelect && !selected && <IconMultiCheck size="md-s" />}
          {isMultiSelect && selected && <IconMultiChecked size="md-s" />}
          {isSelect && !selected && <IconUnChecked size="md-s" />}
          {isSelect && selected && <IconChecked size="md-s" />}
        </button>
      )}

      {children}

      <style jsx>{styles}</style>
    </section>
  )
}

export default OperationItem
