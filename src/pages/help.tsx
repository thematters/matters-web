import type { GetStaticPropsContext } from 'next'

import loadIntlMessages from '~/common/utils/loadIntlMessages'
import Help from '~/views/Help'

export async function getStaticProps({
  defaultLocale,
  locale,
}: GetStaticPropsContext) {
  return {
    props: {
      intlMessages: await loadIntlMessages(locale as string, defaultLocale),
    },
  }
}

export default Help
