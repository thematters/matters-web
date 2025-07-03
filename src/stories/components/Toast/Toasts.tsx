import React from 'react'
import { FormattedMessage } from 'react-intl'

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
          toast.info({
            message: (
              <FormattedMessage defaultMessage="Image uploaded" id="TcTp+J" />
            ),
          })
        }}
      >
        <TextIcon color="green">Success</TextIcon>
      </Button>
    </section>
  </section>
)

export default Toasts
