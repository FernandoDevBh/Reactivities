import React, { useContext, useEffect } from "react";
import { Grid } from "semantic-ui-react";
import ProfileHeader from "./ProfileHeader";
import ProfileContent from "./ProfileContent";
import rootStore from "../../app/stores/rootStore";
import { RouteComponentProps } from "react-router-dom";
import LoadingComponent from "../../app/layout/LoadingComponent";
import { observer } from "mobx-react-lite";

interface RouteParams {
  username: string;
}

interface IProps extends RouteComponentProps<RouteParams> {}

const ProfilePage: React.FC<IProps> = ({
  match: {
    params: { username }
  }
}) => {
  const {
    profileStore: { loadingProfile, loadProfile, profile }
  } = useContext(rootStore);

  useEffect(() => {
      loadProfile(username)
  }, [loadProfile, username]);

  if(loadingProfile){
      return <LoadingComponent content="Loading Profile..." />
  }

  return (
    <Grid>
      <Grid.Column width={16}>
        <ProfileHeader profile={profile!} />
        <ProfileContent />
      </Grid.Column>
    </Grid>
  );
};

export default observer(ProfilePage);
