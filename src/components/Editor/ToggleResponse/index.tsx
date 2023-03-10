import classNames from 'classnames'
import { useState } from 'react'

import { IconChecked, IconUnChecked, Translate } from '~/components'

import styles from './styles.css'

export type ToggleResponseProps = {
  inSidebar?: boolean
}

const ToggleResponse = ({ inSidebar }: ToggleResponseProps) => {
  const [response, setResponse] = useState(true)
  const allowResponse = () => {
    setResponse(true)
  }
  const disableResponse = () => {
    setResponse(false)
  }

  const wrapperClasses = classNames({
    wrapper: true,
    inSidebar: !!inSidebar,
  })

  if (inSidebar) {
    return (
      <section className={wrapperClasses}>
        <section className="item" onClick={allowResponse}>
          <section className="left">
            <h3>
              <Translate
                zh_hans="开启回应"
                zh_hant="開啟回應"
                en="Allow Responses"
              />
            </h3>
            <p className="hint">
              <Translate
                zh_hans="允许读者回应本文（开启后无法关闭）"
                zh_hant="允許讀者回應本文（開啟後無法關閉）"
                en="Allow readers to respond to this article (can NOT be disabled afterwards)"
              />
            </p>
          </section>
          <section className="right">
            {response ? (
              <IconChecked size="md" color="green" />
            ) : (
              <IconUnChecked color="grey-light" size="md" />
            )}
          </section>
        </section>
        <section className="item" onClick={disableResponse}>
          <section className="left">
            <h3>
              <Translate
                zh_hans="关闭回应"
                zh_hant="關閉回應"
                en="Disable Responses"
              />
            </h3>
            <p className="hint">
              <Translate
                zh_hans="不允许读者回应本文（可通过编辑打开回应功能）"
                zh_hant="不允許讀者回應本文（可通過修訂打開回應功能）"
                en="Disallow readers to respond to this article (you can enable responses later by editing this article)"
              />
            </p>
          </section>
          <section className="right">
            {response ? (
              <IconUnChecked color="grey-light" size="md" />
            ) : (
              <IconChecked size="md" color="green" />
            )}
          </section>
        </section>
        <style jsx>{styles}</style>
      </section>
    )
  }

  return (
    <section className="container">
      <h3 className="title">
        <Translate id="articleResponse" />
      </h3>
      <section className={wrapperClasses}>
        <section className="item" onClick={allowResponse}>
          <section className="left">
            <h3>
              <Translate
                zh_hans="开启回应"
                zh_hant="開啟回應"
                en="Allow Responses"
              />
            </h3>
            <p className="hint">
              <Translate
                zh_hans="允许读者回应本文（开启后无法关闭）"
                zh_hant="允許讀者回應本文（開啟後無法關閉）"
                en="Allow readers to respond to this article (can NOT be disabled afterwards)"
              />
            </p>
          </section>
          <section className="right">
            {response ? (
              <IconChecked color="green" size="md-s" />
            ) : (
              <IconUnChecked color="grey-light" size="md-s" />
            )}
          </section>
        </section>
        <section className="item" onClick={disableResponse}>
          <section className="left">
            <h3>
              <Translate
                zh_hans="关闭回应"
                zh_hant="關閉回應"
                en="Disable Responses"
              />
            </h3>
            <p className="hint">
              <Translate
                zh_hans="不允许读者回应本文（可通过编辑打开回应功能）"
                zh_hant="不允許讀者回應本文（可通過修訂打開回應功能）"
                en="Disallow readers to respond to this article (you can enable responses later by editing this article)"
              />
            </p>
          </section>
          <section className="right">
            {response ? (
              <IconUnChecked color="grey-light" size="md-s" />
            ) : (
              // <IconChecked color="grey" size="md-s" />
              <IconChecked color="green" size="md-s" />
            )}
          </section>
        </section>
      </section>
      <style jsx>{styles}</style>
    </section>
  )
}

export default ToggleResponse
