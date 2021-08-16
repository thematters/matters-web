import classnames from 'classnames'

import styles from './styles.css'

interface DotProps {
  index: number
  scroll: (index: number) => void
  selected: boolean
}

const Dot = ({ index, scroll, selected }: DotProps) => {
  const dotClasses = classnames({ dot: true, selected })
  return (
    <>
      <div className={dotClasses} onClick={() => scroll(index)} />
      <style jsx>{styles}</style>
    </>
  )
}

export default Dot
