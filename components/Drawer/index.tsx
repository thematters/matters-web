// import { disableBodyScroll, enableBodyScroll } from 'body-scroll-lock'
import React, { useState } from 'react'

import { dom } from '~/common/utils'

import styles from './styles.css'

const DrawerContext = React.createContext({
  opened: false,
  open: () => {
    // Do nothing
  },
  close: () => {
    // Do nothing
  }
})

export const DrawerConsumer = DrawerContext.Consumer

export const DrawerProvider = ({ children }: { children: React.ReactNode }) => {
  const [opened, setOpened] = useState(false)

  return (
    <DrawerContext.Provider
      value={{
        opened,
        open: () => setOpened(true),
        close: () => setOpened(false)
      }}
    >
      {children}
    </DrawerContext.Provider>
  )
}

interface DrawerState {
  width: null | undefined | number
}

export class Drawer extends React.Component<{}, DrawerState> {
  public state = { width: null }

  public componentDidMount() {
    window.addEventListener('resize', this.handleResize)
    this.handleResize()
  }

  public componentWillUnmount() {
    window.removeEventListener('resize', this.handleResize)
  }

  public handleResize = () => {
    this.setState({ width: this.calcWidth() })
  }

  public calcWidth = () => {
    if (!process.browser) {
      return null
    }

    try {
      return dom.getWindowWidth() - dom.offset(dom.$('#drawer-calc-hook')).left
    } catch (e) {
      return null
    }
  }

  public render() {
    const { width } = this.state

    return (
      <DrawerConsumer>
        {({ opened }) => {
          return (
            <aside
              // ref={setNode}
              className={opened ? 'opened' : ''}
              style={{ width: width || '30rem' }}
            >
              {this.props.children}
              <style jsx>{styles}</style>
            </aside>
          )
        }}
      </DrawerConsumer>
    )
  }
}
