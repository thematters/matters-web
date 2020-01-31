import getConfig from 'next/config'
import { FormEvent, useState } from 'react'

import { Icon } from '~/components'
import { Translate } from '~/components/Language'
import { Modal } from '~/components/Modal'
import { TextIcon } from '~/components/TextIcon'

import { TEXT } from '~/common/enums'

import styles from './styles.css'

interface Props {
  startGenerate: () => void
  startBind: (windowRef: Window) => void
  scrollLock?: boolean
}

const {
  publicRuntimeConfig: { OAUTH_URL }
} = getConfig()

const Header = () => (
  <header>
    <p>
      <Translate
        zh_hant="接下來我們會幫你生成 Liker ID，如果你已經有 Liker ID 也可以進行綁定。"
        zh_hans="接下来我们会帮你生成 Liker ID，如果你已经有 Liker ID 也可以进行绑定。"
      />
    </p>

    <style jsx>{styles}</style>
  </header>
)

const Description = () => (
  <section className="desc">
    <section>
      <TextIcon
        icon={<Icon.HelpMedium size="sm" />}
        size="sm"
        color="green"
        spacing="xtight"
        weight="md"
      >
        <Translate zh_hant="什麼是 Liker ID？" zh_hans="什么是 Liker ID？" />
      </TextIcon>
    </section>

    <p>
      <Translate
        zh_hant="讚賞公民是一場化讚為賞，回饋創作的運動，目標是做到讀者按讚，作者獲賞。Liker ID 是你的讚賞公民帳號，讀者須登入 Liker ID 按讚，才可為作者帶來收入；作者也須擁有 Liker ID 才能獲取奬賞。了解更多 "
        zh_hans="赞赏公民是一场化赞为赏，回馈创作的运动，目标是做到读者按赞，作者获赏。Liker ID 是你的赞赏公民帐号，读者须登录 Liker ID 按赞，才可为作者带来收入；作者也须拥有 Liker ID 才能获取奖赏。了解更多 "
      />
      <a className="u-link-green" href="https://help.like.co" target="_blank">
        help.like.co
      </a>
    </p>

    <style jsx>{styles}</style>
  </section>
)

const Select: React.FC<Props> = ({ startGenerate, startBind, scrollLock }) => {
  const [bindType, setBindType] = useState<'generate' | 'bind'>('generate')
  const isGenerate = bindType === 'generate'

  return (
    <form>
      <Modal.Content spacing="none" layout="full-width" scrollLock={scrollLock}>
        <section className="container">
          <Header />

          <section className="radios">
            <label>
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
                    <Translate
                      zh_hant="生成 Liker ID"
                      zh_hans="生成 Liker ID"
                    />
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

            <label>
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
                    <Translate
                      zh_hant="綁定 Liker ID"
                      zh_hans="綁定 Liker ID"
                    />
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
          </section>

          <Description />
        </section>
      </Modal.Content>

      <footer>
        <Modal.FooterButton
          htmlType="submit"
          onClick={(e: FormEvent) => {
            e.preventDefault()

            if (isGenerate) {
              startGenerate()
            } else {
              const url = `${OAUTH_URL}/likecoin`
              const windowRef = window.open(url, '_blank')

              if (windowRef) {
                startBind(windowRef)
              }
            }
          }}
          width="full"
        >
          <Translate
            zh_hant={TEXT.zh_hant.continue}
            zh_hans={TEXT.zh_hans.continue}
          />
        </Modal.FooterButton>
      </footer>

      <style jsx>{styles}</style>
    </form>
  )
}

export default Select
