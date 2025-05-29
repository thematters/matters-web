import React from 'react'

import { Error as ErrorComponent } from '~/components'

export interface FallbackProps {
  error?: Error | null
  info?: unknown | null
}

interface Props {
  FallbackComponent?: React.ComponentType<FallbackProps>
  onError?: (error: Error, info: unknown) => void
}

interface State {
  error: Error | null
  info: unknown | null
}

export class ErrorBoundary extends React.Component<
  React.PropsWithChildren<Props>,
  State
> {
  state: State = {
    error: null,
    info: null,
  }

  componentDidCatch(error: Error, info: unknown): void {
    const { onError } = this.props

    if (typeof onError === 'function') {
      try {
        onError.call(this, error, info)
      } catch {
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
