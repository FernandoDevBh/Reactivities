import React from "react";
import { Form, Button } from "semantic-ui-react";
import { Form as FinalForm, Field } from "react-final-form";
import TextInput from "../../app/common/form/TextInput";
import TextAreaInput from "../../app/common/form/TextAreaInput";
import {
  combineValidators,
  composeValidators,
  isRequired,
  hasLengthGreaterThan
} from "revalidate";
import { IProfile } from "../../app/models/profile";

interface IProps {
    updateProfile: (profile: IProfile) => void;
    profile: IProfile;
}

const validate = combineValidators({
  displayName: composeValidators(
    isRequired("Display Name"),
    hasLengthGreaterThan(3)({
      message: "Display Name needs to be at least 3 characters."
    })
  )()
});

const ProfileEditForm: React.FC<IProps> = ({
    profile,
    updateProfile
}) => {

  return (
    <FinalForm
      initialValues={profile}
      validate={validate}
      onSubmit={updateProfile}
      render={({ handleSubmit, invalid, pristine, submitting }) => (
        <Form onSubmit={handleSubmit} error>
          <Field
            name="displayName"
            placeholder="Display Name"
            value={profile.displayName}
            component={TextInput}
          />
          <Field
            name="bio"
            rows={3}
            placeholder="Biography"
            value={profile.bio}
            component={TextAreaInput}
          />
          <Button
            loading={submitting}
            floated="right"
            disabled={invalid || pristine}
            positive
            type="submit"
            content="Update Profile"
          />
        </Form>
      )}
    />
  );
};

export default ProfileEditForm;
