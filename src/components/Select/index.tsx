import Option from './Option'
import styles from './styles.css'

export const Select: React.FC & { Option: typeof Option } = ({ children }) => {
  return (
    <ul role="listbox">
      {children}
      <style jsx>{styles}</style>
    </ul>
  )
}

Select.Option = Option
