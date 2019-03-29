import classNames from 'classnames'
import gql from 'graphql-tag'
import Link from 'next/link'
import Router from 'next/router'
import React, { useContext, useEffect } from 'react'

import { Responsive, SearchBar } from '~/components'

import { PATHS } from '~/common/enums'
import { analytics } from '~/common/utils'

import { Translate } from '../Language'
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
Router.onRouteChangeComplete = (url: string) => {
  // segment
  analytics.trackPage({ url })
}

export const GlobalHeader = ({ user }: { user: GlobalHeaderUser }) => {
  useEffect(() => {
    analytics.identifyUser()
  }, [])

  const viewer = useContext(ViewerContext)
  const { headerState } = useContext(HeaderContext)
  const { type: headerType } = headerState
  const isDraft = headerType === 'draft'
  const isLogin = headerType === 'login'
  const isSignUp = headerType === 'signUp'
  const isAbout = headerType === 'about'

  const headerClass = classNames({
    transparent:
      isAbout &&
      'bgColor' in headerState &&
      headerState.bgColor === 'transparent'
  })
  const rightClass = classNames({
    right: true,
    me: viewer.isAuthed
  })

  return (
    <header className={headerClass}>
      <div className="l-row">
        <div className="container">
          <section className="left">
            <Logo />
            {!isAbout && isDraft && <Hint />}
            {!isAbout && !isDraft && <Nav />}
          </section>

          <section className={rightClass}>
            {!isAbout && viewer.isAuthed && user && (
              <>
                <Responsive.MediumUp>
                  {(match: boolean) =>
                    match ? <SearchBar /> : <SearchButton />
                  }
                </Responsive.MediumUp>
                <NotificationButton />
                <MeDigest user={user} />
                {isDraft && (viewer.isActive || viewer.isOnboarding) && (
                  <PublishButton allowed={viewer.isActive} />
                )}
                {!isDraft && (viewer.isActive || viewer.isOnboarding) && (
                  <WriteButton allowed={viewer.isActive} />
                )}
              </>
            )}

            {!isAbout && (!viewer.isAuthed || !user) && (
              <>
                {!isLogin && <LoginButton />}
                {!isSignUp && <SignUpButton />}
              </>
            )}

            {isAbout && (
              <Link {...PATHS.HOME}>
                <a className="u-link-green">
                  <Translate zh_hant="返回發現" zh_hans="返回发现" />
                </a>
              </Link>
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
