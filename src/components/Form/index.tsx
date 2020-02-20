import CheckBox from './CheckBox'
import ClickableArea from './ClickableArea'
import DropdownInput from './DropdownInput'
import Input from './Input'
import styles from './styles.css'
import Textarea from './Textarea'

type FormProps = React.DetailedHTMLProps<
  React.FormHTMLAttributes<HTMLFormElement>,
  HTMLFormElement
>

export const Form: React.FC<FormProps> & {
  Input: typeof Input
  Textarea: typeof Textarea
  CheckBox: typeof CheckBox
  DropdownInput: typeof DropdownInput
  ClickableArea: typeof ClickableArea
} = ({ children, ...formProps }) => (
  <form {...formProps}>
    {children}

    <style jsx>{styles}</style>
  </form>
)

Form.Input = Input
Form.Textarea = Textarea
Form.CheckBox = CheckBox
Form.DropdownInput = DropdownInput
Form.ClickableArea = ClickableArea
