import { Form, Translate } from '~/components'

const Enhance = () => {
  return (
    <Form.List
      groupName={
        <Translate zh_hant="參與開發" zh_hans="参与开发" en="Build Together" />
      }
    >
      <Form.List.Item
        title={<Translate id="openCommunity" />}
        href="https://github.com/thematters/developer-resource"
      />
      <Form.List.Item
        title={<Translate id="bugBountyProgram" />}
        href="https://github.com/thematters/developer-resource/blob/master/SECURITY.md"
      />
    </Form.List>
  )
}

export default Enhance
