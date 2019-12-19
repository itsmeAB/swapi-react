import React from "react";
import {
  PageHeader,
//   Menu,
//   Dropdown,
//   Icon,
  Button,
//   Tag,
//   Typography,
//   Row
} from "antd";
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
        title={user.name}
        style={{
          border: "1px solid rgb(235, 237, 240)"
        }}
        subTitle="START WARS"
        // tags={<Tag color="blue">Running</Tag>}
        extra={[
          <Button key="1" type="primary" onClick={handleLogout}>
            logout
          </Button>
          //   <DropdownMenu key="more" />
        ]}
        // avatar={{
        //   src: "https://avatars1.githubusercontent.com/u/8186664?s=460&v=4"
        // }}
        avatar={{icon: "user"}}
        // breadcrumb={{ routes }}
      >
        {/* <Content
          extraContent={
            <img
              src="https://gw.alipayobjects.com/mdn/mpaas_user/afts/img/A*KsfVQbuLRlYAAAAAAAAAAABjAQAAAQ/original"
              alt="content"
            />
          }
        >
          {content}
        </Content> */}
      </PageHeader>
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
