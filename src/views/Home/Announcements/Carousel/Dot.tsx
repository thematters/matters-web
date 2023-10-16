import classnames from 'classnames'

import styles from './styles.module.css'

interface Props {
  index: number
  scroll: (index: number) => void
  selected: boolean
}

const Dot = ({ index, scroll, selected }: Props) => {
  const dotClasses = classnames({
    [styles.dot]: true,
    [styles.selected]: selected,
  })

  return (
    <>
      <div
        className={dotClasses}
        role="button"
        aria-label={`${index + 1}`}
        onClick={() => scroll(index)}
      />
    </>
  )
}

export default Dot
