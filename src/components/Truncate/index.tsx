// Modified base on https://github.com/pablosichert/react-truncate

import {
  DetailedHTMLProps,
  HTMLAttributes,
  ReactNode,
  useCallback,
  useRef,
  useState,
} from 'react'

import { useIsomorphicLayoutEffect } from '../Hook'

interface TruncateProps
  extends DetailedHTMLProps<HTMLAttributes<HTMLSpanElement>, HTMLSpanElement> {
  children: ReactNode
  ellipsis: string | ReactNode
  lines: number
  trimWhitespace: boolean
  width?: number
  onTruncate?: (didTruncate: boolean) => void
}

export const Truncate = ({
  children,
  ellipsis,
  lines = 1,
  trimWhitespace = false,
  width = 0,
  onTruncate,
  ...spanProps
}: TruncateProps) => {
  const [canvasContext, setCanvasContext] =
    useState<CanvasRenderingContext2D | null>()
  const [renderTextRef, setRenderTextRef] = useState<
    (string | JSX.Element)[] | ReactNode
  >()
  const [targetWidth, setTargetWidth] = useState<number>(0)
  const [animationFrame, setAnimationFrame] = useState<number>(0)

  const targetRef = useRef<HTMLSpanElement>(null)
  const textRef = useRef<HTMLSpanElement>(null)
  const ellipsisRef = useRef<HTMLSpanElement>(null)

  useIsomorphicLayoutEffect(() => {
    if (textRef && textRef.current && textRef.current.parentNode) {
      textRef.current.parentNode.removeChild(textRef.current)
    }
  }, [targetWidth])

  const calcTWidth = useCallback((): number | undefined => {
    // Calculation is no longer relevant, since node has been removed
    if (!targetRef.current?.parentElement) {
      return
    }

    const newTargetWidth =
      width ||
      // Floor the result to deal with browser subpixel precision
      Math.floor(targetRef.current.parentElement.getBoundingClientRect().width)

    // Delay calculation until parent node is inserted to the document
    // Mounting order in React is ChildComponent, ParentComponent
    if (!newTargetWidth) {
      return window.requestAnimationFrame(() => calcTWidth(/* callback */))
    }

    const style = window.getComputedStyle(targetRef.current)

    const font = [
      style.fontWeight,
      style.fontStyle,
      style.fontSize,
      style.fontFamily,
    ].join(' ')

    if (canvasContext) canvasContext.font = font

    setTargetWidth(newTargetWidth)
  }, [canvasContext, width])

  useIsomorphicLayoutEffect(() => {
    const canvas = document.createElement('canvas')
    setCanvasContext(canvas.getContext('2d'))
  }, [])

  useIsomorphicLayoutEffect(() => {
    calcTWidth()
    window.addEventListener('resize', calcTWidth)

    return () => {
      window.removeEventListener('resize', calcTWidth)

      window.cancelAnimationFrame(animationFrame)
    }
  }, [calcTWidth, animationFrame])

  // Shim innerText to consistently break lines at <br/> but not at \n
  const innerText = (node: HTMLSpanElement | null) => {
    const div = document.createElement('div')
    const contentKey =
      'innerText' in window.HTMLElement.prototype ? 'innerText' : 'textContent'

    div.innerHTML = node?.innerHTML.replace(/\r\n|\r|\n/g, ' ') || ''

    let newText = div[contentKey]

    const test = document.createElement('div')
    test.innerHTML = 'foo<br/>bar'

    if (test[contentKey]?.replace(/\r\n|\r/g, '\n') !== 'foo\nbar') {
      div.innerHTML = div.innerHTML.replace(/<br.*?[/]?>/gi, '\n')
      newText = div[contentKey]
    }

    return newText || ''
  }

  const truncate = useCallback(
    (didTruncate: boolean) => {
      if (typeof onTruncate === 'function') {
        setAnimationFrame(
          window.requestAnimationFrame(() => {
            onTruncate(didTruncate)
          })
        )
      }
    },
    [onTruncate]
  )

  const measureWidth = useCallback(
    (textVal: string) => {
      return canvasContext?.measureText(textVal).width || 0
    },
    [canvasContext]
  )

  const getEllipsisWidth = (node?: HTMLSpanElement | null) => {
    return node?.offsetWidth
  }

  const getLines = useCallback(() => {
    const resultLines: Array<string | JSX.Element> = []
    const textLine = innerText(textRef.current)
    const chars = textLine.split('')
    const ellipsisWidth = getEllipsisWidth(ellipsisRef.current) || 0

    let measuringLine = ''
    const didTruncate = true
    let index = 0

    while (index < chars.length) {
      const char = chars[index]

      if (measureWidth(measuringLine + char) <= targetWidth) {
        measuringLine += char
        index++

        if (index === chars.length) {
          resultLines.push(measuringLine)
          break
        }
      } else {
        resultLines.push(measuringLine)
        measuringLine = ''
        if (resultLines.length === lines) {
          break
        }
      }
    }

    let lastLine = resultLines[resultLines.length - 1] as string
    while (measureWidth(lastLine) + ellipsisWidth > targetWidth) {
      lastLine = lastLine.slice(0, -1)
    }

    resultLines[resultLines.length - 1] = (
      <span>
        {lastLine}
        {ellipsis}
      </span>
    )

    truncate(didTruncate)
    return resultLines
  }, [ellipsis, lines, measureWidth, truncate, targetWidth, trimWhitespace])

  const renderLine = (
    line: string | JSX.Element,
    i: number,
    arr: (string | JSX.Element)[]
  ) => {
    if (i === arr.length - 1) {
      return <span key={i}>{line}</span>
    } else {
      const br = <br key={`${i}br`} />

      if (line) {
        return [<span key={i}>{line}</span>, br]
      } else {
        return br
      }
    }
  }

  useIsomorphicLayoutEffect(() => {
    const mounted = !!(targetRef.current && targetWidth)

    if (typeof window !== 'undefined' && mounted) {
      if (lines > 0) {
        setRenderTextRef(getLines().map(renderLine))
      } else {
        setRenderTextRef(children)

        truncate(false)
      }
    }
  }, [children, lines, targetWidth, getLines, truncate])

  return (
    <span {...spanProps} ref={targetRef}>
      <span>{renderTextRef}</span>
      <span ref={textRef}>{children}</span>
      <span
        ref={ellipsisRef}
        style={{ position: 'fixed', visibility: 'hidden', top: 0, left: 0 }}
      >
        {ellipsis}
      </span>
    </span>
  )
}
