import React, { useContext, useState } from "react";
import { Tab, Grid, Header, Button } from "semantic-ui-react";
import rootStore from "../../app/stores/rootStore";
import { observer } from "mobx-react-lite";
import ProfileEditForm from "./ProfileEditForm";

const ProfileDescription = () => {
  const { profile, isCurrentUser, updateProfile } = useContext(  
    rootStore
  ).profileStore;
  const [editMode, setEditMode] = useState(false)
  return (
    <Tab.Pane>
      <Grid>
        <Grid.Column width={16} style={{ paddingBottom: 0 }}>
          <Header
            floated="left"
            icon="user"
            content={`About ${profile?.displayName}`}
          />
          {isCurrentUser && (
            <Button
              floated="right"
              basic
              content={editMode ? "Cancel" : "Edit Profile"}
              onClick={() => setEditMode(!editMode)}
            />
          )}
        </Grid.Column>
        <Grid.Column width={16}>
          {editMode && profile ? (
            <ProfileEditForm
              updateProfile={updateProfile}
              profile={profile}
            />
          ) : (
            <span>{profile?.bio}</span>
          )}
        </Grid.Column>
      </Grid>
    </Tab.Pane>
  );
};

export default observer(ProfileDescription);
