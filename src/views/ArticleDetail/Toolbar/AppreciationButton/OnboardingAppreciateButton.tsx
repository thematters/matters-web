import { ModalSwitch } from '~/components/ModalManager'

import IconAppreciate from './IconAppreciate'
import styles from './styles.css'

const OnboardingAppreciateButton = () => {
  return (
    <ModalSwitch modalId="likeCoinTermModal">
      {(open: any) => (
        <button
          className="appreciate-button"
          type="button"
          onClick={open}
          aria-label="讚賞作品"
        >
          <IconAppreciate />

          <style jsx>{styles}</style>
        </button>
      )}
    </ModalSwitch>
  )
}

export default OnboardingAppreciateButton
