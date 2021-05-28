import { Dialog, GoogleSearchDialog, TextIcon, Translate } from '~/components'

import { analytics } from '~/common/utils'

import styles from './styles.css'

const GoogleSearchButton = () => {
  return (
    <GoogleSearchDialog>
      {({ openDialog: openGoogleSearchDialog }) => (
        <section className="google-search-area">
          <p>
            <TextIcon size="md">
              <Translate
                zh_hant="找不到你想要的結果嗎？"
                zh_hans="找不到你想要的结果吗？"
                en="Cannot fnd what you are looking for?"
              />
            </TextIcon>
          </p>

          <Dialog.Footer.Button
            type="button"
            onClick={() => {
              analytics.trackEvent('click_button', { type: 'google_search' })
              openGoogleSearchDialog()
            }}
            implicit
          >
            <Translate
              zh_hant="改使用 Google 搜尋關鍵字"
              zh_hans="改使用 Google 搜索关键字"
              en="Search Matters with Google"
            />
          </Dialog.Footer.Button>

          <style jsx>{styles}</style>
        </section>
      )}
    </GoogleSearchDialog>
  )
}

export default GoogleSearchButton
