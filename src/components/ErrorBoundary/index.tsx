import * as Sentry from '@sentry/browser'
import React from 'react'

import { Error as ErrorComponent } from '~/components'

export interface FallbackProps {
  error?: Error | null
  info?: any | null
}

interface Props {
  FallbackComponent?: React.ComponentType<FallbackProps>
  onError?: (error: Error, info: any) => void
}

interface State {
  error: Error | null
  info: any | null
}

export class ErrorBoundary extends React.Component<Props, State> {
  state: State = {
    error: null,
    info: null
  }

  componentDidCatch(error: Error, info: any): void {
    // Add info to Sentry
    Sentry.captureException(error)

    const { onError } = this.props

    if (typeof onError === 'function') {
      try {
        onError.call(this, error, info)
      } catch (ignoredError) {
        //
      }
    }

    this.setState({ error, info })
  }

  render() {
    const { children, FallbackComponent = ErrorComponent } = this.props
    const { error, info } = this.state

    if (error !== null) {
      return <FallbackComponent info={info} error={error} />
    }

    return children
  }
}
