import getConfig from 'next/config'
import { useState } from 'react'

import { Dialog, Translate } from '~/components'

import { TEXT } from '~/common/enums'

import Description from './Description'
import Radios from './Radios'
import styles from './styles.css'

interface Props {
  startGenerate: () => void
  startBind: (windowRef: Window) => void
}

const {
  publicRuntimeConfig: { OAUTH_URL }
} = getConfig()

const Select: React.FC<Props> = ({ startGenerate, startBind }) => {
  const [bindType, setBindType] = useState<'generate' | 'bind'>('bind')
  const isGenerate = bindType === 'generate'

  const onSubmit = (e: React.FormEvent) => {
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
  }

  return (
    <form onSubmit={onSubmit}>
      <Dialog.Content spacing={['base', 'xloose']}>
        <section>
          <p className="hint">
            <Translate
              zh_hant="接下來我們會幫你生成 Liker ID，如果你已經有 Liker ID 也可以進行綁定。"
              zh_hans="接下来我们会帮你生成 Liker ID，如果你已经有 Liker ID 也可以进行绑定。"
            />
          </p>
        </section>

        <Radios isGenerate={isGenerate} setBindType={setBindType} />

        <Description />
      </Dialog.Content>

      <Dialog.Footer>
        <Dialog.Footer.Button type="submit">
          <Translate
            zh_hant={TEXT.zh_hant.continue}
            zh_hans={TEXT.zh_hans.continue}
          />
        </Dialog.Footer.Button>
      </Dialog.Footer>

      <style jsx>{styles}</style>
    </form>
  )
}

export default Select
