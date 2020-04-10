import { useFormik } from 'formik';
import _pickBy from 'lodash/pickBy';
import { useContext } from 'react';

import {
  Dialog,
  Form,
  LanguageContext,
  SendCodeButton,
  Translate,
} from '~/components';
import { useMutation } from '~/components/GQL';
import { CONFIRM_CODE } from '~/components/GQL/mutations/verificationCode';

import {
  parseFormSubmitErrors,
  translate,
  validateCode,
  validateEmail,
} from '~/common/utils';

import { ConfirmVerificationCode } from '~/components/GQL/mutations/__generated__/ConfirmVerificationCode';

interface FormProps {
  defaultEmail: string;
  submitCallback?: (codeId: string) => void;
  closeDialog: () => void;
}

interface FormValues {
  email: string;
  code: string;
}

const Request: React.FC<FormProps> = ({
  defaultEmail = '',
  submitCallback,
  closeDialog,
}) => {
  const [confirmCode] = useMutation<ConfirmVerificationCode>(CONFIRM_CODE);
  const { lang } = useContext(LanguageContext);
  const formId = 'change-email-request-form';

  const {
    values,
    errors,
    touched,
    handleBlur,
    handleChange,
    handleSubmit,
    isSubmitting,
    isValid,
  } = useFormik<FormValues>({
    initialValues: {
      email: defaultEmail,
      code: '',
    },
    validate: ({ email, code }) =>
      _pickBy({
        email: validateEmail(email, lang, { allowPlusSign: true }),
        code: validateCode(code, lang),
      }),
    onSubmit: async ({ email, code }, { setFieldError, setSubmitting }) => {
      try {
        const { data } = await confirmCode({
          variables: { input: { email, type: 'email_reset', code } },
        });
        const confirmVerificationCode = data?.confirmVerificationCode;

        if (submitCallback && confirmVerificationCode) {
          submitCallback(confirmVerificationCode);
        }
      } catch (error) {
        const [messages, codes] = parseFormSubmitErrors(error, lang);
        codes.forEach((c) => {
          if (c.includes('CODE_')) {
            setFieldError('code', messages[c]);
          } else {
            setFieldError('email', messages[c]);
          }
        });
      }

      setSubmitting(false);
    },
  });

  const InnerForm = (
    <Form id={formId} onSubmit={handleSubmit}>
      <Form.Input
        label={<Translate id="email" />}
        type="email"
        name="email"
        disabled
        required
        value={values.email}
        error={touched.email && errors.email}
        onBlur={handleBlur}
        onChange={handleChange}
      />

      <Form.Input
        label={<Translate id="verificationCode" />}
        type="text"
        name="code"
        required
        placeholder={translate({ id: 'enterVerificationCode', lang })}
        value={values.code}
        error={touched.code && errors.code}
        onBlur={handleBlur}
        onChange={handleChange}
        autoFocus
        extraButton={
          <SendCodeButton
            email={values.email}
            type="email_reset"
            disabled={!!errors.email}
          />
        }
      />
    </Form>
  );

  const SubmitButton = (
    <Dialog.Header.RightButton
      type="submit"
      form={formId}
      disabled={!isValid || isSubmitting}
      text={<Translate id="nextStep" />}
      loading={isSubmitting}
    />
  );

  return (
    <>
      <Dialog.Header
        title="changeEmail"
        close={closeDialog}
        rightButton={SubmitButton}
      />

      <Dialog.Content spacing={[0, 0]} hasGrow>
        {InnerForm}
      </Dialog.Content>
    </>
  );
};

export default Request;
