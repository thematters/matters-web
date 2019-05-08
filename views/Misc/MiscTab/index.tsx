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
              <Translate
                zh_hant={TEXT.zh_hant.faq}
                zh_hans={TEXT.zh_hans.faq}
              />
            </a>
          </Link>
        </Tabs.Tab>
        <Tabs.Tab selected={asPath === PATHS.MISC_GUIDE.as}>
          <Link {...PATHS.MISC_GUIDE}>
            <a>
              <Translate
                zh_hant={TEXT.zh_hant.guide}
                zh_hans={TEXT.zh_hans.guide}
              />
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
              <Translate
                zh_hant={TEXT.zh_hant.about}
                zh_hans={TEXT.zh_hans.about}
              />
            </a>
          </Link>
        </Tabs.Tab>
      </Tabs>

      <style jsx>{styles}</style>
    </section>
  )
}

export default withRouter(MiscTabs)
