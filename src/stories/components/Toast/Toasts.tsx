import React from 'react'

import { ADD_TOAST } from '~/common/enums'
import { Button, TextIcon, Toast, Translate } from '~/components'
import ViewSuperLikeButton from '~/views/ArticleDetail/AppreciationButton/ViewSuperLikeButton'

import styles from './styles.module.css'

const Toasts = () => (
  <section>
    {/* Fixed */}
    <h3 className={styles.h3}>Fixed Toasts</h3>
    <div className={styles.area}>
      <p>triggered toast will be showing here</p>
    </div>
    <Toast.Container />

    <section className={styles.buttons}>
      <Button
        spacing={['xtight', 'xtight']}
        bgColor="red"
        onClick={() => {
          window.dispatchEvent(
            new CustomEvent(ADD_TOAST, {
              detail: {
                color: 'red',
                content: (
                  <Translate
                    zh_hant="開啓失敗，請檢查網路連線"
                    zh_hans="开启失败，请检查网路连线"
                  />
                ),
              },
            })
          )
        }}
      >
        <TextIcon color="white">Error</TextIcon>
      </Button>

      <Button
        spacing={['xtight', 'xtight']}
        bgColor="greenLighter"
        onClick={() => {
          window.dispatchEvent(
            new CustomEvent(ADD_TOAST, {
              detail: {
                color: 'green',
                content: <Translate id="successUploadImage" />,
              },
            })
          )
        }}
      >
        <TextIcon color="green">Success</TextIcon>
      </Button>

      <Button
        spacing={['xtight', 'xtight']}
        bgColor="greenLighter"
        onClick={() => {
          window.dispatchEvent(
            new CustomEvent(ADD_TOAST, {
              detail: {
                color: 'green',
                content: (
                  <Translate
                    zh_hant="你對作品送出了一個 Super Like！"
                    zh_hans="你对作品送出了一个 Super Like！"
                    en="You sent a Super Like to this article!"
                  />
                ),
                customButton: <ViewSuperLikeButton />,
                buttonPlacement: 'center',
              },
            })
          )
        }}
      >
        <TextIcon color="green">Custom Button</TextIcon>
      </Button>
    </section>

    {/* Static */}
    <h3 className={styles.h3}>Static Toasts</h3>
    <Toast.Instance
      color="green"
      content={<Translate id="publishing" />}
      subDescription={
        <Translate
          zh_hant="上鏈後，作品不可刪除，去中心化保存"
          zh_hans="上链后，作品不可删除，去中心化保存"
        />
      }
    />

    <Toast.Instance
      color="red"
      content={<Translate id="failurePublish" />}
      subDescription={
        <Translate zh_hant="請檢查網絡後重試" zh_hans="请检查网络后重试" />
      }
    />

    <Toast.Instance
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
