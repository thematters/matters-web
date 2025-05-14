import { useQuery } from '@apollo/client'
import { useContext, useState } from 'react'
import { FormattedMessage } from 'react-intl'

import { ReactComponent as IconTimes } from '@/public/static/icons/24px/times.svg'
import {
  Button,
  DraftDetailStateContext,
  EmptyLayout,
  Icon,
  QueryError,
  SpinnerBlock,
  Throw404,
} from '~/components'
import {
  ArticleAccessType,
  ArticleLicenseType,
  DraftDetailQueryQuery,
  DraftDetailViewerQueryQuery,
  PublishState as PublishStateType,
} from '~/gql/graphql'

import { DRAFT_DETAIL, DRAFT_DETAIL_VIEWER } from '../gql'
import { OptionContent } from '../OptionContent'
import styles from './styles.module.css'

const EMPTY_DRAFT: DraftDetailQueryQuery['node'] = {
  id: '',
  title: '',
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString(),
  publishState: PublishStateType.Unpublished,
  content: '',
  summary: '',
  summaryCustomized: false,
  __typename: 'Draft',
  article: null,
  cover: null,
  assets: [],
  tags: null,
  collection: {
    edges: null,
    __typename: 'ArticleConnection',
  },
  access: {
    type: ArticleAccessType.Public,
    circle: null,
    __typename: 'DraftAccess',
  },
  license: ArticleLicenseType.Cc_0,
  requestForDonation: null,
  replyToDonator: null,
  sensitiveByAuthor: false,
  iscnPublish: null,
  canComment: true,
  campaigns: [],
  indentFirstLine: false,
}

const OptionsPage = () => {
  const { getDraftId, isNewDraft } = useContext(DraftDetailStateContext)

  const [initNew] = useState(isNewDraft())

  const { data, loading, error } = useQuery<DraftDetailQueryQuery>(
    DRAFT_DETAIL,
    {
      variables: { id: getDraftId() },
      fetchPolicy: 'network-only',
      skip: isNewDraft(),
    }
  )

  const { data: viewerData, loading: viewerLoading } =
    useQuery<DraftDetailViewerQueryQuery>(DRAFT_DETAIL_VIEWER, {
      fetchPolicy: 'network-only',
    })

  const draft = (data?.node?.__typename === 'Draft' && data.node) || EMPTY_DRAFT
  const ownCircles = viewerData?.viewer?.ownCircles || undefined
  const appliedCampaigns = viewerData?.viewer?.campaigns.edges?.map(
    (e) => e.node
  )

  const goBack = () => {
    window.history.back()
  }

  if ((loading && !initNew) || viewerLoading) {
    return (
      <EmptyLayout>
        <SpinnerBlock />
      </EmptyLayout>
    )
  }

  if (error) {
    return (
      <EmptyLayout>
        <QueryError error={error} />
      </EmptyLayout>
    )
  }

  if (!draft && !isNewDraft()) {
    return (
      <EmptyLayout>
        <Throw404 />
      </EmptyLayout>
    )
  }

  return (
    <section className={styles.container}>
      <section className={styles.header}>
        <section>
          <h1>
            <FormattedMessage defaultMessage="Options" id="NDV5Mq" />
          </h1>
        </section>
        <section>
          <Button
            textColor="black"
            textActiveColor="greyDarker"
            onClick={goBack}
          >
            <Icon icon={IconTimes} size={24} />
          </Button>
        </section>
      </section>

      <OptionContent
        draft={draft}
        campaigns={appliedCampaigns}
        ownCircles={ownCircles}
      />
    </section>
  )
}

export default OptionsPage
