import { useRouter } from 'next/router'

import { Tabs, Translate } from '~/components'

import { PATHS } from '~/common/enums'

const MiscTabs = () => {
  const router = useRouter()

  return (
    <>
      <Tabs>
        <Tabs.Tab
          {...PATHS.MISC_FAQ}
          selected={router.asPath === PATHS.MISC_FAQ.as}
        >
          <Translate id="faq" />
        </Tabs.Tab>

        <Tabs.Tab
          {...PATHS.MISC_GUIDE}
          selected={router.asPath === PATHS.MISC_GUIDE.as}
        >
          <Translate id="guide" />
        </Tabs.Tab>

        <Tabs.Tab
          {...PATHS.MISC_TOS}
          selected={router.asPath === PATHS.MISC_TOS.as}
        >
          <Translate id="term" />
        </Tabs.Tab>

        <Tabs.Tab
          {...PATHS.MISC_ABOUT}
          selected={router.asPath === PATHS.MISC_ABOUT.as}
        >
          <Translate id="about" />
        </Tabs.Tab>
      </Tabs>
    </>
  )
}

export default MiscTabs
