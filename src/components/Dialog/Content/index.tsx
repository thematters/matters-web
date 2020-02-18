import classNames from 'classnames'

import styles from './styles.css'

type SpacingX = 0 | '0' | 'base' | 'xloose' | 'xxxloose'
type SpacingY = 0 | '0' | 'base' | 'xloose' | 'xxxloose'

interface DialogContentProps {
  // Note: only apply in "sm-up" if the spacing is large than "base"
  spacing?: [SpacingX, SpacingY]
}

const DialogContent: React.FC<DialogContentProps> = ({
  spacing = ['base', 'base'],
  children
}) => {
  const contentClass = classNames({
    content: true,
    [`spacing-x-${spacing[0]}`]: true,
    [`spacing-y-${spacing[1]}`]: true
  })

  return (
    <section className={contentClass}>
      {children}

      <style jsx>{styles}</style>
    </section>
  )
}

export default DialogContent
