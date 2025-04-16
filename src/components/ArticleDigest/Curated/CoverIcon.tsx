import styles from './styles.module.css'

const CoverIcon = ({ title }: { title: string }) => {
  const titleLength = title.length
  const hValue = Math.round((titleLength / 100) * 360)
  const layer1Color = `hsl(${hValue}, 50%, 90%)`
  const layer2Color = `hsl(${hValue}, 50%, 95%)`
  const layer3Color = `hsl(${hValue}, 50%, 90%)`
  const layer4Color = `hsl(${hValue}, 50%, 80%)`
  const layer5Color = `hsl(${hValue}, 50%, 85%)`
  const layer6Color = `hsl(${hValue}, 50%, 80%)`

  return (
    <div className={styles.coverIcon}>
      <svg
        width="219"
        height="219"
        viewBox="0 0 219 219"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <g clip-path="url(#clip0_4780_19260)">
          <path d="M218.667 0H0V218.663H218.667V0Z" fill={layer1Color} />
          <path
            d="M0 19.0587L113.707 68.2229L218.667 55.1031V218.663H0V19.0587Z"
            fill={layer2Color}
          />
          <path
            d="M218.667 94.4625V218.663H0V124.201L218.667 94.4625Z"
            fill={layer3Color}
          />
          <path
            d="M65.6002 135.571C78.1599 135.571 88.3415 125.39 88.3415 112.83C88.3415 100.271 78.1599 90.0892 65.6002 90.0892C53.0405 90.0892 42.8589 100.271 42.8589 112.83C42.8589 125.39 53.0405 135.571 65.6002 135.571Z"
            fill={layer4Color}
          />
          <path
            d="M0 143.207L141.696 94.4625L218.667 137.382V218.663H0V143.207Z"
            fill={layer5Color}
          />
          <path
            d="M141.696 94.4625L74.5654 218.663H218.667V137.32L141.696 94.4625Z"
            fill={layer6Color}
          />
        </g>
        <defs>
          <clipPath id="clip0_4780_19260">
            <rect width="218.667" height="218.663" rx="8" fill="white" />
          </clipPath>
        </defs>
      </svg>
    </div>
  )
}

export default CoverIcon
