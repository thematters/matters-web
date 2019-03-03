import styles from './styles.css'

export const Switch = ({
  onChange,
  checked
}: {
  onChange: () => void
  checked: boolean
}) => {
  return (
    <label className="switch">
      <input type="checkbox" onChange={onChange} checked={checked} />
      <span />
      <style jsx>{styles}</style>
    </label>
  )
}
