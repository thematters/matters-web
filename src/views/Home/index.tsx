import { useContext } from 'react'

import {
  Icon,
  Layout,
  LoginButton,
  SignUpButton,
  useResponsive,
  ViewerContext
} from '~/components'

import { SIGNUP_TYPE } from '~/common/enums'

import Feed from './Feed'
import ArticleFeed from './Feed/Articles'
import TagFeed from './Feed/Tags'
import UserFeed from './Feed/Users'
import styles from './styles.css'

const Home = () => {
  const isSmallUp = useResponsive('sm-up')
  const viewer = useContext(ViewerContext)
  const hasLogo = !viewer.isAuthed && !isSmallUp

  return (
    <Layout
      aside={
        <>
          <ArticleFeed type="icymi" />
          <TagFeed />
          <ArticleFeed type="topics" />
          <UserFeed />
        </>
      }
    >
      {(!viewer.isAuthed || !isSmallUp) && (
        <Layout.Header
          left={viewer.isAuthed && <Layout.Header.MeButton />}
          right={
            <>
              {hasLogo ? (
                <section className="logo">
                  <Icon.Logo />
                </section>
              ) : (
                <Layout.Header.Title id="discover" />
              )}

              {!viewer.isAuthed && (
                <section className="buttons">
                  <LoginButton />
                  <SignUpButton trackType={SIGNUP_TYPE.GENERAL} />
                </section>
              )}
            </>
          }
        />
      )}

      <Feed />

      <style jsx>{styles}</style>
    </Layout>
  )
}

export default Home
