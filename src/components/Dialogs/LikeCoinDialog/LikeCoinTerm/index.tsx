import { useContext } from 'react'

import { Dialog, LanguageContext, Translate } from '~/components'

import contentStyles from '~/common/styles/utils/content.article.css'
import { translate } from '~/common/utils'

import content from './content'
import styles from './styles.css'

interface LikeCoinTermProps {
  nextStep: () => void
  closeDialog: () => void
}

const LikeCoinTerm: React.FC<LikeCoinTermProps> = ({
  nextStep,
  closeDialog,
}) => {
  const { lang } = useContext(LanguageContext)

  return (
    <>
      <Dialog.Header
        title={
          <Translate
            zh_hant="Matters 與 LikeCoin 合作了！"
            zh_hans="Matters 与 LikeCoin 合作了！"
          />
        }
        close={closeDialog}
      />

      <Dialog.Content spacing={['base', 'base']}>
        <section
          className="container u-content"
          dangerouslySetInnerHTML={{
            __html: translate({
              ...content,
              lang,
            }),
          }}
        />
      </Dialog.Content>

      <Dialog.Footer>
        <Dialog.Footer.Button onClick={nextStep}>
          <Translate id="agreeAndContinue" />
        </Dialog.Footer.Button>
      </Dialog.Footer>

      <style jsx>{styles}</style>
      <style jsx>{contentStyles}</style>
    </>
  )
}

export default LikeCoinTerm
