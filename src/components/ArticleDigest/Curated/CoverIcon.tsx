import React from 'react'

import styles from './styles.module.css'

interface CoverIconProps {
  title: string
  size?: 'sm' | 'lg'
}

export const getCoverHue = (shortHash: string): number => {
  // Generate a stable numerical value from the hash as a seed
  let seed = 0
  for (let i = 0; i < shortHash.length; i++) {
    // Use a simple hash algorithm to convert characters to values and accumulate
    seed = (seed << 5) - seed + shortHash.charCodeAt(i)
    seed = seed & seed // Convert to 32-bit integer
  }

  // Use the seed to generate a pseudo-random number between 0-1
  const seedRandom = () => {
    const x = Math.sin(seed++) * 10000
    return x - Math.floor(x)
  }

  // Quantize colors into 36 distinct values (every 10 degrees)
  // This makes colors more distinct and avoids "almost similar" colors
  // which can look odd when placed together

  // Get a number between 0-35
  const colorIndex = Math.floor(seedRandom() * 36)

  // Convert to a hue value (0-350 in steps of 10 degrees)
  const hue = colorIndex * 10

  return hue
}

const getTitleHash = (title: string): string => {
  if (title.length === 0) return '0'

  // Add title length as a factor to differentiate similar titles
  let h1 = 0x811c9dc5 ^ title.length
  let h2 = 0x1b873593
  let h3 = 0x85ebca6b
  let h4 = 0xc2b2ae35

  // Process string into a UTF-8 byte array
  const bytes = []
  for (let i = 0; i < title.length; i++) {
    const char = title.charCodeAt(i)
    if (char < 128) {
      bytes.push(char)
    } else if (char < 2048) {
      bytes.push((char >> 6) | 192)
      bytes.push((char & 63) | 128)
    } else {
      bytes.push((char >> 12) | 224)
      bytes.push(((char >> 6) & 63) | 128)
      bytes.push((char & 63) | 128)
    }
  }

  // Enhance position influence - characters at different positions have different impact
  for (let i = 0; i < bytes.length; i++) {
    const byte = bytes[i]
    const position = i + 1 // 1-based position

    // Position-weighted mixing (characters at same position have less influence)
    h1 ^= byte * position
    h1 = (h1 * 0x01000193) | 0

    // Mix with a prime multiplier based on position
    h2 = ((h2 << 5) | (h2 >>> 27)) ^ (byte + position)

    // Strengthen the influence of the end of the string
    // This helps differentiate strings with the same prefix
    if (i > bytes.length / 2) {
      h3 = ((h3 + byte * 3) * 0x85ebca6b) >>> 0
    } else {
      h3 = ((h3 + byte) * 0x85ebca6b) >>> 0
    }

    // Special treatment for numbers and punctuation
    if ((byte >= 48 && byte <= 57) || (byte >= 33 && byte <= 47)) {
      // 0-9, !"#$%&'()*+,-./
      h4 = (((byte * 101) ^ (h4 >>> 14)) * 0x85ebca6b) >>> 0
    } else {
      h4 = ((byte ^ (h4 >>> 16)) * 0x85ebca6b) >>> 0
    }
  }

  // Add reversed string influence to make similar strings more different
  for (let i = bytes.length - 1; i >= 0; i--) {
    const byte = bytes[i]
    h1 = ((h1 ^ byte) * 0x01000193) | 0
    h4 = ((h4 ^ byte) * 0x85ebca6b) >>> 0
  }

  // Mix all round results with additional entropy
  h1 = ((h1 ^ h2) * h3) >>> 0
  h1 = ((h1 ^ h4) * 0x9e3779b9) >>> 0
  h1 = ((h1 ^ (h1 >>> 16)) * 0x85ebca6b) >>> 0

  // Final mixing with strong avalanche effect
  h1 ^= h1 >>> 13
  h1 = (h1 * 0xc2b2ae35) >>> 0
  h1 ^= h1 >>> 16

  // Convert to hexadecimal
  return (h1 >>> 0).toString(16)
}

const generateLayerColors = (hue: number) => {
  return {
    layer1: `hsl(${hue}, 70%, 90%)`,
    layer2: `hsl(${hue}, 60%, 95%)`,
    layer3: `hsl(${hue}, 65%, 90%)`,
    layer4: `hsl(${hue}, 75%, 75%)`,
    layer5: `hsl(${hue}, 70%, 85%)`,
    layer6: `hsl(${hue}, 75%, 80%)`,
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
  const shortHash = getTitleHash(title)
  const hue = getCoverHue(shortHash)
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
