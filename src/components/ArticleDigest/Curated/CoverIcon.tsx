import React from 'react'

import styles from './styles.module.css'

interface CoverIconProps {
  title: string
  size?: 'sm' | 'lg'
}

const getTitleHue = (titleLength: number): number => {
  return Math.round((titleLength / 100) * 360)
}

const generateLayerColors = (hue: number) => {
  return {
    layer1: `hsl(${hue}, 50%, 90%)`,
    layer2: `hsl(${hue}, 50%, 95%)`,
    layer3: `hsl(${hue}, 50%, 90%)`,
    layer4: `hsl(${hue}, 50%, 80%)`,
    layer5: `hsl(${hue}, 50%, 85%)`,
    layer6: `hsl(${hue}, 50%, 80%)`,
  }
}

const SmallCoverSVG = ({ colors }: { colors: Record<string, string> }) => (
  <svg
    width="334"
    height="167"
    viewBox="0 0 334 167"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <g clipPath="url(#clip0_sm)">
      <path d="M334 0H0V167H334V0Z" fill={colors.layer1} />
      <path
        d="M0 14.5557L173.68 52.104L334 42.084V167H0V14.5557Z"
        fill={colors.layer2}
      />
      <path d="M334 70V167H0V107.5L334 70Z" fill={colors.layer3} />
      <path
        d="M100.2 125.472C119.384 125.472 134.936 109.92 134.936 90.736C134.936 71.5518 119.384 56 100.2 56C81.0157 56 65.4639 71.5518 65.4639 90.736C65.4639 109.92 81.0157 125.472 100.2 125.472Z"
        fill={colors.layer4}
      />
      <path
        d="M0 133.049L216.432 70L334 128.5V167H0L0 133.049Z"
        fill={colors.layer5}
      />
      <path
        d="M216.489 70L114 167H334V103.472L216.489 70Z"
        fill={colors.layer6}
      />
    </g>
    <defs>
      <clipPath id="clip0_sm">
        <rect width="334" height="167" rx="8" fill="white" />
      </clipPath>
    </defs>
  </svg>
)

const LargeCoverSVG = ({ colors }: { colors: Record<string, string> }) => (
  <svg
    width="219"
    height="219"
    viewBox="0 0 219 219"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <g clipPath="url(#clip0_lg)">
      <path d="M218.667 0H0V218.663H218.667V0Z" fill={colors.layer1} />
      <path
        d="M0 19.0587L113.707 68.2229L218.667 55.1031V218.663H0V19.0587Z"
        fill={colors.layer2}
      />
      <path
        d="M218.667 94.4625V218.663H0V124.201L218.667 94.4625Z"
        fill={colors.layer3}
      />
      <path
        d="M65.6002 135.571C78.1599 135.571 88.3415 125.39 88.3415 112.83C88.3415 100.271 78.1599 90.0892 65.6002 90.0892C53.0405 90.0892 42.8589 100.271 42.8589 112.83C42.8589 125.39 53.0405 135.571 65.6002 135.571Z"
        fill={colors.layer4}
      />
      <path
        d="M0 143.207L141.696 94.4625L218.667 137.382V218.663H0V143.207Z"
        fill={colors.layer5}
      />
      <path
        d="M141.696 94.4625L74.5654 218.663H218.667V137.32L141.696 94.4625Z"
        fill={colors.layer6}
      />
    </g>
    <defs>
      <clipPath id="clip0_lg">
        <rect width="218.667" height="218.663" rx="8" fill="white" />
      </clipPath>
    </defs>
  </svg>
)

const CoverIcon: React.FC<CoverIconProps> = ({ title, size = 'sm' }) => {
  const titleLength = title.length
  const hue = getTitleHue(titleLength)
  const colors = generateLayerColors(hue)

  return (
    <div className={styles.coverIcon}>
      {size === 'sm' ? (
        <SmallCoverSVG colors={colors} />
      ) : (
        <LargeCoverSVG colors={colors} />
      )}
    </div>
  )
}

export default CoverIcon
