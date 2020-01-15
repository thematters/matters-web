import { useContext } from 'react'

import {
  Footer,
  Head,
  LanguageContext,
  PageHeader,
  Translate
} from '~/components'
import MigrationModal from '~/components/Modal/MigrationModal'
import { ModalInstance, ModalSwitch } from '~/components/ModalManager'

import { TEXT } from '~/common/enums'
import contentStyles from '~/common/styles/utils/content.article.css'
import { translate } from '~/common/utils'

import content from './content'
import styles from './styles.css'

const Migration = () => {
  const { lang } = useContext(LanguageContext)

  const title = translate({
    zh_hant: TEXT.zh_hant.migration,
    zh_hans: TEXT.zh_hans.migration,
    lang
  })

  return (
    <main className="l-row">
      <article className="l-col-4 l-col-md-5 l-col-lg-8">
        <Head title={title} />

        <PageHeader pageTitle={title} />

        <article
          dangerouslySetInnerHTML={{
            __html: translate({
              ...content,
              lang
            })
          }}
          className="u-content"
        />

        <h3>
          <Translate zh_hant="點擊" zh_hans="点击" />
          <ModalSwitch modalId="migrationModal">
            {(open: any) => (
              <span onClick={e => open()} className="modal-button">
                <Translate zh_hant="這裡" zh_hans="这里" />
              </span>
            )}
          </ModalSwitch>
          <Translate
            zh_hant="，即可馬上開始搬家。"
            zh_hans="，即可马上开始搬家。"
          />
        </h3>
        <br />
        <br />
        <br />
        <style jsx>{contentStyles}</style>
        <style jsx>{styles}</style>
      </article>

      <aside className="l-col-4 l-col-md-3 l-col-lg-4">
        <Footer />
      </aside>

      <ModalInstance modalId="migrationModal" title="migration">
        {(props: ModalInstanceProps) => <MigrationModal {...props} />}
      </ModalInstance>
    </main>
  )
}

export default Migration
