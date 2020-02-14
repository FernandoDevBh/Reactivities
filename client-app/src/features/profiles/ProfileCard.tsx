import React from "react";
import { Card, Image, Icon } from "semantic-ui-react";
import { Link } from "react-router-dom";
import { IProfile } from "../../app/models/profile";

interface IProps {
  profile: IProfile;
}

const ProfileCard: React.FC<IProps> = ({
  profile: { username, image, displayName, followersCount }
}) => {
  return (
    <Card as={Link} to={`/profile/${username}`}>
      <Image src={image || "/assets/user.png"} />
      <Card.Content>
        <Card.Header>{displayName}</Card.Header>
      </Card.Content>
      <Card.Content extra>
        <div>
          <Icon name="user" />
          {followersCount} Followers
        </div>
      </Card.Content>
    </Card>
  );
};

export default ProfileCard;
