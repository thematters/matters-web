import { VisuallyHidden } from '@reach/visually-hidden'
import { useField } from 'formik'

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

  const Content = (
    <label className={styles.label}>
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
        <span className={styles.hint}>
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
      {hasTooltip && (
        <Tooltip
          content={hint}
          appendTo="parent"
          zIndex={100}
          placement="auto-start"
          delay={[1000, null]}
        >
          {Content}
        </Tooltip>
      )}
      {!hasTooltip && <>{Content}</>}
    </>
  )
}

export default SquareCheckBox
