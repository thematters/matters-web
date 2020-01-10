import { Translate } from '~/components/Language'

import { TEXT } from '~/common/enums'

import styles from './styles.css'

const CancelEditButton = ({ onClick }: { onClick: () => void }) => (
  <button className="cancel-button" type="button" onClick={onClick}>
    <Translate zh_hant={TEXT.zh_hant.cancel} zh_hans={TEXT.zh_hans.cancel} />

    <style jsx>{styles}</style>
  </button>
)

export default CancelEditButton
