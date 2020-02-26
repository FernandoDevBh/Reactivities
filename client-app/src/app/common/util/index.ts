import { IActivity, IAttendee } from "../../models/activity";
import { IUser } from "../../models/user";

export const combineDatesAndTime = (date: Date, time: Date) => {  
  const dateString = date.toISOString().split('T')[0];
  const timeString = time.toISOString().split('T')[1];
  return new Date(`${dateString}T${timeString}`);
};

export const setActivityProps = (activity: IActivity, user: IUser) => {
  activity.date = new Date(activity.date);
  activity.isGoing = activity.attendees.some(a => a.username === user.username);
  activity.isHost = activity.attendees.some(
    a => a.username === user.username && a.isHost
  );
  return activity;
};

export const createAttendee = (user: IUser) : IAttendee => {
    return {
        username: user.username,
        displayName: user.displayName,
        isHost: false,
        image: user.image!
    }
}