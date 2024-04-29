import gql from 'graphql-tag'
import _get from 'lodash/get'
import { useContext } from 'react'

import { ReactComponent as IconComment } from '@/public/static/icons/24px/comment.svg'
import { URL_FRAGMENT } from '~/common/enums'
import { numAbbr, toPath, translate } from '~/common/utils'
import { Button, Icon, LanguageContext, TextIcon } from '~/components'
import { ActionsResponseCountArticleFragment } from '~/gql/graphql'

interface ResponseCountProps {
  article: ActionsResponseCountArticleFragment
}

const fragments = {
  article: gql`
    fragment ActionsResponseCountArticle on Article {
      id
      slug
      articleState: state
      mediaHash
      responseCount
      author {
        userName
      }
    }
  `,
}

const ResponseCount = ({ article }: ResponseCountProps) => {
  const { lang } = useContext(LanguageContext)

  const { articleState: state } = article
  const path = toPath({
    page: 'articleDetail',
    article,
    fragment: URL_FRAGMENT.COMMENTS,
  })
  const isBanned = state === 'banned'

  return (
    <Button
      spacing={['xtight', 'xtight']}
      bgActiveColor="greyLighterActive"
      {...path}
      disabled={isBanned}
      aria-label={translate({
        zh_hant: '查看回應',
        zh_hans: '查看回应',
        en: 'View responses',
        lang,
      })}
    >
      <TextIcon
        icon={<Icon icon={IconComment} />}
        color="grey"
        weight="md"
        size="sm"
      >
        {article.responseCount > 0 ? numAbbr(article.responseCount) : undefined}
      </TextIcon>
    </Button>
  )
}

ResponseCount.fragments = fragments

export default ResponseCount
