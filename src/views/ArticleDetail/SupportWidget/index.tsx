import classNames from 'classnames'

import { CircleDigest, Translate } from '~/components'

import { analytics } from '~/common/utils'

import DonationButton from './DonationButton'
import Donators from './Donators'
import { fragments } from './gql'
import styles from './styles.css'

import { SupportWidgetArticlePrivate } from './__generated__/SupportWidgetArticlePrivate'
import { SupportWidgetArticlePublic } from './__generated__/SupportWidgetArticlePublic'

interface DonationProps {
  article: SupportWidgetArticlePublic & Partial<SupportWidgetArticlePrivate>
}

const SupportWidget = ({ article }: DonationProps) => {
  const supportWidgetClasses = classNames({
    'support-widget': true,
    hasCircle: article.circle,
  })

  return (
    <section className={supportWidgetClasses}>
      <section className="donation">
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
      </section>

      {article.circle && (
        <section className="circle">
          <CircleDigest.Rich
            circle={article.circle}
            bgColor="grey-lighter"
            hasFooter
            hasPrice
            onClickPrice={() => {
              analytics.trackEvent('click_button', {
                type: 'subscribe_circle_price',
                pageType: 'article_detail',
              })
            }}
          />
        </section>
      )}

      <style jsx>{styles}</style>
    </section>
  )
}

SupportWidget.fragments = fragments

export default SupportWidget
