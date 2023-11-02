import { VisuallyHidden } from '@reach/visually-hidden'
import classNames from 'classnames'
import { useField } from 'formik'
import { useLayoutEffect, useRef, useState } from 'react'

import {
  IconSquireCheck20,
  IconSquireChecked20,
  TextIcon,
  Tooltip,
} from '~/components'

import { FieldProps } from '../Field'
import styles from './styles.module.css'

type SquareCheckBoxBoxProps = {
  name: string
  value: string
  content?: React.ReactNode

  icon?: React.ReactNode
  sup?: React.ReactNode
  supHeight?: number

  hasTooltip?: boolean
} & Omit<FieldProps, 'fieldMsgId'> &
  React.DetailedHTMLProps<
    React.InputHTMLAttributes<HTMLInputElement>,
    HTMLInputElement
  >

const SquareCheckBox: React.FC<SquareCheckBoxBoxProps> = ({
  content,
  error,
  hint,

  icon,
  sup,
  supHeight,

  hasTooltip = false,

  ...inputProps
}) => {
  const { value, disabled, checked } = inputProps
  const fieldId = `field-${value}`
  const fieldMsgId = `field-msg-${value}`

  const [field] = useField({ ...inputProps, type: 'checkbox' })

  const [lineClampable, setLineClampable] = useState(false)
  const [firstRender, setFirstRender] = useState(true)
  const node: React.RefObject<any> | null = useRef(null)

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
  }, [])

  const labelClasses = classNames({
    [styles.label]: true,
    [styles.disabled]: disabled,
  })

  const hintClasses = classNames({
    [styles.hint]: true,
    [styles.lineClamp]: !firstRender,
  })

  const checkboxIcon =
    icon || checked ? (
      <IconSquireChecked20 size="mdS" color={disabled ? 'grey' : 'green'} />
    ) : (
      <IconSquireCheck20 size="mdS" color="greyDark" />
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
          <TextIcon spacing="xtight" size="sm" icon={checkboxIcon}>
            <section className={styles.content}>
              {sup}
              <span className={hintClasses}>{content || hint}</span>
            </section>
          </TextIcon>

          <VisuallyHidden>
            <input
              id={fieldId}
              type="checkbox"
              aria-describedby={fieldMsgId}
              {...field}
              {...inputProps}
            />
          </VisuallyHidden>
        </label>
      </section>
    </Tooltip>
  )
}

export default SquareCheckBox
