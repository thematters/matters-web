import {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useMemo,
  useRef,
  useState,
} from 'react'

import Container from './container'
import { RenderOptions, TurnstileInstance, TurnstileProps } from './types'
import useObserveScript from './use-observe-script'
import {
  checkElementExistence,
  CONTAINER_STYLE_SET,
  DEFAULT_CONTAINER_ID,
  DEFAULT_ONLOAD_NAME,
  DEFAULT_SCRIPT_ID,
  getTurnstileSizeOpts,
  injectTurnstileScript,
} from './utils'

export const Turnstile = forwardRef<
  TurnstileInstance | undefined,
  TurnstileProps
>((props, ref) => {
  const {
    scriptOptions,
    options = {},
    siteKey,
    onSuccess,
    onExpire,
    onError,
    onBeforeInteractive,
    onAfterInteractive,
    onUnsupported,
    id,
    style,
    as = 'div',
    injectScript = true,
    ...divProps
  } = props
  const widgetSize = options.size ?? 'normal'

  const [containerStyle, setContainerStyle] = useState(
    options.execution === 'execute'
      ? CONTAINER_STYLE_SET.invisible
      : options.appearance === 'interaction-only'
        ? CONTAINER_STYLE_SET.interactionOnly
        : CONTAINER_STYLE_SET[widgetSize]
  )
  const containerRef = useRef<HTMLElement | null>(null)
  const firstRendered = useRef(false)
  const [widgetId, setWidgetId] = useState<string | undefined | null>()
  const [turnstileLoaded, setTurnstileLoaded] = useState(false)
  const containerId = id ?? DEFAULT_CONTAINER_ID
  const scriptId = injectScript
    ? scriptOptions?.id || `${DEFAULT_SCRIPT_ID}__${containerId}`
    : scriptOptions?.id || DEFAULT_SCRIPT_ID
  const scriptLoaded = useObserveScript(scriptId)

  const onLoadCallbackName = scriptOptions?.onLoadCallbackName
    ? `${scriptOptions.onLoadCallbackName}__${containerId}`
    : `${DEFAULT_ONLOAD_NAME}__${containerId}`

  const renderConfig = useMemo(
    (): RenderOptions => ({
      sitekey: siteKey,
      action: options.action,
      cData: options.cData,
      callback: onSuccess,
      'error-callback': onError,
      'expired-callback': onExpire,
      'before-interactive-callback': onBeforeInteractive,
      'after-interactive-callback': onAfterInteractive,
      'unsupported-callback': onUnsupported,
      theme: options.theme ?? 'auto',
      language: options.language ?? 'auto',
      tabindex: options.tabIndex,
      'response-field': options.responseField,
      'response-field-name': options.responseFieldName,
      size: getTurnstileSizeOpts(widgetSize),
      retry: options.retry ?? 'auto',
      'retry-interval': options.retryInterval ?? 8000,
      'refresh-expired': options.refreshExpired ?? 'auto',
      execution: options.execution ?? 'render',
      appearance: options.appearance ?? 'always',
    }),
    [
      siteKey,
      options,
      onSuccess,
      onError,
      onExpire,
      widgetSize,
      onBeforeInteractive,
      onAfterInteractive,
      onUnsupported,
    ]
  )

  const renderConfigStringified = useMemo(
    () => JSON.stringify(renderConfig),
    [renderConfig]
  )

  useImperativeHandle(ref, () => {
    if (typeof window === 'undefined' || !scriptLoaded) {
      return
    }

    const { turnstile } = window
    return {
      getResponse() {
        if (!turnstile?.getResponse || !widgetId) {
          console.warn('Turnstile has not been loaded')
          return
        }

        return turnstile.getResponse(widgetId)
      },

      reset() {
        if (!turnstile?.reset || !widgetId) {
          console.warn('Turnstile has not been loaded')
          return
        }

        if (options.execution === 'execute') {
          setContainerStyle(CONTAINER_STYLE_SET.invisible)
        }

        try {
          turnstile.reset(widgetId)
        } catch (error) {
          console.warn(`Failed to reset Turnstile widget ${widgetId}`, error)
        }
      },

      remove() {
        if (!turnstile?.remove || !widgetId) {
          console.warn('Turnstile has not been loaded')
          return
        }

        setWidgetId('')
        setContainerStyle(CONTAINER_STYLE_SET.invisible)
        turnstile.remove(widgetId)
      },

      render() {
        if (!turnstile?.render || !containerRef.current || widgetId) {
          console.warn(
            'Turnstile has not been loaded or widget already rendered'
          )
          return
        }

        /* eslint-disable */
        const id = turnstile.render(containerRef.current, renderConfig)
        setWidgetId(id)

        if (options.execution !== 'execute') {
          setContainerStyle(CONTAINER_STYLE_SET[widgetSize])
        }

        return id
      },

      execute() {
        if (options.execution !== 'execute') {
          return
        }

        if (!turnstile?.execute || !containerRef.current || !widgetId) {
          console.warn(
            'Turnstile has not been loaded or widget has not been rendered'
          )
          return
        }

        turnstile.execute(containerRef.current, renderConfig)
        setContainerStyle(CONTAINER_STYLE_SET[widgetSize])
      },
    }
  }, [
    scriptLoaded,
    widgetId,
    options.execution,
    widgetSize,
    renderConfig,
    containerRef,
  ])

  useEffect(() => {
    // @ts-expect-error implicit any
    window[onLoadCallbackName] = () => setTurnstileLoaded(true)

    return () => {
      // @ts-expect-error implicit any
      delete window[onLoadCallbackName]
    }
  }, [onLoadCallbackName])

  useEffect(() => {
    if (injectScript && !turnstileLoaded) {
      injectTurnstileScript({
        onLoadCallbackName,
        scriptOptions: {
          ...scriptOptions,
          id: scriptId,
        },
      })
    }
  }, [
    injectScript,
    turnstileLoaded,
    onLoadCallbackName,
    scriptOptions,
    scriptId,
  ])

  /* Set the turnstile as loaded, in case the onload callback never runs. (e.g., when manually injecting the script without specifying the `onload` param) */
  useEffect(() => {
    if (scriptLoaded && !turnstileLoaded && window.turnstile) {
      setTurnstileLoaded(true)
    }
  }, [turnstileLoaded, scriptLoaded])

  useEffect(() => {
    if (!siteKey) {
      console.warn('sitekey was not provided')
      return
    }

    if (
      !scriptLoaded ||
      !containerRef.current ||
      !turnstileLoaded ||
      firstRendered.current
    ) {
      return
    }

    const id = window.turnstile!.render(containerRef.current, renderConfig)
    setWidgetId(id)
    firstRendered.current = true
  }, [scriptLoaded, siteKey, renderConfig, firstRendered, turnstileLoaded])

  // re-render widget when renderConfig changes
  useEffect(() => {
    if (!window.turnstile) return

    if (containerRef.current && widgetId) {
      if (checkElementExistence(widgetId)) {
        window.turnstile.remove(widgetId)
      }
      const newWidgetId = window.turnstile.render(
        containerRef.current,
        renderConfig
      )
      setWidgetId(newWidgetId)
      firstRendered.current = true
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [renderConfigStringified, siteKey])

  useEffect(() => {
    if (!window.turnstile) return
    if (!widgetId) return
    if (!checkElementExistence(widgetId)) return

    return () => {
      window.turnstile!.remove(widgetId)
    }
  }, [widgetId])

  useEffect(() => {
    setContainerStyle(
      options.execution === 'execute'
        ? CONTAINER_STYLE_SET.invisible
        : renderConfig.appearance === 'interaction-only'
          ? CONTAINER_STYLE_SET.interactionOnly
          : CONTAINER_STYLE_SET[widgetSize]
    )
  }, [options.execution, widgetSize, renderConfig.appearance])

  return (
    <Container
      ref={containerRef}
      as={as}
      id={containerId}
      style={{ ...containerStyle, ...style }}
      {...divProps}
    />
  )
})

Turnstile.displayName = 'Turnstile'

export default Turnstile
