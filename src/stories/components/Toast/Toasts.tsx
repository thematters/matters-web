import React from 'react'

import { EXTERNAL_LINKS } from '~/common/enums'
import { Button, Layout, TextIcon, toast, Translate } from '~/components'

import styles from './styles.module.css'

const Toasts = () => (
  <section>
    {/* Fixed */}
    <h3 className={styles.h3}>Fixed Toasts</h3>
    <div className={styles.area}>
      <p>triggered toast will be showing here</p>
    </div>

    <section className={styles.buttons}>
      <Button
        spacing={['xtight', 'xtight']}
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
        spacing={['xtight', 'xtight']}
        bgColor="greenLighter"
        onClick={() => {
          toast.error({
            message: <Translate id="successUploadImage" />,
          })
        }}
      >
        <TextIcon color="green">Success</TextIcon>
      </Button>

      <Button
        spacing={['xtight', 'xtight']}
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

    {/* Static */}
    <h3 className={styles.h3}>Static Toasts</h3>
    <Layout.Notice
      color="green"
      content={<Translate id="publishing" />}
      subDescription={
        <Translate
          zh_hant="上鏈後，作品不可刪除，去中心化保存"
          zh_hans="上链后，作品不可删除，去中心化保存"
        />
      }
    />

    <Layout.Notice
      color="red"
      content={<Translate id="failurePublish" />}
      subDescription={
        <Translate zh_hant="請檢查網絡後重試" zh_hans="请检查网络后重试" />
      }
    />

    <Layout.Notice
      color="grey"
      content={
        <Translate
          zh_hant="此作品因違反用戶協定而被強制隱藏。"
          zh_hans="此作品因违反用户协定而被强制隐藏。"
        />
      }
    />
  </section>
)

export default Toasts
