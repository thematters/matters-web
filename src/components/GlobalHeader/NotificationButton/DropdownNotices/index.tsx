import {
  Button,
  EmptyNotice,
  Error,
  Icon,
  List,
  Notice,
  Spinner,
  TextIcon,
  Translate
} from '~/components'

import { PATHS } from '~/common/enums'

import styles from './styles.css'

import { MeNotifications } from '~/components/GQL/queries/__generated__/MeNotifications'

interface DropdownNoticesProps {
  data?: MeNotifications
  loading: boolean
  error: any
}

const Header = () => (
  <header>
    <h4>
      <Translate id="notification" />
    </h4>

    <Button
      spacing={['xxtight', 'xtight']}
      bgHoverColor="grey-lighter"
      {...PATHS.ME_SETTINGS_NOTIFICATION}
    >
      <TextIcon icon={<Icon.SettingsMedium />} color="grey-dark">
        <Translate id="setting" />
      </TextIcon>
    </Button>

    <style jsx>{styles}</style>
  </header>
)

const Footer = () => (
  <footer>
    <Button
      spacing={['xxtight', 'xtight']}
      bgHoverColor="green-lighter"
      {...PATHS.ME_NOTIFICATIONS}
    >
      <TextIcon
        icon={<Icon.Right size="xs" />}
        color="green"
        textPlacement="left"
        weight="md"
      >
        <Translate id="allNotification" />
      </TextIcon>
    </Button>

    <style jsx>{styles}</style>
  </footer>
)

const DropdownNotices = ({ data, loading, error }: DropdownNoticesProps) => {
  if (loading) {
    return (
      <section className="container">
        <Header />

        <section className="content">
          <Spinner />
        </section>

        <Footer />

        <style jsx>{styles}</style>
      </section>
    )
  }

  if (error) {
    return (
      <section className="container">
        <Header />

        <section className="content">
          <Error error={error} />
        </section>

        <Footer />

        <style jsx>{styles}</style>
      </section>
    )
  }

  const edges = data?.viewer?.notices.edges

  return (
    <section className="container">
      <Header />

      <section className="content">
        <List spacing={['xloose', 0]} hasBorder>
          {edges && edges.length > 0 ? (
            edges.map(({ node, cursor }) => (
              <List.Item key={cursor}>
                <Notice notice={node} />
              </List.Item>
            ))
          ) : (
            <EmptyNotice />
          )}
        </List>
      </section>

      <Footer />

      <style jsx>{styles}</style>
    </section>
  )
}

export default DropdownNotices
