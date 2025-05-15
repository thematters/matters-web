import { FormattedMessage } from 'react-intl'

import { ReactComponent as IconTimes } from '@/public/static/icons/24px/times.svg'
import { Button, Icon } from '~/components'

import { DraftLoadingStates } from '../DraftLoadingStates'
import { useDraftDetail } from '../hooks'
import { OptionContent } from '../OptionContent'
import styles from './styles.module.css'

const OptionsPage = () => {
  const { draft, ownCircles, appliedCampaigns, loading, error, isNewDraft } =
    useDraftDetail()

  const goBack = () => {
    window.history.back()
  }

  const loadingStates = (
    <DraftLoadingStates
      loading={loading}
      error={error}
      draft={draft}
      isNewDraft={isNewDraft}
    />
  )

  if (loadingStates) return loadingStates

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
