import { useRouter } from 'next/router'

import { Tabs, Translate } from '~/components'

import { PATHS, TEXT } from '~/common/enums'

const MiscTabs = () => {
  const router = useRouter()

  return (
    <>
      <Tabs>
        <Tabs.Tab
          {...PATHS.MISC_FAQ}
          selected={router.asPath === PATHS.MISC_FAQ.as}
        >
          <Translate zh_hant={TEXT.zh_hant.faq} zh_hans={TEXT.zh_hans.faq} />
        </Tabs.Tab>

        <Tabs.Tab
          {...PATHS.MISC_GUIDE}
          selected={router.asPath === PATHS.MISC_GUIDE.as}
        >
          <Translate
            zh_hant={TEXT.zh_hant.guide}
            zh_hans={TEXT.zh_hans.guide}
          />
        </Tabs.Tab>

        <Tabs.Tab
          {...PATHS.MISC_TOS}
          selected={router.asPath === PATHS.MISC_TOS.as}
        >
          <Translate zh_hant={TEXT.zh_hant.term} zh_hans={TEXT.zh_hans.term} />
        </Tabs.Tab>

        <Tabs.Tab
          {...PATHS.MISC_ABOUT}
          selected={router.asPath === PATHS.MISC_ABOUT.as}
        >
          <Translate
            zh_hant={TEXT.zh_hant.about}
            zh_hans={TEXT.zh_hans.about}
          />
        </Tabs.Tab>
      </Tabs>
    </>
  )
}

export default MiscTabs
