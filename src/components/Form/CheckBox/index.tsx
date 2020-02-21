import VisuallyHidden from '@reach/visually-hidden'

import { Icon } from '~/components'
import { TextIcon } from '~/components/TextIcon'

import Field, { FieldProps } from '../Field'
import styles from './styles.css'

type CheckBoxProps = {
  name: string
} & FieldProps &
  React.DetailedHTMLProps<
    React.InputHTMLAttributes<HTMLInputElement>,
    HTMLInputElement
  >

const CheckBox: React.FC<CheckBoxProps> = ({
  name,

  hint,
  error,

  ...inputProps
}) => (
  <Field>
    <label htmlFor="checkbox">
      <TextIcon
        icon={
          inputProps.checked ? (
            <Icon.CheckActive size="md-s" />
          ) : (
            <Icon.CheckInactive size="md-s" />
          )
        }
        color="grey-dark"
        spacing="xtight"
      >
        {hint}
      </TextIcon>

      <VisuallyHidden>
        <input id="checkbox" type="checkbox" name={name} {...inputProps} />
      </VisuallyHidden>
    </label>

    <Field.Footer error={error} />

    <style jsx>{styles}</style>
  </Field>
)

export default CheckBox
