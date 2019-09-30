import { FC, useContext } from 'react'

import { LanguageContext, Translate } from '~/components/Language'
import { Modal } from '~/components/Modal'
import { ModalSwitch } from '~/components/ModalManager'

import { TEXT } from '~/common/enums'
import contentStyles from '~/common/styles/utils/content.article.css'
import { translate } from '~/common/utils'

import content from './content'
import styles from './styles.css'

interface Props {
  submitCallback: () => void
}

const LikeCoinTermModal: FC<ModalInstanceProps & Props> = ({
  submitCallback
}) => {
  const { lang } = useContext(LanguageContext)

  return (
    <>
      <Modal.Content spacing="none" layout="full-width">
        <section
          dangerouslySetInnerHTML={{
            __html: translate({
              ...content,
              lang
            })
          }}
          className="container u-content"
        />

        <footer>
          <ModalSwitch modalId="setupLikerIdModal">
            {(open: any) => (
              <Modal.FooterButton
                onClick={() => {
                  open()
                  submitCallback()
                }}
                width="full"
              >
                <Translate
                  zh_hant={TEXT.zh_hant.agreeAndContinue}
                  zh_hans={TEXT.zh_hans.agreeAndContinue}
                />
              </Modal.FooterButton>
            )}
          </ModalSwitch>
        </footer>
      </Modal.Content>

      <style jsx>{styles}</style>
      <style jsx>{contentStyles}</style>
    </>
  )
}

export default LikeCoinTermModal
