import { Translate } from '~/components'

import DonationButton from './DonationButton'
import Donators from './Donators'
import { fragments } from './gql'
import styles from './styles.css'

import { SupportWidgetArticle } from './__generated__/SupportWidgetArticle'

interface DonationProps {
  article: SupportWidgetArticle
}

const SupportWidget = ({ article }: DonationProps) => {
  return (
    <section className="support-widget">
      <section className="donation-button">
        <DonationButton recipient={article.author} targetId={article.id} />
      </section>

      <p>
        <Translate zh_hant="喜歡我的文章嗎？" zh_hans="喜欢我的文章吗？" />
        <br />
        <Translate
          zh_hant="別忘了給點支持與讚賞，讓我知道創作的路上有你陪伴。"
          zh_hans="别忘了给点支持与赞赏，让我知道创作的路上有你陪伴。"
        />
      </p>

      <section className="donators">
        <Donators article={article} />
      </section>

      <style jsx>{styles}</style>
    </section>
  )
}

SupportWidget.fragments = fragments

export default SupportWidget
