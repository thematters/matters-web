import styles from './styles.module.css'

interface SpacerProps {
  size?:
    | 'sp4'
    | 'sp8'
    | 'sp16'
    | 'sp20'
    | 'sp24'
    | 'sp32'
    | 'sp40'
    | 'sp44'
    | 'sp64'
}

export const Spacer: React.FC<SpacerProps> = ({ size = 'sp24' }) => (
  <div className={styles[size]} aria-hidden></div>
)
