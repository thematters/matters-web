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

import Authors from './Authors'
import Feed from './Feed'
import Icymi from './Icymi'
import styles from './styles.css'
import Tags from './Tags'
import Topics from './Topics'

const Home = () => {
  const isSmallUp = useResponsive('sm-up')
  const viewer = useContext(ViewerContext)
  const hasLogo = !viewer.isAuthed && !isSmallUp

  return (
    <Layout
      rightSide={
        <>
          <Icymi />
          <Tags />
          <Topics />
          <Authors />
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
