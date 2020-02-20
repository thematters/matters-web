import VisuallyHidden from '@reach/visually-hidden'

import { Icon } from '~/components'
import { TextIcon } from '~/components/TextIcon'

import styles from './styles.css'

type CheckBoxProps = {
  name: string

  error?: string | React.ReactNode
  hint?: string | React.ReactNode

  extraButton?: React.ReactNode
} & React.DetailedHTMLProps<
  React.InputHTMLAttributes<HTMLInputElement>,
  HTMLInputElement
>

const CheckBox: React.FC<CheckBoxProps> = ({
  name,

  error,
  hint,

  ...inputProps
}) => (
  <section className="container">
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

    <footer>{error && <div className="error">{error}</div>}</footer>

    <style jsx>{styles}</style>
  </section>
)

export default CheckBox
