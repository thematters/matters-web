import { Form, Translate } from '~/components'

const Enhance = () => {
  return (
    // TODO: update groupName
    <Form.List groupName={'Build'}>
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
