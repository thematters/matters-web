import { CircleDigest, Switch, Translate } from '~/components'

import styles from './styles.css'

import { DigestRichCirclePublic } from '~/components/CircleDigest/Rich/__generated__/DigestRichCirclePublic'

export type ToggleCircleProps = {
  circle?: DigestRichCirclePublic | null

  onEdit?: (enabled: boolean) => any
  saving?: boolean
  disabled?: boolean
}

const ToggleCircle: React.FC<ToggleCircleProps> = ({
  circle,
  onEdit,
  saving,
  disabled,
}) => {
  return (
    <section className="container">
      <header>
        <section className="content">
          <h4>
            <Translate
              zh_hant="將作品加入我的圍爐"
              zh_hans="将作品加入我的围炉"
            />
          </h4>
          <p>
            <Translate zh_hant="圍爐成員可讀" zh_hans="围炉成员可读" />
          </p>
        </section>

        <Switch
          checked={!!circle}
          onChange={() => onEdit && onEdit(!circle)}
          loading={saving}
          disabled={disabled}
        />
      </header>

      {circle && (
        <section className="circle">
          <CircleDigest.Rich
            circle={circle}
            bgColor="none"
            avatarSize="xl"
            textSize="md-s"
            hasOwner={false}
            hasDescription={false}
            disabled
          />
        </section>
      )}

      <style jsx>{styles}</style>
    </section>
  )
}

export default ToggleCircle
