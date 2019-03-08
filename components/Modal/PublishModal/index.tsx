import { withFormik } from 'formik'
import { FC, useContext, useState } from 'react'

import { LanguageContext } from '~/components/Language'
import { Title } from '~/components/Title'

import { translate } from '~/common/utils'
import PUBLISH_SLIDE_1 from '~/static/images/publish-1.svg'
import PUBLISH_SLIDE_2 from '~/static/images/publish-2.svg'
import PUBLISH_SLIDE_3 from '~/static/images/publish-3.svg'
import PUBLISH_SLIDE_4 from '~/static/images/publish-4.svg'

import styles from './styles.css'

/**
 * This component is for publishing modal.
 *
 * Usage:
 *
 * ```jsx
 *   <PublishModal close={close} />
 * ```
 */

const dummy = [0, 1, 2, 3]

const Indicator = ({ slide, setSlide }: any) => (
  <>
    <div className="indicator">
      {dummy.map(item =>
        item === slide ? (
          <div key={item} className="active" />
        ) : (
          <div key={item} onClick={() => setSlide(item)} />
        )
      )}
    </div>
    <style jsx>{styles}</style>
  </>
)

const Descriptions = ({ data }: any) => (
  <>
    <div className="descriptions">
      {data.map((desc: string, index: number) => (
        <div className="description">
          {desc}
          <div className="number">{`0${index + 1}`}</div>
        </div>
      ))}
    </div>
    <style jsx>{styles}</style>
  </>
)

const PublishSlide = ({ lang }: { lang: Language }) => {
  const [slide, setSlide] = useState<number>(0)

  const images = [
    PUBLISH_SLIDE_1,
    PUBLISH_SLIDE_2,
    PUBLISH_SLIDE_3,
    PUBLISH_SLIDE_4
  ]

  const titles = [
    translate({
      zh_hant: '文章即將發佈到分佈式網絡',
      zh_hans: '文章即将发布到分布式网络',
      lang
    }),
    translate({
      zh_hant: '文章擁有唯一的數字指紋',
      zh_hans: '文章拥有唯一的数字指纹',
      lang
    }),
    translate({
      zh_hant: '文章將永久存儲在IPFS上',
      zh_hans: '文章将永久存储在IPFS上',
      lang
    }),
    translate({
      zh_hant: '發佈之後可從站內隱藏',
      zh_hans: '发布之后可从站内隐藏',
      lang
    })
  ]

  const descriptions = [
    translate({
      zh_hant:
        '文章將發佈並永久存儲在星際文件系統（IPFS）分佈式節點中。存儲費用目前由Matters平台支付。',
      zh_hans:
        '文章将发布并永久存储在星际文件系统（IPFS）分布式节点中。存储费用目前由Matters平台支付。',
      lang
    }),
    translate({
      zh_hant:
        '文章在發佈的 2 分鐘內可撤回並重新編輯。2 分鐘後文章內容（標題、內文、用戶名）將不可修改。',
      zh_hans:
        '文章在发布的 2 分钟内可撤回并重新编辑。2 分钟后文章内容（标题、内文、用户名）将不可修改。',
      lang
    }),
    translate({
      zh_hant: '文章發佈後，可從站內隱藏，但無法從分佈式節點刪除。',
      zh_hans: '文章发布后，可从站内隐藏，但无法从分布式节点删除。',
      lang
    }),
    translate({
      zh_hant: '文章評論及互動僅保存在站上，可編輯，可刪除。',
      zh_hans: '文章评论及互动仅保存在站上，可编辑，可删除。',
      lang
    })
  ]

  return (
    <>
      <div className="slide">
        <img className="image" src={images[slide]} />
        <div className="title">
          <Title is="h3" type="modal" style={{ textAlign: 'center' }}>
            {titles[slide]}
          </Title>
        </div>
        <Indicator slide={slide} setSlide={setSlide} />
        <Descriptions data={descriptions} />
      </div>
      <style jsx>{styles}</style>
    </>
  )
}

export const PublishModal: FC<ModalInstanceProps> = ({ close }) => {
  const { lang } = useContext(LanguageContext)

  const cancelButton = translate({
    zh_hant: '暫存草稿箱',
    zh_hans: '暫存草稿箱',
    lang
  })

  const publishButton = translate({
    zh_hant: '發佈',
    zh_hans: '发布',
    lang
  })

  const BaseForm = (props: any) => (
    <>
      <form className="form" onSubmit={props.handleSubmit}>
        <div className="content">
          <PublishSlide lang={lang} />
        </div>
        <div className="buttons">
          <div className="button cancel">{cancelButton}</div>
          <button
            type="submit"
            className="button publish"
            disabled={props.isSubmitting}
          >
            {publishButton}
          </button>
        </div>
      </form>
      <style jsx>{styles}</style>
    </>
  )

  const PublishForm: any = withFormik({
    handleSubmit: (values, { props, setSubmitting }: any) => {
      const { submitAction } = props
      if (!submitAction) {
        return undefined
      }
      // submitAction({ variables: { input: { agreeOn: true } } })
      //   .then((result: any) => {
      //     close()
      //   })
      //   .catch((result: any) => {
      //     // TODO: Handle error
      //   })
      //   .finally(() => {
      //     setSubmitting(false)
      //   })
    }
  })(BaseForm)

  return (
    <PublishForm
      submitAction={() => {
        /* Do something */
      }}
    />
  )
}
