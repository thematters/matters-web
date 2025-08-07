// https://dev.to/zechdc/autosize-input-field-plain-js-and-react-examples-38kb
// https://github.com/JedWatson/react-input-autosize/issues/196

import styles from './styles.module.css'

interface InputAutosizeProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  value: string
}

export default function InputAutosize({ value, ...props }: InputAutosizeProps) {
  return (
    <span className={styles.autosize} data-value={value}>
      <input type="text" value={value} {...props} />
    </span>
  )
}
