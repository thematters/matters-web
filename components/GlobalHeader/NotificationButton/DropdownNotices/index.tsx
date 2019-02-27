import _get from 'lodash/get'
import Link from 'next/link'

import { Empty, Error, Icon, Spinner, TextIcon, Translate } from '~/components'
import NoticeDigest from '~/components/NoticeDigest'

import { PATHS } from '~/common/enums'
import ICON_ARROW_RIGHT_GREEN from '~/static/icons/arrow-right-green.svg?sprite'
import ICON_EMPTY_NOTIFICATION from '~/static/icons/empty-notification.svg?sprite'
import ICON_SETTINGS from '~/static/icons/settings.svg?sprite'

import styles from './styles.css'

interface DropdownNoticesProps {
  hideDropdown: () => void
  data: any
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
        <TextIcon
          icon={
            <Icon
              id={ICON_SETTINGS.id}
              viewBox={ICON_SETTINGS.viewBox}
              size="small"
            />
          }
          color="grey-dark"
        >
          <Translate zh_hant="設定" zh_hans="设定" />
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
          icon={
            <Icon
              id={ICON_ARROW_RIGHT_GREEN.id}
              viewBox={ICON_ARROW_RIGHT_GREEN.viewBox}
              style={{ width: 12, height: 6 }}
            />
          }
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

const EmptyNotices = () => (
  <Empty
    icon={
      <Icon
        id={ICON_EMPTY_NOTIFICATION.id}
        viewBox={ICON_EMPTY_NOTIFICATION.viewBox}
        size={'xxlarge'}
      />
    }
  />
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

  const edges = _get(data, 'viewer.notices.edges')

  return (
    <section className="container" onClick={hideDropdown}>
      <Header />

      <section className="content">
        <ul>
          {edges && edges.length > 0 ? (
            edges.map(({ node, cursor }: { node: any; cursor: any }) => (
              <li key={cursor}>
                <NoticeDigest notice={node} key={cursor} />
              </li>
            ))
          ) : (
            <EmptyNotices />
          )}
        </ul>
      </section>

      <Footer />

      <style jsx>{styles}</style>
    </section>
  )
}

export default DropdownNotices
