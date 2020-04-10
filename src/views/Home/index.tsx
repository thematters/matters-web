import { useContext } from 'react';

import {
  Icon,
  Layout,
  LoginButton,
  SignUpButton,
  useResponsive,
  ViewerContext,
} from '~/components';

import { SIGNUP_TYPE } from '~/common/enums';

import Feed from './Feed';
import Sidebar from './Sidebar';
import styles from './styles.css';

const Home = () => {
  const isSmallUp = useResponsive('sm-up');
  const viewer = useContext(ViewerContext);
  const hasLogo = !viewer.isAuthed && !isSmallUp;

  return (
    <Layout.Main
      aside={
        <>
          <Sidebar.Icymi />
          <Sidebar.Tags />
          <Sidebar.Topics />
          <Sidebar.Authors />
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
    </Layout.Main>
  );
};

export default Home;
