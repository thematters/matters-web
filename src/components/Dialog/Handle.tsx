import { TEXT } from '~/common/enums';

import styles from './styles.css';

interface HandleProps {
  close: () => void;
}

const Handle: React.FC<HandleProps> = ({ close, ...props }) => (
  <button
    type="button"
    className="handle"
    aria-label={TEXT.zh_hant.close}
    onClick={close}
    {...props}
  >
    <span className="icon" />

    <style jsx>{styles}</style>
  </button>
);

export default Handle;
