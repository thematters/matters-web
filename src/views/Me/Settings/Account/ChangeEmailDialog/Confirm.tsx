import { useFormik } from 'formik';
import gql from 'graphql-tag';
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
import { ChangeEmail } from './__generated__/ChangeEmail';

interface FormProps {
  oldData: { email: string; codeId: string };
  submitCallback: () => void;
  closeDialog: () => void;
}

interface FormValues {
  email: string;
  code: string;
}

const CHANGE_EMAIL = gql`
  mutation ChangeEmail($input: ChangeEmailInput!) {
    changeEmail(input: $input) {
      id
      info {
        email
      }
    }
  }
`;

const Confirm: React.FC<FormProps> = ({
  oldData,
  submitCallback,
  closeDialog,
}) => {
  const [confirmCode] = useMutation<ConfirmVerificationCode>(CONFIRM_CODE);
  const [changeEmail] = useMutation<ChangeEmail>(CHANGE_EMAIL);
  const { lang } = useContext(LanguageContext);

  const formId = 'change-email-confirm-form';

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
      email: '',
      code: '',
    },
    validate: ({ email, code }) =>
      _pickBy({
        email: validateEmail(email, lang, { allowPlusSign: false }),
        code: validateCode(code, lang),
      }),
    onSubmit: async ({ email, code }, { setFieldError, setSubmitting }) => {
      try {
        const { data } = await confirmCode({
          variables: { input: { email, type: 'email_reset_confirm', code } },
        });
        const confirmVerificationCode = data?.confirmVerificationCode;
        const params = {
          variables: {
            input: {
              oldEmail: oldData.email,
              oldEmailCodeId: oldData.codeId,
              newEmail: email,
              newEmailCodeId: confirmVerificationCode,
            },
          },
        };

        await changeEmail(params);

        if (submitCallback) {
          submitCallback();
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
        required
        placeholder={translate({ id: 'enterNewEmail', lang })}
        value={values.email}
        error={touched.email && errors.email}
        onBlur={handleBlur}
        onChange={handleChange}
        autoFocus
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
        extraButton={
          <SendCodeButton
            email={values.email}
            type="email_reset_confirm"
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
      text={<Translate id="confirm" />}
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

      <Dialog.Content spacing={[0, 0]}>{InnerForm}</Dialog.Content>
    </>
  );
};

export default Confirm;
