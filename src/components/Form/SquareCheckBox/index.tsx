import { VisuallyHidden } from '@reach/visually-hidden'
import classNames from 'classnames'
import { useField } from 'formik'
import { useEffect, useRef, useState } from 'react'

import { IconSquireCheck20, IconSquireChecked20, Tooltip } from '~/components'
import { TextIcon } from '~/components/TextIcon'

import { FieldProps } from '../Field'
import styles from './styles.module.css'

type SquareCheckBoxBoxProps = {
  name: string
  value: string
  content?: React.ReactNode
  hasTooltip?: boolean
} & Omit<FieldProps, 'fieldMsgId'> &
  React.DetailedHTMLProps<
    React.InputHTMLAttributes<HTMLInputElement>,
    HTMLInputElement
  >

const SquareCheckBox: React.FC<SquareCheckBoxBoxProps> = ({
  hint,
  error,
  hasTooltip = false,
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

  useEffect(() => {
    setTimeout(() => {
      if (node?.current) {
        let height = node.current.firstElementChild?.clientHeight || 0
        const computedStyle = window.getComputedStyle(node.current, null)
        height -=
          parseInt(computedStyle.paddingTop, 10) +
          parseInt(computedStyle.paddingBottom, 10)
        const lineHeight = computedStyle.getPropertyValue('line-height')
        const lines = Math.max(Math.ceil(height / parseInt(lineHeight, 10)), 0)
        if (lines > 1) {
          setLineClampable(true)
        }
      }
      setFirstRender(false)
    })
  }, [])

  const labelClasses = classNames({
    [styles.label]: true,
    [styles.disabled]: disabled,
  })

  const hintClasses = classNames({
    [styles.hint]: true,
    [styles.lineClamp]: !firstRender,
  })

  const Content = (
    <label className={labelClasses}>
      <TextIcon
        icon={
          inputProps.checked ? (
            <IconSquireChecked20
              size="mdS"
              color={disabled ? 'grey' : 'green'}
            />
          ) : (
            <IconSquireCheck20 size="mdS" color="greyDark" />
          )
        }
        color={disabled ? 'grey' : 'black'}
        spacing="xtight"
        size="sm"
      >
        <span className={hintClasses}>
          {!!content && content}
          {!content && hint}
        </span>
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
  )

  return (
    <>
      {(!lineClampable || !hasTooltip) && (
        <p ref={node} className={styles.wrapper}>
          {Content}
        </p>
      )}
      {hasTooltip && lineClampable && (
        <Tooltip
          content={hint}
          appendTo="parent"
          zIndex={100}
          placement="auto-start"
          delay={[1000, null]}
        >
          <p className={styles.wrapper}>{Content}</p>
        </Tooltip>
      )}
    </>
  )
}

export default SquareCheckBox
