import { analytics } from '~/common/utils'
import { Dialog, GoogleSearchDialog, TextIcon, Translate } from '~/components'

import styles from './styles.module.css'

const GoogleSearchButton = () => {
  return (
    <GoogleSearchDialog>
      {({ openDialog: openGoogleSearchDialog }) => (
        <section className={styles.googleSearchArea}>
          <p>
            <TextIcon size="md">
              <Translate
                zh_hant="找不到你想要的結果嗎？"
                zh_hans="找不到你想要的结果吗？"
                en="Can't find what you are looking for?"
              />
            </TextIcon>
          </p>

          <Dialog.RoundedButton
            text={
              <Translate
                zh_hant="改使用 Google 搜尋關鍵字"
                zh_hans="改使用 Google 搜索关键字"
                en="Search Matters on Google"
              />
            }
            color="greyDarker"
            type="button"
            onClick={() => {
              analytics.trackEvent('click_button', { type: 'google_search' })
              openGoogleSearchDialog()
            }}
          />
        </section>
      )}
    </GoogleSearchDialog>
  )
}

export default GoogleSearchButton
