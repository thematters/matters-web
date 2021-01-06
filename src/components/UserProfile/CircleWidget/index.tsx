import { Form, Translate } from '~/components'

import { PATHS } from '~/common/enums'
// import { useContext } from 'react'

import styles from './styles.css'

type CircleWidgetProps = {
  isMe: boolean
}

const CircleWidget: React.FC<CircleWidgetProps> = ({ isMe }) => {
  // TODO: viewer's circle
  // @ts-ignore
  // if (features.circle) {
  //   return null
  // }

  if (!isMe) {
    return null
  }

  return (
    <section className="circle-widget">
      <Form.List forceGreyStyle>
        <Form.List.Item
          forceGreyStyle
          title={
            <Translate
              zh_hant="快來搭建圍爐，呼召你的支持者加入"
              zh_hans="快来搭建围炉，呼召你的支持者加入"
            />
          }
          href={PATHS.CIRCLE_CREATION}
        />
      </Form.List>

      <style jsx>{styles}</style>
    </section>
  )
}

export default CircleWidget
