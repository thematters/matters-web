import { Switch } from '~/components'

import styles from './styles.css'

const SettingItem = ({
  enabled,
  loading,
  title,
  description,
  onChange,
}: {
  enabled: boolean
  loading?: boolean
  title: string | React.ReactNode
  description?: string | React.ReactNode
  onChange: () => void
}) => {
  return (
    <section className="setting-item">
      <section className="left">
        <p className="title">{title}</p>
        <p className="description">{description}</p>
      </section>

      <Switch checked={enabled} loading={loading} onChange={onChange} />

      <style jsx>{styles}</style>
    </section>
  )
}

export default SettingItem
