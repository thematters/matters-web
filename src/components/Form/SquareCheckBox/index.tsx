import classNames from 'classnames'
import { useId, useLayoutEffect, useRef, useState } from 'react'
import { useVisuallyHidden } from 'react-aria'

import IconSquare from '@/public/static/icons/24px/squire.svg'
import IconSquareCheck from '@/public/static/icons/24px/squire-check.svg'
import { Icon, TextIcon, Tooltip } from '~/components'

import { FieldProps } from '../Field'
import styles from './styles.module.css'

export type SquareCheckBoxBoxProps = {
  name: string
  value: string
  contents?: React.ReactNode

  icon?: React.ReactNode
  left?: React.ReactNode
  sup?: React.ReactNode
  supHeight?: number

  hasTooltip?: boolean
} & Omit<FieldProps, 'fieldMsgId'> &
  React.DetailedHTMLProps<
    React.InputHTMLAttributes<HTMLInputElement>,
    HTMLInputElement
  >

const SquareCheckBox: React.FC<SquareCheckBoxBoxProps> = ({
  contents,
  hint,

  icon,
  left,
  sup,
  supHeight,

  hasTooltip = false,

  ...inputProps
}) => {
  const { disabled, checked } = inputProps
  const fieldId = useId()
  const fieldMsgId = `${fieldId}-msg`

  const [lineClampable, setLineClampable] = useState(false)
  const [firstRender, setFirstRender] = useState(true)
  const node: React.RefObject<HTMLElement> | null = useRef(null)

  const { visuallyHiddenProps } = useVisuallyHidden()

  useLayoutEffect(() => {
    if (!node || !node.current) {
      return
    }
    let height = node.current.firstElementChild?.clientHeight || 0
    const computedStyle = window.getComputedStyle(node.current, null)
    height -=
      parseInt(computedStyle.paddingTop, 10) +
      parseInt(computedStyle.paddingBottom, 10) +
      (supHeight || 0)
    const lineHeight = computedStyle.getPropertyValue('line-height')
    const lines = Math.max(Math.ceil(height / parseInt(lineHeight, 10)), 0)
    if (lines > 1) {
      setLineClampable(true)
    }
    setFirstRender(false)
  }, [node.current])

  const labelClasses = classNames({
    [styles.label]: true,
    [styles.disabled]: disabled,
  })

  const hintClasses = classNames({
    [styles.hint]: true,
    [styles.lineClamp]: !firstRender,
  })

  const checkboxIcon = checked ? (
    <Icon
      icon={IconSquareCheck}
      size={20}
      color={disabled ? 'grey' : 'green'}
    />
  ) : (
    <Icon icon={IconSquare} size={20} color="greyDark" />
  )

  return (
    <Tooltip
      content={hint}
      appendTo="parent"
      zIndex={100}
      placement="auto-start"
      delay={[1000, null]}
      disabled={!hasTooltip || !lineClampable}
    >
      <section className={styles.wrapper} ref={node}>
        <label className={labelClasses}>
          <TextIcon spacing={8} size={14} icon={icon || checkboxIcon}>
            <section className={styles.content}>
              {sup}
              <span className={hintClasses}>
                {left}
                {contents || hint}
              </span>
            </section>
          </TextIcon>

          <input
            {...inputProps}
            id={fieldId}
            type="checkbox"
            aria-describedby={fieldMsgId}
            {...visuallyHiddenProps}
          />
        </label>
      </section>
    </Tooltip>
  )
}

export default SquareCheckBox
