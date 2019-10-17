import _get from 'lodash/get'

import { Head, Translate } from '~/components'
import AuthorPicker from '~/components/Follow/AuthorPicker'

import { TEXT } from '~/common/enums'
import IMAGE_ILLUSTRATION_AVATAR from '~/static/images/illustration-avatar.svg'

import styles from './styles.css'

const PickIntroHeader = () => {
  return (
    <header>
      <img
        className="avatar"
        src={IMAGE_ILLUSTRATION_AVATAR}
        aria-hidden="true"
      />
      <section className="intro">
        <p>
          <Translate
            zh_hant="歡迎加入 Matters，一個自由、自主、永續的創作與公共討論空間。"
            zh_hans="欢迎加入 Matters，一个自由、自主、永续的创作与公共讨论空间。"
          />
        </p>

        <p className="sub">
          <Translate zh_hant="請追蹤至少 " zh_hans="请追踪至少 " />
          <span className="hightlight">5</span>
          <Translate
            zh_hant=" 位創作者，以開啓你的個性化訂閱時間線。"
            zh_hans=" 位创作者，以开启你的个性化订阅时间线。"
          />
        </p>
      </section>

      <style jsx>{styles}</style>
    </header>
  )
}

const PickAuthors = ({ viewer }: { [key: string]: any }) => (
  <>
    <Head
      title={{
        zh_hant: TEXT.zh_hant.followAuthor,
        zh_hans: TEXT.zh_hans.followAuthor
      }}
    />
    <PickIntroHeader />
    <AuthorPicker
      viewer={viewer}
      title={
        <Translate
          zh_hant={TEXT.zh_hant.followAuthor}
          zh_hans={TEXT.zh_hans.followAuthor}
        />
      }
    />

    <style jsx>{styles}</style>
  </>
)

PickAuthors.fragments = AuthorPicker.fragments

export default PickAuthors
