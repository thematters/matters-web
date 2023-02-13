import { useIntl } from 'react-intl'

import { GUIDE_LINKS } from '~/common/enums'
import contentStyles from '~/common/styles/utils/content.article.css'
import detailsStyles from '~/common/styles/utils/details.css'
import { captureClicks } from '~/common/utils'
import { Head, Layout } from '~/components'

const Guide = () => {
  const intl = useIntl()
  return (
    <Layout.Main>
      <Layout.Header
        left={<Layout.Header.BackButton />}
        right={<Layout.Header.Title id="guide" />}
      />

      <Head title={{ id: 'guide' }} />

      <Layout.Spacing>
        <section
          dangerouslySetInnerHTML={{
            __html: intl.formatMessage(
              {
                defaultMessage: `
              <p>Welcome to Matters!</p>
              
              <h2>For Creators and Readers</h2>
              <p>If you have just landed in Matterverse, here are two must-read features guidance to help you sail. How to use Matters.News' editor? What is IPFS? How to check your income and balance? How to discover more writing communities and participate in this self-regulated community?</p>
              {link}
             
              `,
              },
              {
                link: `<a className="u-link-green" href="${GUIDE_LINKS.readerToolbox.en}">Toolkit for Matters Readers</a>`,
                // authorToolbox: GUIDE_LINKS.authorToolbox.en,
                // PWA: GUIDE_LINKS.PWA.en,
                // connectWallet: GUIDE_LINKS.connectWallet.en,
                // payment: GUIDE_LINKS.payment.en,
                // mobilePayment: GUIDE_LINKS.mobilePayment.en,
                // RSS: GUIDE_LINKS.RSS.en
              }
            ),
          }}
          className="u-content"
          onClick={captureClicks}
        />
      </Layout.Spacing>

      <style jsx global>
        {contentStyles}
      </style>
      <style jsx global>
        {detailsStyles}
      </style>
    </Layout.Main>
  )
}

export default Guide
