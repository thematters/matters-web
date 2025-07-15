import { useState } from 'react'
import { FormattedMessage } from 'react-intl'

import IconTimes from '@/public/static/icons/24px/times.svg'
import { Button, Icon, useRoute } from '~/components'

import { DraftLoadingStates } from '../DraftLoadingStates'
import { getOptionTabByType, OptionTab, useDraftDetail } from '../hooks'
import { OptionContent } from '../OptionContent'
import styles from './styles.module.css'

const OptionsPage = () => {
  const {
    draft,
    viewerData,
    ownCircles,
    appliedCampaigns,
    ownCollections,
    loading,
    error,
    isNewDraft,
    loadMoreCollections,
  } = useDraftDetail()

  const { getQuery } = useRoute()
  const type = getQuery('type')
  const [tab, setTab] = useState<OptionTab>(getOptionTabByType(type))

  const goBack = () => {
    window.history.back()
  }

  return (
    <DraftLoadingStates
      loading={loading}
      error={error}
      draft={draft}
      isNewDraft={isNewDraft}
    >
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
          tab={tab}
          setTab={setTab}
          draft={draft}
          draftViewer={viewerData}
          campaigns={appliedCampaigns}
          ownCircles={ownCircles}
          ownCollections={ownCollections}
          loadMoreCollections={loadMoreCollections}
        />
      </section>
    </DraftLoadingStates>
  )
}

export default OptionsPage
