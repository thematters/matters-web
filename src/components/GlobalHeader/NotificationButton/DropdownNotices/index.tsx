import Link from 'next/link'

import { Error, Icon, Spinner, TextIcon, Translate } from '~/components'
import EmptyNotice from '~/components/Empty/EmptyNotice'
import { MeNotifications } from '~/components/GQL/queries/__generated__/MeNotifications'
import NoticeDigest from '~/components/NoticeDigest'

import { PATHS, TEXT } from '~/common/enums'

import styles from './styles.css'

interface DropdownNoticesProps {
  hideDropdown: () => void
  data?: MeNotifications
  loading: boolean
  error: any
}

const Header = () => (
  <header>
    <h4>
      <Translate zh_hant="通知" zh_hans="通知" />
    </h4>
    <Link {...PATHS.ME_SETTINGS_NOTIFICATION}>
      <a>
        <TextIcon icon={<Icon.Settings />} color="grey-dark">
          <Translate
            zh_hant={TEXT.zh_hant.setting}
            zh_hans={TEXT.zh_hans.setting}
          />
        </TextIcon>
      </a>
    </Link>

    <style jsx>{styles}</style>
  </header>
)

const Footer = () => (
  <footer>
    <Link {...PATHS.ME_NOTIFICATIONS}>
      <a>
        <TextIcon
          icon={<Icon.ArrowRightGreen size="md" />}
          color="green"
          textPlacement="left"
          weight="medium"
        >
          <Translate zh_hant="全部通知" zh_hans="全部通知" />
        </TextIcon>
      </a>
    </Link>

    <style jsx>{styles}</style>
  </footer>
)

const DropdownNotices = ({
  hideDropdown,
  data,
  loading,
  error
}: DropdownNoticesProps) => {
  if (loading) {
    return (
      <section className="container" onClick={hideDropdown}>
        <Header />

        <section className="content">
          <Spinner />
        </section>

        <Footer />

        <style jsx>{styles}</style>
      </section>
    )
  }

  if (error) {
    return (
      <section className="container" onClick={hideDropdown}>
        <Header />

        <section className="content">
          <Error error={error} />
        </section>

        <Footer />

        <style jsx>{styles}</style>
      </section>
    )
  }

  const edges = data?.viewer?.notices.edges

  return (
    <section className="container" onClick={hideDropdown}>
      <Header />

      <section className="content">
        <ul>
          {edges && edges.length > 0 ? (
            edges.map(({ node, cursor }) => (
              <li key={cursor}>
                <NoticeDigest notice={node} key={cursor} />
              </li>
            ))
          ) : (
            <EmptyNotice />
          )}
        </ul>
      </section>

      <Footer />

      <style jsx>{styles}</style>
    </section>
  )
}

export default DropdownNotices
