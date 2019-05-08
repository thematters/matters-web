import Link from 'next/link'
import { withRouter, WithRouterProps } from 'next/router'

import { Tabs, Translate } from '~/components'

import { PATHS, TEXT } from '~/common/enums'

import styles from './styles.css'

const MiscTabs: React.FC<WithRouterProps> = ({ router }) => {
  const asPath = router && router.asPath

  return (
    <section>
      <Tabs>
        <Tabs.Tab selected={asPath === PATHS.MISC_FAQ.as}>
          <Link {...PATHS.MISC_FAQ}>
            <a>
              <Translate zh_hant="常見問題" zh_hans="常见问题" />
            </a>
          </Link>
        </Tabs.Tab>
        <Tabs.Tab selected={asPath === PATHS.MISC_GUIDE.as}>
          <Link {...PATHS.MISC_GUIDE}>
            <a>
              <Translate zh_hant="社區约章" zh_hans="社区约章" />
            </a>
          </Link>
        </Tabs.Tab>
        <Tabs.Tab selected={asPath === PATHS.MISC_TOS.as}>
          <Link {...PATHS.MISC_TOS}>
            <a>
              <Translate
                zh_hant={TEXT.zh_hant.term}
                zh_hans={TEXT.zh_hans.term}
              />
            </a>
          </Link>
        </Tabs.Tab>
        <Tabs.Tab selected={asPath === PATHS.MISC_ABOUT.as}>
          <Link {...PATHS.MISC_ABOUT}>
            <a>
              <Translate zh_hant="關於我們" zh_hans="关于我们" />
            </a>
          </Link>
        </Tabs.Tab>
      </Tabs>

      <style jsx>{styles}</style>
    </section>
  )
}

export default withRouter(MiscTabs)
