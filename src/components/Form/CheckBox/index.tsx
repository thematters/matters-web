import { Icon } from '~/components'

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
}) => {
  return (
    <section className="container">
      <label className="check" htmlFor="checkbox">
        {inputProps.checked ? (
          <Icon.CheckActive size="sm" />
        ) : (
          <Icon.CheckInactive size="sm" />
        )}

        <input id="checkbox" type="checkbox" name={name} {...inputProps} />

        <div className="hint">{hint}</div>
      </label>

      <footer>{error && !hint && <div className="error">{error}</div>}</footer>

      <style jsx>{styles}</style>
    </section>
  )
}

export default CheckBox
