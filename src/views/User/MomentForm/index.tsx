import dynamic from 'next/dynamic'
import { useContext, useEffect, useState } from 'react'

import { OPEN_MOMENT_FORM, URL_USER_PROFILE } from '~/common/enums'
import { Media, SpinnerBlock, useRoute, ViewerContext } from '~/components'

const DynamicMomentForm = dynamic(
  () => import('~/components/Forms/MomentForm'),
  {
    loading: () => <SpinnerBlock />,
  }
)

import styles from './styles.module.css'

const MomentForm = () => {
  const viewer = useContext(ViewerContext)
  const { getQuery, router } = useRoute()
  const userName = getQuery('name')
  const isViewer = viewer.userName === userName
  const [formRendered, setFormRendered] = useState(false)

  useEffect(() => {
    if (!formRendered) {
      return
    }
    const key = URL_USER_PROFILE.OPEN_POST_MOMENT_FORM.key
    const value = getQuery(key)
    const editing = value === URL_USER_PROFILE.OPEN_POST_MOMENT_FORM.value
    if (editing && isViewer) {
      window.dispatchEvent(new CustomEvent(OPEN_MOMENT_FORM))
    }
  }, [router.query, formRendered])

  return (
    <>
      {isViewer && (
        <Media greaterThanOrEqual="md">
          <section className={styles.momentForm}>
            <DynamicMomentForm setFirstRendered={setFormRendered} />
          </section>
        </Media>
      )}
    </>
  )
}

export default MomentForm
