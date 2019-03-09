import classNames from 'classnames'
import gql from 'graphql-tag'
import Router from 'next/router'
import React, { useContext, useEffect } from 'react'

import { Responsive, SearchBar } from '~/components'
import { ModalSwitch } from '~/components/ModalManager'

import { analytics } from '~/common/utils'

import { ViewerContext } from '../Viewer'
import { GlobalHeaderUser } from './__generated__/GlobalHeaderUser'
import { HeaderContext } from './Context'
import Hint from './Hint'
import LoginButton from './LoginButton'
import Logo from './Logo'
import MeDigest from './MeDigest'
import Nav from './Nav'
import NotificationButton from './NotificationButton'
import PublishButton from './PublishButton'
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
  const { headerState } = useContext(HeaderContext)
  const { type: headerType } = headerState
  const rightClasses = classNames({
    right: true,
    me: viewer.isAuthed
  })
  const isDraft = headerType === 'draft'
  const isLogin = headerType === 'login'
  const isSignUp = headerType === 'signUp'

  return (
    <header>
      <div className="l-row">
        <div className="container">
          <section className="left">
            <Logo />
            {isDraft ? <Hint /> : <Nav />}
          </section>

          <section className={rightClasses}>
            {viewer.isAuthed && user ? (
              <>
                <Responsive.MediumUp>
                  {(match: boolean) =>
                    match ? <SearchBar /> : <SearchButton />
                  }
                </Responsive.MediumUp>
                <NotificationButton />
                <MeDigest user={user} />
                {isDraft && viewer.isActive && <PublishButton />}
                {!isDraft && viewer.isActive && <WriteButton />}
              </>
            ) : (
              <>
                {!isLogin && <LoginModalSwitch />}
                {!isSignUp && <SignUpModalSwitch />}
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
