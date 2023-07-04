import { VisuallyHidden } from '@reach/visually-hidden'
import { useField } from 'formik'

import { IconSquireCheck20, IconSquireChecked20, Tooltip } from '~/components'
import { TextIcon } from '~/components/TextIcon'

import { FieldProps } from '../Field'
import styles from './styles.module.css'

type SquireCheckBoxProps = {
  name: string
  value: string
} & Omit<FieldProps, 'fieldMsgId'> &
  React.DetailedHTMLProps<
    React.InputHTMLAttributes<HTMLInputElement>,
    HTMLInputElement
  >

const SquireCheckBox: React.FC<SquireCheckBoxProps> = ({
  // name,
  // value,

  hint,
  error,

  ...inputProps
}) => {
  const fieldId = `field-${name}`
  const fieldMsgId = `field-msg-${name}`
  const disabled = inputProps.disabled

  const [field] = useField({ ...inputProps, type: 'checkbox' })

  return (
    <>
      {/* FIXME: tooltip in dialog */}
      <Tooltip content={hint}>
        <label className={styles.label} title={`${hint}`}>
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
            <span className={styles.hint}>{hint}</span>
          </TextIcon>

          <VisuallyHidden>
            {/* <FieldFormik
              id={fieldId}
              type="checkbox"
              aria-describedby={fieldMsgId}
              name={name}
              value={value}
              {...inputProps}
            /> */}
            <input
              id={fieldId}
              type="checkbox"
              aria-describedby={fieldMsgId}
              {...field}
              {...inputProps}
            />
          </VisuallyHidden>
        </label>
      </Tooltip>
    </>
  )
}

export default SquireCheckBox
