import { Translate } from '~/components';

import styles from './styles.css';

const Hint = () => (
  <p className="hint">
    <Translate
      zh_hant="接下來我們會幫你生成 Liker ID，如果你已經有 Liker ID 也可以進行綁定。"
      zh_hans="接下来我们会帮你生成 Liker ID，如果你已经有 Liker ID 也可以进行绑定。"
    />

    <style jsx>{styles}</style>
  </p>
);

export default Hint;
