import { useContext } from 'react'

import { ReactComponent as IconOnboardLaunch } from '@/public/static/icons/40px/navigation.svg'
import {
  Card,
  IconArrowRight16,
  Layout,
  RecommendAuthorDialog,
  RecommendTagDialog,
  Translate,
  ViewerContext,
  withIcon,
} from '~/components'

import OnboardingTasksDialog from '../Dialog'
import styles from './styles.module.css'

const NavBar = () => {
  const viewer = useContext(ViewerContext)
  const doneCount = Object.values(viewer.onboardingTasks.tasks).reduce(
    (sum, next) => sum + (next ? 1 : 0),
    0
  )

  return (
    <section className={styles.navBar}>
      <Layout.FixedMain>
        <OnboardingTasksDialog>
          {({ openDialog: openOnboardingTasksDialog }) => (
            <Card
              bgColor="none"
              spacing={[0, 0]}
              onClick={openOnboardingTasksDialog}
              aria-haspopup="dialog"
              role="button"
            >
              <section className={styles.content}>
                <section className={styles.inner}>
                  <section className={styles.left}>
                    {withIcon(IconOnboardLaunch)({
                      size: 'xlM',
                      color: 'gold',
                    })}

                    <p>
                      <Translate
                        zh_hant="星際導航"
                        zh_hans="星际导航"
                        en="Galaxy Guide"
                      />
                      <span className="u-highlight"> {doneCount}/5</span>
                    </p>
                  </section>

                  <section className={styles.right}>
                    <IconArrowRight16 color="grey" />
                  </section>
                </section>
              </section>
            </Card>
          )}
        </OnboardingTasksDialog>
      </Layout.FixedMain>

      <RecommendAuthorDialog />
      <RecommendTagDialog />
    </section>
  )
}

export default NavBar
