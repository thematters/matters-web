import { FormattedMessage, useIntl } from 'react-intl'

import IMAGE_INTRO from '@/public/static/images/intro.jpg'
import { PATHS } from '~/common/enums'
import { Button, Head, Layout, TextIcon, Translate } from '~/components'

import styles from './styles.module.css'
import { Term } from './Term'

const ToS = () => {
  const intl = useIntl()

  return (
    <Layout.Main>
      <Layout.Header
        left={
          <Layout.Header.Title>
            <FormattedMessage
              defaultMessage="Terms and Privacy Policy"
              id="LphWYP"
            />
          </Layout.Header.Title>
        }
      />

      <Head
        title={intl.formatMessage({
          defaultMessage: 'Terms and Privacy Policy',
          id: 'LphWYP',
        })}
        image={IMAGE_INTRO.src}
      />

      <Layout.Main.Spacing>
        <section className={styles.transparencyEntry}>
          <div>
            <h2>
              <Translate
                zh_hant="平台治理與透明度"
                zh_hans="平台治理与透明度"
                en="Governance and Transparency"
              />
            </h2>
            <p>
              <Translate
                zh_hant="查看內容治理、申訴機制、政府與個資請求統計，以及定期透明度報告。"
                zh_hans="查看内容治理、申诉机制、政府与个人资料请求统计，以及定期透明度报告。"
                en="Review content governance, appeals, government and privacy request metrics, and periodic transparency reports."
              />
            </p>
          </div>
          <Button
            borderColor="green"
            href={PATHS.TRANSPARENCY}
            size={[null, '2.25rem']}
            spacing={[0, 16]}
          >
            <TextIcon color="green" size={14} weight="medium">
              <Translate
                zh_hant="前往透明度中心"
                zh_hans="前往透明度中心"
                en="Open Transparency Center"
              />
            </TextIcon>
          </Button>
        </section>
        <Term />
      </Layout.Main.Spacing>
    </Layout.Main>
  )
}

export default ToS
