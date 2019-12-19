import React, { useState, useEffect } from "react";
import { Form, Icon, Input, Button } from "antd";
import userActions from "../../redux/user";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { getUser } from "../../services";

const { loginUser } = userActions.actions;

const Login = props => {
  useEffect(() => {
    const { user } = props;
    if(user.isLoggedIn) {
      props.history.push("/");
    }
  });

  const { getFieldDecorator } = props.form;

  const [pwdStatus, setPwdStatus] = useState("");
  const [unameStatus, setUnameStatus] = useState("");

  const handleSubmit = e => {
    e.preventDefault();
    props.form.validateFields(async (err, values) => {
      if (!err) {
        const { username, password } = values;

        const res = await getUser(username);

        if (res) {
          console.info("response", res);
          if (res.birth_year === password) {
            props.actions.loginUser(true, res);
            props.history.push("/");
          } else {
            setPwdStatus("error");
          }
        } else {
          setUnameStatus("error");
        }
        console.log("Received values of form: ", values);
      }
    });
  };

  const resetFieldStatus = () => {
    setUnameStatus("");
    setPwdStatus("");
  };

  return (
    <>
      <div>Login Here</div>
      <Form onSubmit={handleSubmit}>
        <Form.Item
          label="Username"
          hasFeedback
          validateStatus={unameStatus}
          help={unameStatus === "error" ? "please check the username" : ""}
        >
          {getFieldDecorator("username", {
            rules: [{ required: true, message: "Please input your username!" }]
          })(
            <Input
              prefix={<Icon type="user" style={{ color: "rgba(0,0,0,.25)" }} />}
              placeholder="Username"
              onChange={resetFieldStatus}
            />
          )}
        </Form.Item>
        <Form.Item
          label="Password"
          hasFeedback
          validateStatus={pwdStatus}
          help={pwdStatus === "error" ? "incorrect password" : ""}
        >
          {getFieldDecorator("password", {
            rules: [{ required: true, message: "Please input your Password!" }]
          })(
            <Input
              prefix={<Icon type="lock" style={{ color: "rgba(0,0,0,.25)" }} />}
              type="password"
              placeholder="Password"
              onChange={resetFieldStatus}
            />
          )}
        </Form.Item>
        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            className="login-form-button"
          >
            Log in
          </Button>
        </Form.Item>
      </Form>
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

const LoginComponent = Form.create()(Login);

export default connect(mapStateToProps, mapDispatchToProps)(LoginComponent);
