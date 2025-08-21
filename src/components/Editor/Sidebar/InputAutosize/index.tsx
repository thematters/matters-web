import { useEffect, useRef, useState } from 'react'

interface InputAutosizeProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  value: string
}

export default function InputAutosize({
  value,
  placeholder,
  style,
  ...props
}: InputAutosizeProps) {
  const inputRef = useRef<HTMLInputElement>(null)
  const [width, setWidth] = useState(0)

  useEffect(() => {
    if (!inputRef.current) return

    const input = inputRef.current
    const displayValue = value || placeholder || ''

    // Create a temporary span to measure text width
    const span = document.createElement('span')
    span.style.visibility = 'hidden'
    span.style.position = 'absolute'
    span.style.whiteSpace = 'nowrap'

    // Copy all computed styles from input to span
    const computedStyle = window.getComputedStyle(input)
    span.style.font = computedStyle.font
    span.style.letterSpacing = computedStyle.letterSpacing
    span.style.wordSpacing = computedStyle.wordSpacing
    span.style.textTransform = computedStyle.textTransform

    span.textContent = displayValue
    document.body.appendChild(span)

    const measuredWidth = span.offsetWidth
    setWidth(measuredWidth + 2) // Add 2px for cursor space

    document.body.removeChild(span)
  }, [value, placeholder])

  return (
    <input
      ref={inputRef}
      type="text"
      value={value}
      placeholder={placeholder}
      style={{
        width: width ? `${width}px` : 'auto',
        minWidth: 0,
        ...style,
      }}
      {...props}
    />
  )
}
