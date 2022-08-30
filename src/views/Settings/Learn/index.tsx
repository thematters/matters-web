import { Form, Translate } from '~/components'

import { PATHS } from '~/common/enums'
import { toPath } from '~/common/utils'

const downloadAppLink = toPath({
  page: 'articleDetail',
  article: {
    slug: 'guidance-如何让你的matters之旅更便捷',
    mediaHash: 'bafyreiayiuxi4qc2a7qpgjp3fe42wmaoppqykckcvtq4hiukl5pgs3dn2m',
    author: { userName: '1ampa55ag3' },
  },
})

const Learn = () => {
  return (
    // TODO: update groupName
    <Form.List groupName={'Learn'}>
      <Form.List.Item title={<Translate id="about" />} href={PATHS.ABOUT} />
      <Form.List.Item title={<Translate id="guide" />} href={PATHS.GUIDE} />
      <Form.List.Item
        title={<Translate id="community" />}
        href={PATHS.COMMUNITY}
      />
      <Form.List.Item
        title={<Translate id="migrationSideBar" />}
        href={PATHS.MIGRATION}
      />
      <Form.List.Item title={<Translate id="term" />} href={PATHS.TOS} />
      <Form.List.Item
        title={<Translate id="downloadApp" />}
        {...downloadAppLink}
      />
    </Form.List>
  )
}

export default Learn
