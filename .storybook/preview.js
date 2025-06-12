import React from 'react'
import { INITIAL_VIEWPORTS } from '@storybook/addon-viewport'
import { IntlProvider } from 'react-intl'

import './styles.css'
import '~/common/styles/variables/colors.css'
import '~/common/styles/variables/shadows.css'
import '~/common/styles/variables/sizing.css'
import '~/common/styles/variables/spacing.css'
import '~/common/styles/variables/typography.css'
import '~/common/styles/variables/z-index.css'
import '~/common/styles/bases/reset.css'
import '~/common/styles/bases/defaults.css'
import '~/common/styles/utils/content.article.css'
import '~/common/styles/utils/content.moment.css'
import '~/common/styles/utils/content.comment.css'
import '~/common/styles/utils/index.css'
import '~/common/styles/vendors/reach.css'
import '~/common/styles/vendors/fresnel.css'
import '~/common/styles/vendors/tippy.css'
import '~/common/styles/vendors/walletconnect.css'
import '~/common/styles/components/switch.css'
import '~/common/styles/components/gsc.css'
import '~/common/styles/components/ngprogress.css'
import '~/common/styles/components/stripe.css'
import '~/common/styles/components/subscriberAnalytics.css'

import TRANSLATIONS_ZH_HANS from '@/compiled-lang/zh-Hans.json'
import TRANSLATIONS_ZH_HANT from '@/compiled-lang/zh-Hant.json'
import TRANSLATIONS_EN from '@/compiled-lang/en.json'

export const parameters = {
  actions: { argTypesRegex: '^on[A-Z].*' },
  viewport: {
    viewports: INITIAL_VIEWPORTS,
    defaultViewport: 'iphonex',
  },
}

export const decorators = [
  (Story) => (
    <IntlProvider
      locale="en" // lang
      messages={{
        en: TRANSLATIONS_EN,
        'zh-Hans': TRANSLATIONS_ZH_HANS,
        'zh-Hant': TRANSLATIONS_ZH_HANT,
      }}
    >
      <Story />
    </IntlProvider>
  ),
]
export const tags = ['autodocs']
