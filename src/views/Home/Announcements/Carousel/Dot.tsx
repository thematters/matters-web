import classnames from 'classnames'

import styles from './styles.css'

interface Props {
  index: number
  scroll: (index: number) => void
  selected: boolean
}

const Dot = ({ index, scroll, selected }: Props) => {
  const dotClasses = classnames({ dot: true, selected })
  return (
    <>
      <div
        className={dotClasses}
        aria-role="button"
        onClick={() => scroll(index)}
      />
      <style jsx>{styles}</style>
    </>
  )
}

export default Dot
