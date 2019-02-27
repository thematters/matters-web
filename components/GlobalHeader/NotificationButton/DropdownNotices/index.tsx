import gql from 'graphql-tag'
import _get from 'lodash/get'
import Link from 'next/link'
import { Query, QueryResult } from 'react-apollo'

import { Error, Icon, Spinner, TextIcon, Translate } from '~/components'
import NoticeDigest from '~/components/NoticeDigest'

import { PATHS } from '~/common/enums'
import ICON_ARROW_RIGHT_GREEN from '~/static/icons/arrow-right-green.svg?sprite'
import ICON_SETTINGS from '~/static/icons/settings.svg?sprite'

import { MeDropdownNotifications } from './__generated__/MeDropdownNotifications'
import styles from './styles.css'

interface DropdownNoticesProps {
  hideDropdown: () => void
  state: 'hidden' | 'shown'
}

const ME_NOTIFICATIONS = gql`
  query MeDropdownNotifications($cursor: String) {
    viewer {
      id
      status {
        unreadNoticeCount
      }
      notices(input: { first: 7, after: $cursor }) {
        edges {
          cursor
          node {
            ...DigestNotice
          }
        }
      }
    }
  }
  ${NoticeDigest.fragments.notice}
`

const DropdownNotices = ({ hideDropdown, state }: DropdownNoticesProps) => {
  return (
    <section className="container" onClick={hideDropdown}>
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
      </header>

      <section className="content">
        <Query query={ME_NOTIFICATIONS} skip={state === 'hidden'}>
          {({
            data,
            loading,
            error
          }: QueryResult & { data: MeDropdownNotifications }) => {
            if (loading) {
              return <Spinner />
            }

            if (error) {
              return <Error error={error} />
            }

            const edges = _get(data, 'viewer.notices.edges')

            if (!edges || edges.length <= 0) {
              return null
            }

            return (
              <ul>
                {edges.map(({ node, cursor }: { node: any; cursor: any }) => (
                  <li key={cursor}>
                    <NoticeDigest notice={node} key={cursor} />
                  </li>
                ))}
              </ul>
            )
          }}
        </Query>
      </section>

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
      </footer>

      <style jsx>{styles}</style>
    </section>
  )
}

export default DropdownNotices
