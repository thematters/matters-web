import Link from 'next/link'
import { withRouter, WithRouterProps } from 'next/router'

import { Tabs, Translate } from '~/components'

import { PATHS, TEXT } from '~/common/enums'

const AppreciationTabs: React.FC<WithRouterProps> = ({ router }) => {
  const pathname = router && router.pathname

  return (
    <Tabs>
      <Tabs.Tab selected={pathname === PATHS.ME_APPRECIATIONS.href}>
        <Link {...PATHS.ME_APPRECIATIONS}>
          <a>
            <Translate
              zh_hant={TEXT.zh_hant.myAppreciations}
              zh_hans={TEXT.zh_hant.myAppreciations}
            />
          </a>
        </Link>
      </Tabs.Tab>
      <Tabs.Tab selected={pathname === PATHS.ME_APPRECIATED_BY.href}>
        <Link {...PATHS.ME_APPRECIATED_BY}>
          <a>
            <Translate
              zh_hant={TEXT.zh_hant.myAppreciatedBy}
              zh_hans={TEXT.zh_hans.myAppreciatedBy}
            />
          </a>
        </Link>
      </Tabs.Tab>
    </Tabs>
  )
}

export default withRouter(AppreciationTabs)
