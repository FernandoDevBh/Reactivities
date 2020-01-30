import React, { useContext, useEffect } from "react";
import { Grid } from "semantic-ui-react";
import { observer } from "mobx-react-lite";
import { RouteComponentProps } from "react-router-dom";
import LoadingComponent from "../../../app/layout/LoadingComponent";
import AcitivityDetailedHeader from "./AcitivityDetailedHeader";
import AcitivityDetailedInfo from "./AcitivityDetailedInfo";
import AcitivityDetailedChat from "./AcitivityDetailedChat";
import AcitivityDetailedSideBar from "./AcitivityDetailedSideBar";
import RootStore from "../../../app/stores/rootStore";

interface DetailParams {
  id: string;
}

const ActivityDetails: React.FC<RouteComponentProps<DetailParams>> = ({
  match,
  history
}) => {
  const { activityStore } = useContext(RootStore);
  const {
    activity: selectedActivity,
    loadActivity,
    loadingInitial
  } = activityStore;

  const activity = selectedActivity!;

  useEffect(() => {
    loadActivity(match.params.id);
  }, [loadActivity, match.params.id, history]);

  if (loadingInitial) {
    return <LoadingComponent content="Loading Activity..." />;
  }

  if (!activity) {
    return <h1>Not found</h1>;
  }

  return (
    <Grid>
      <Grid.Column width={10}>
        <AcitivityDetailedHeader activity={activity} />
        <AcitivityDetailedInfo activity={activity} />
        <AcitivityDetailedChat />
      </Grid.Column>
      <Grid.Column width={6}>
        <AcitivityDetailedSideBar />
      </Grid.Column>
    </Grid>
  );
};

export default observer(ActivityDetails);
