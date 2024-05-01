import React from 'react'

import { EXTERNAL_LINKS } from '~/common/enums'
import { Button, TextIcon, toast, Translate } from '~/components'

import styles from './styles.module.css'

const Toasts = () => (
  <section>
    <div className={styles.area}>
      <p>triggered toast will be showing here</p>
    </div>

    <section className={styles.buttons}>
      <Button
        spacing={[8, 8]}
        bgColor="red"
        onClick={() => {
          toast.error({
            message: (
              <Translate
                zh_hant="開啓失敗，請檢查網路連線"
                zh_hans="开启失败，请检查网路连线"
              />
            ),
          })
        }}
      >
        <TextIcon color="white">Error</TextIcon>
      </Button>

      <Button
        spacing={[8, 8]}
        bgColor="greenLighter"
        onClick={() => {
          toast.success({
            message: <Translate id="successUploadImage" />,
          })
        }}
      >
        <TextIcon color="green">Success</TextIcon>
      </Button>

      <Button
        spacing={[8, 8]}
        bgColor="greenLighter"
        onClick={() => {
          toast.success({
            message: (
              <Translate
                zh_hant="你對作品送出了一個 Super Like！"
                zh_hans="你对作品送出了一个 Super Like！"
                en="You sent a Super Like to this article!"
              />
            ),
            actions: [
              {
                content: (
                  <Translate zh_hant="詳情" zh_hans="详情" en="More info" />
                ),
                htmlHref: EXTERNAL_LINKS.SUPER_LIKE,
                htmlTarget: '_blank',
              },
            ],
          })
        }}
      >
        <TextIcon color="green">Custom Button</TextIcon>
      </Button>
    </section>
  </section>
)

export default Toasts
