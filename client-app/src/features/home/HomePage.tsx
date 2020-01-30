import React, { useContext, Fragment } from "react";
import { Container, Segment, Header, Button, Image } from "semantic-ui-react";
import { Link } from "react-router-dom";
import rootStore from "../../app/stores/rootStore";
import LogingForm from "../user/LogingForm";
import RegisterForm from "../user/RegisterForm";

const HomePage = () => {
  const {
    userStore: { isLoggedIn, user },
    modalStore: { openModel }
  } = useContext(rootStore);
  return (
    <Segment inverted textAlign="center" vertical className="masthead">
      <Container text>
        <Header as="h1" inverted>
          <Image
            size="massive"
            src="/assets/logo.png"
            alt="logo"
            style={{ marginBottom: 12 }}
          />
          Reactivities
        </Header>
        {isLoggedIn && user ? (
          <Fragment>
            <Header
              as="h2"
              inverted
              content={`Welcome back ${user.displayName}`}
            />
            <Button as={Link} to="/activities" size="huge" inverted>
              Got to Activities
            </Button>
          </Fragment>
        ) : (
          <Fragment>
            <Header as="h2" inverted content="Welcome to Reactivities" />
            <Button onClick={() => openModel(<LogingForm />)} size="huge" inverted>
              Login
            </Button>
            <Button onClick={() => openModel(<RegisterForm />)} size="huge" inverted>
              Register
            </Button>
          </Fragment>
        )}
      </Container>
    </Segment>
  );
};

export default HomePage;
