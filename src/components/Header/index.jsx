import React from "react";
import { PageHeader, Button } from "antd";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import userActions from "../../redux/user";

const { loginUser } = userActions.actions;

const Header = props => {
  const {
    user: { user }
  } = props;

  const handleLogout = () => {
    props.actions.loginUser(false, {});
  };
  return (
    <>
      <PageHeader
        title={user && user.name}
        style={{
          border: "1px solid rgb(235, 237, 240)"
        }}
        subTitle="STAR WARS"
        // tags={<Tag color="blue">Running</Tag>}
        extra={[
          <Button key="1" type="primary" onClick={handleLogout}>
            logout
          </Button>
        ]}
        avatar={{ icon: "user" }}
      ></PageHeader>
    </>
  );
};

const mapStateToProps = state => {
  return {
    user: state.user
  };
};

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators({ loginUser }, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(Header);
