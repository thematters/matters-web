import { VisuallyHidden } from '@reach/visually-hidden'
import classNames from 'classnames'
import { useField } from 'formik'
import { useLayoutEffect, useRef, useState } from 'react'

import {
  DateTime,
  IconSquireCheck20,
  IconSquireChecked20,
  Tooltip,
} from '~/components'
import { TextIcon } from '~/components/TextIcon'

import { FieldProps } from '../Field'
import styles from './styles.module.css'

type IndexSquareCheckBoxBoxProps = {
  name: string
  value: string
  index: number
  createAt: any
  content?: React.ReactNode
  hasTooltip?: boolean
} & Omit<FieldProps, 'fieldMsgId'> &
  React.DetailedHTMLProps<
    React.InputHTMLAttributes<HTMLInputElement>,
    HTMLInputElement
  >

const IndexSquareCheckBox: React.FC<IndexSquareCheckBoxBoxProps> = ({
  hint,
  error,
  hasTooltip = false,
  index,
  createAt,
  content,

  ...inputProps
}) => {
  const fieldId = `field-${inputProps.value}`
  const fieldMsgId = `field-msg-${inputProps.value}`
  const disabled = inputProps.disabled

  const [field] = useField({ ...inputProps, type: 'checkbox' })

  const [lineClampable, setLineClampable] = useState(false)
  const [firstRender, setFirstRender] = useState(true)
  const node: React.RefObject<any> | null = useRef(null)

  useLayoutEffect(() => {
    if (!node || !node.current) {
      return
    }
    let height = node.current.firstElementChild?.clientHeight || 0
    console.log({ height }, node.current.firstElementChild)
    const computedStyle = window.getComputedStyle(node.current, null)
    const dateHeight = 18
    height -=
      parseInt(computedStyle.paddingTop, 10) +
      parseInt(computedStyle.paddingBottom, 10) +
      dateHeight
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

  const checked = inputProps.checked

  const Content = (
    <section className={styles.content}>
      <DateTime date={createAt} color="grey" />
      <span className={hintClasses}>
        {!!content && content}
        {!content && hint}
      </span>
    </section>
  )

  return (
    <>
      <Tooltip
        content={hint}
        appendTo="parent"
        zIndex={100}
        placement="auto-start"
        delay={[1000, null]}
        disabled={!hasTooltip || !lineClampable}
      >
        <p className={styles.wrapper} ref={node}>
          <label className={labelClasses}>
            {checked && disabled && (
              <TextIcon
                icon={<IconSquireChecked20 size="mdS" color="grey" />}
                color="grey"
                spacing="xtight"
                size="sm"
              >
                {Content}
              </TextIcon>
            )}
            {checked && !disabled && index !== undefined && (
              <TextIcon
                icon={<span className={styles.index}>{index}</span>}
                color="grey"
                spacing="xtight"
                size="sm"
              >
                {Content}
              </TextIcon>
            )}
            {!checked && (
              <TextIcon
                icon={<IconSquireCheck20 size="mdS" color="greyDark" />}
                color="black"
                spacing="xtight"
                size="sm"
              >
                {Content}
              </TextIcon>
            )}
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
        </p>
      </Tooltip>
    </>
  )
}

export default IndexSquareCheckBox
