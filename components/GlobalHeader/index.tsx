import classNames from 'classnames'
import gql from 'graphql-tag'
import Router from 'next/router'
import React, { useContext, useEffect } from 'react'

import { ModalSwitch } from '~/components/ModalManager'
import { Responsive } from '~/components/Responsive'
import { SearchBar } from '~/components/SearchBar'
import { ViewerContext } from '~/components/Viewer'

import { analytics } from '~/common/utils'

import { GlobalHeaderUser } from './__generated__/GlobalHeaderUser'
import LoginButton from './LoginButton'
import Logo from './Logo'
import MeDigest from './MeDigest'
import Nav from './Nav'
import NotificationButton from './NotificationButton'
import SearchButton from './SearchButton'
import SignUpButton from './SignUpButton'
import styles from './styles.css'
import WriteButton from './WriteButton'

// Track client-side page views
Router.onRouteChangeComplete = () => {
  analytics.trackPage()
}

const LoginModalSwitch = () => (
  <ModalSwitch modalId="loginModal">
    {(open: any) => <LoginButton onClick={open} />}
  </ModalSwitch>
)

const SignUpModalSwitch = () => (
  <ModalSwitch modalId="signUpModal">
    {(open: any) => <SignUpButton onClick={open} />}
  </ModalSwitch>
)

export const GlobalHeader = ({ user }: { user: GlobalHeaderUser }) => {
  useEffect(analytics.identifyUser)
  const viewer = useContext(ViewerContext)
  const isAuthed = !!viewer.id
  const rightClasses = classNames({
    right: true,
    me: isAuthed
  })

  return (
    <header>
      <div className="l-row">
        <div className="container">
          <section className="left">
            <Logo />
            <Nav />
          </section>

          <section className={rightClasses}>
            {isAuthed && user ? (
              <>
                <Responsive.MediumUp>
                  {(match: boolean) =>
                    match ? <SearchBar /> : <SearchButton />
                  }
                </Responsive.MediumUp>
                <NotificationButton />
                <MeDigest user={user} />
                <WriteButton />
              </>
            ) : (
              <>
                <LoginModalSwitch />
                <SignUpModalSwitch />
              </>
            )}
          </section>
        </div>
      </div>

      <style jsx>{styles}</style>
    </header>
  )
}

GlobalHeader.fragments = {
  user: gql`
    fragment GlobalHeaderUser on User {
      id
      ...MeDigestUser
    }
    ${MeDigest.fragments.user}
  `
}
