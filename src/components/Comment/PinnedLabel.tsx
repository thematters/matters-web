import { Label } from '~/components/Label'
import { Translate } from '~/components/Language'

import { TEXT } from '~/common/enums'

import styles from './styles.css'

const PinnedLabel = () => (
  <span className="label">
    <Label size="sm">
      <Translate
        zh_hant={TEXT.zh_hant.authorRecommend}
        zh_hans={TEXT.zh_hant.authorRecommend}
      />
    </Label>

    <style jsx>{styles}</style>
  </span>
)

export default PinnedLabel
