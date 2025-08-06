// https://dev.to/zechdc/autosize-input-field-plain-js-and-react-examples-38kb
// https://github.com/JedWatson/react-input-autosize/issues/196

import styles from './styles.module.css'

interface InputAutosizeProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  value: string
}

export default function InputAutosize({
  value,
  placeholder,
  ...props
}: InputAutosizeProps) {
  // Use placeholder text for width calculation when value is empty
  const displayValue = value || placeholder || ''

  return (
    <span className={styles.autosize} data-value={displayValue}>
      <input type="text" value={value} placeholder={placeholder} {...props} />
    </span>
  )
}
