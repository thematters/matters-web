import styles from './styles.module.css'

interface SpacerProps {
  size?: 'xtight' | 'base' | 'loose' | 'xloose' | 'xxloose' | 'xxxloose'
}

export const Spacer: React.FC<SpacerProps> = ({ size = 'loose' }) => (
  <div className={size} aria-hidden></div>
)
