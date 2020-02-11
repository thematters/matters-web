import { Icon, Translate } from '~/components'

import styles from './styles.css'

interface RadiosProps {
  isGenerate: boolean
  setBindType: (type: 'generate' | 'bind') => void
}

const Radios: React.FC<RadiosProps> = ({ isGenerate, setBindType }) => (
  <section className="radios">
    <label htmlFor="generate">
      <input
        id="generate"
        name="bindType"
        type="radio"
        checked={isGenerate}
        onChange={() => setBindType('generate')}
      />
      <div className="content">
        <section>
          <h4>
            <Translate zh_hant="生成 Liker ID" zh_hans="生成 Liker ID" />
          </h4>
          <p>
            <Translate
              zh_hant="同意 Matters 帮我创建 Liker ID"
              zh_hans="同意 Matters 帮我创建 Liker ID"
            />
          </p>
        </section>

        {isGenerate && <Icon.CheckActive size="md" />}
        {!isGenerate && <Icon.UnCheck size="md" />}
      </div>
    </label>

    <label htmlFor="bind">
      <input
        id="bind"
        name="bindType"
        type="radio"
        checked={!isGenerate}
        onChange={() => setBindType('bind')}
      />
      <div className="content">
        <section>
          <h4>
            <Translate zh_hant="綁定 Liker ID" zh_hans="綁定 Liker ID" />
          </h4>
          <p>
            <Translate
              zh_hant="跳轉到 like.co 驗證已有 Liker ID"
              zh_hans="跳转到 like.co 验证已有 Liker ID"
            />
          </p>
        </section>

        {!isGenerate && <Icon.CheckActive size="md" />}
        {isGenerate && <Icon.UnCheck size="md" />}
      </div>
    </label>

    <style jsx>{styles}</style>
  </section>
)

export default Radios
