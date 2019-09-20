import gql from 'graphql-tag'
import Link from 'next/link'
import { withRouter, WithRouterProps } from 'next/router'

import { Tabs, Translate } from '~/components'

import { PATHS, TEXT } from '~/common/enums'

import { AppreciationTabsUserActivity } from './__generated__/AppreciationTabsUserActivity'
import styles from './styles.css'

interface AppreciationTabsProps {
  activity: AppreciationTabsUserActivity
}

const fragments = {
  userActivity: gql`
    fragment AppreciationTabsUserActivity on UserActivity {
      totalAppreciation
      totalAppreciatedBy
    }
  `
}

const BaseAppreciationTabs: React.FC<
  WithRouterProps & AppreciationTabsProps
> = ({ router, activity }) => {
  const pathname = router && router.pathname

  return (
    <>
      <Tabs layout="horizontal">
        <Tabs.Tab selected={pathname === PATHS.ME_APPRECIATIONS.href}>
          <Link {...PATHS.ME_APPRECIATIONS}>
            <a>
              <Translate
                zh_hant={TEXT.zh_hant.appreciate}
                zh_hans={TEXT.zh_hant.appreciate}
              />
            </a>
          </Link>
          <sup className="count">{activity.totalAppreciation}</sup>
        </Tabs.Tab>
        <Tabs.Tab selected={pathname === PATHS.ME_APPRECIATED_BY.href}>
          <Link {...PATHS.ME_APPRECIATED_BY}>
            <a>
              <Translate
                zh_hant={TEXT.zh_hant.appreciatedBy}
                zh_hans={TEXT.zh_hans.appreciatedBy}
              />
            </a>
          </Link>
          <sup className="count">{activity.totalAppreciatedBy}</sup>
        </Tabs.Tab>
      </Tabs>
      <style jsx>{styles}</style>
    </>
  )
}

const AppreciationTabs: any = withRouter(BaseAppreciationTabs)

AppreciationTabs.fragments = fragments

export default AppreciationTabs
