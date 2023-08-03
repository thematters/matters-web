import IMAGE_ILLUSTRATION_AVATAR from '@/public/static/images/illustration-avatar.svg'
import { Head, Layout, Translate } from '~/components'

import { AuthorPicker } from './AuthorPicker'
import styles from './styles.module.css'

const PickIntroHeader = () => {
  return (
    <header className={styles.header}>
      <img
        className={styles.avatar}
        src={IMAGE_ILLUSTRATION_AVATAR}
        aria-hidden="true"
        alt="illustration"
      />
      <section className={styles.intro}>
        <p>
          <Translate
            zh_hant="歡迎加入 Matters，一個自由、自主、永續的創作與公共討論空間。"
            zh_hans="欢迎加入 Matters，一个自由、自主、永续的创作与公共讨论空间。"
            en="Welcome to Matters, a free, autonomous and permanent space for creation and civil discourse."
          />
        </p>

        <p className={styles.sub}>
          <Translate
            zh_hant="請追蹤至少 "
            zh_hans="请追踪至少 "
            en="Please follow at least "
          />
          <span className={styles.hightlight}>5</span>
          <Translate
            zh_hant=" 位創作者，以開啓你的個性化訂閱時間線。"
            zh_hans=" 位创作者，以开启你的个性化订阅时间线。"
            en=" creators to enable your personal feed."
          />
        </p>
      </section>
    </header>
  )
}

const PickAuthors = () => (
  <>
    <Head title={{ id: 'followAuthor' }} />

    <Layout.Main.Spacing>
      <PickIntroHeader />
    </Layout.Main.Spacing>

    <AuthorPicker title={<Translate id="followAuthor" />} />
  </>
)

export default PickAuthors
