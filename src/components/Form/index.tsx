import AmountInput from './AmountInput'
import CheckBox from './CheckBox'
import ComposedAmountInput from './ComposedAmountInput'
import CurrencyRadioInput from './CurrencyRadioInput'
import Field from './Field'
import Input from './Input'
import List from './List'
import PinInput from './PinInput'
import Select from './Select'
import SquireCheckBox from './SquireCheckBox'
import styles from './styles.module.css'
import Textarea from './Textarea'

type FormProps = React.DetailedHTMLProps<
  React.FormHTMLAttributes<HTMLFormElement>,
  HTMLFormElement
>

export const Form: React.FC<FormProps> & {
  Input: typeof Input
  Textarea: typeof Textarea
  CheckBox: typeof CheckBox
  SquireCheckBox: typeof SquireCheckBox
  PinInput: typeof PinInput
  AmountInput: typeof AmountInput
  List: typeof List
  Field: typeof Field
  Select: typeof Select
  ComposedAmountInput: typeof ComposedAmountInput
  CurrencyRadioInput: typeof CurrencyRadioInput
} = ({ children, ...formProps }) => (
  <form className={styles.form} method="POST" autoComplete="off" {...formProps}>
    {children}
  </form>
)

Form.Input = Input
Form.Textarea = Textarea
Form.CheckBox = CheckBox
Form.SquireCheckBox = SquireCheckBox
Form.PinInput = PinInput
Form.AmountInput = AmountInput
Form.List = List
Form.Field = Field
Form.Select = Select
Form.ComposedAmountInput = ComposedAmountInput
Form.CurrencyRadioInput = CurrencyRadioInput
