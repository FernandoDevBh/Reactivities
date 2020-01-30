import React, { useContext } from "react";
import { Form as FinalForm, Field } from "react-final-form";
import { Form, Button, Header } from "semantic-ui-react";
import TextInput from "../../app/common/form/TextInput";
import rootStore from "../../app/stores/rootStore";
import { IUserFormValues } from "../../app/models/user";
import { FORM_ERROR } from "final-form";
import { combineValidators, isRequired } from "revalidate";
import ErrorMessage from "../../app/common/form/ErrorMessage";

const validate = combineValidators({
  email: isRequired("email"),
  username: isRequired("User Name"),
  displayName: isRequired("Display Name"),
  password: isRequired("password")
});

const RegisterForm = () => {
  const {
    userStore: { register }
  } = useContext(rootStore);
  return (
    <FinalForm
      onSubmit={(values: IUserFormValues) =>
        register(values).catch(error => ({
          [FORM_ERROR]: error
        }))
      }
      validate={validate}
      render={({
        handleSubmit,
        submitting,
        submitError,
        invalid,
        pristine,
        dirtySinceLastSubmit
      }) => (
        <Form onSubmit={handleSubmit} error>
          <Header
            as="h2"
            content="Sigin to Reactivities"
            color="teal"
            textAlign="center"
          />
          <Field name="username" placeholder="User Name" component={TextInput} />
          <Field name="displayName" placeholder="Display Name" component={TextInput} />
          <Field name="email" placeholder="E-mail" component={TextInput} />
          <Field
            name="password"
            placeholder="Password"
            type="password"
            component={TextInput}
          />
          {submitError && !dirtySinceLastSubmit && (
            <ErrorMessage
              error={submitError}
              text=""
            />
          )}
          <Button
            disabled={(invalid && !dirtySinceLastSubmit) || pristine}
            color="teal"
            content="Register"
            loading={submitting}
            fluid
          />
        </Form>
      )}
    />
  );
};

export default RegisterForm;
