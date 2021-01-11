import gql from 'graphql-tag'

import { DonationDialog, Translate } from '~/components'

import DonationButton from './DonationButton'
import Donators from './Donators'
import styles from './styles.css'

import { DonationAreaArticle } from './__generated__/DonationAreaArticle'

interface DonationProps {
  article: DonationAreaArticle
}

const fragments = {
  article: gql`
    fragment DonationAreaArticle on Article {
      id
      author {
        ...UserDonationRecipient
      }
      ...DonatorsArticle
    }
    ${Donators.fragments.article}
    ${DonationDialog.fragments.recipient}
  `,
}

const DonationArea = ({ article }: DonationProps) => {
  return (
    <section className="container">
      <DonationButton recipient={article.author} targetId={article.id} />

      <p>
        <Translate zh_hant="喜歡我的文章嗎？" zh_hans="喜欢我的文章吗？" />
      </p>
      <p>
        <Translate
          zh_hant="別忘了給點支持與讚賞，讓我知道創作的路上有你陪伴。"
          zh_hans="别忘了给点支持与赞赏，让我知道创作的路上有你陪伴。"
        />
      </p>

      <Donators article={article} />

      <style jsx>{styles}</style>
    </section>
  )
}

DonationArea.fragments = fragments

export default DonationArea
