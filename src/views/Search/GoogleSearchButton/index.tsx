import { Dialog, GoogleSearchDialog, TextIcon, Translate } from '~/components'

import styles from './styles.css'

const GoogleSearchButton = () => {
  return (
    <GoogleSearchDialog>
      {({ open: openGoogleSearchDialog }) => (
        <section className="google-search-area">
          <p>
            <TextIcon size="md">
              <Translate
                zh_hant="找不到你想要的結果嗎？"
                zh_hans="找不到你想要的结果吗？"
              />
            </TextIcon>
          </p>

          <Dialog.Footer.Button
            type="button"
            onClick={openGoogleSearchDialog}
            implicit
          >
            <Translate
              zh_hant="改使用 Google 搜尋文章內容關鍵字"
              zh_hans="改使用 Google 搜索文章内容关键字"
            />
          </Dialog.Footer.Button>

          <style jsx>{styles}</style>
        </section>
      )}
    </GoogleSearchDialog>
  )
}

export default GoogleSearchButton
