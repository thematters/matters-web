import { useContext } from 'react'

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

import { ReactComponent as IconOnboardLaunch } from '@/public/static/icons/40px/navigation.svg'

import OnboardingTasksDialog from '../Dialog'
import styles from './styles.css'

const NavBar = () => {
  const viewer = useContext(ViewerContext)
  const doneCount = Object.values(viewer.onboardingTasks.tasks).reduce(
    (sum, next) => sum + (next ? 1 : 0),
    0
  )

  return (
    <section className="nav-bar">
      <Layout.FixedMain>
        <OnboardingTasksDialog>
          {({ openDialog: openOnboardingTasksDialog }) => (
            <Card
              bgColor="none"
              spacing={[0, 0]}
              onClick={openOnboardingTasksDialog}
            >
              <section className="content">
                <section className="inner">
                  <section className="left">
                    {withIcon(IconOnboardLaunch)({
                      size: 'xl-m',
                      color: 'gold',
                    })}

                    <p>
                      <Translate
                        zh_hant="星際導航"
                        zh_hans="星际导航"
                        en="Galaxy Guide"
                      />
                      <span className="highlight"> {doneCount}/5</span>
                    </p>
                  </section>

                  <section className="right">
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

      <style jsx>{styles}</style>
    </section>
  )
}

export default NavBar
