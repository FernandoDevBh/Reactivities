import React, { useContext, useEffect } from "react";
import { Grid } from "semantic-ui-react";
import { observer } from "mobx-react-lite";
import ActivityStore from "../../../app/stores/activityStore";
import { RouteComponentProps } from "react-router-dom";
import LoadingComponent from "../../../app/layout/LoadingComponent";
import AcitivityDetailedHeader from "./AcitivityDetailedHeader";
import AcitivityDetailedInfo from "./AcitivityDetailedInfo";
import AcitivityDetailedChat from "./AcitivityDetailedChat";
import AcitivityDetailedSideBar from "./AcitivityDetailedSideBar";

interface DetailParams {
  id: string;
}

const ActivityDetails: React.FC<RouteComponentProps<DetailParams>> = ({
  match
}) => {
  const {
    activity: selectedActivity,
    loadActivity,
    loadingInitial
  } = useContext(ActivityStore);
  const activity = selectedActivity!;

  useEffect(() => {
    loadActivity(match.params.id);
  }, [loadActivity, match.params.id]);

  if (loadingInitial || !activity) {
    return <LoadingComponent content="Loading Activity..." />;
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
