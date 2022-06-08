import React, { useEffect } from "react";
import "./less/Means.less";
import { Button, Form, Input, message } from "antd";
import { GetUserDataApi,ChangeUserDataApi } from "../request/api";
// const onFinish = (values) => {
//   console.log("Success:", values);
// };

// const onFinishFailed = (errorInfo) => {
//   console.log("Failed:", errorInfo);
// };

export default function Means() {
  //   const [username1, setUsername1] = React.useState("");
  //   const [password1, setPassword1] = React.useState("");
  // 查询
  useEffect(() => {
    GetUserDataApi().then((res) => {
      console.log(res);
      if (res.errCode === 0) {
        message.success(res.message);
        //   根本原因在于setxxx()是异步的
        // setUsername1(res.data.username);
        // setPassword1(res.data.password);
        // 解决思路
        //   把得到的username复制给placeholder

        //存到sessionStorage
        sessionStorage.setItem("username", res.data.username);
      }
    });
  }, []);

  // 表单提交的事件
  const onFinish = (values) => {
    // 如果表单的username有值，并且不等于初始化时拿到的username，同时密码非空
    if(values.username && values.username!==sessionStorage.getItem('username') && values.password.trim() !== ""){
      // 做表单的提交...
      ChangeUserDataApi({
        username: values.username,
        password: values.password
      }).then(res=>{
        console.log(res)
        // 当你修改成功的时候，不要忘了重新登录
      })
    }
  }

  return (
    <div className="means">
      <Form
        name="basic"
        style={{ width: "400px" }}
        // initialValues={{
        //   username: username1,
        //   password: password1,
        // }}
        onFinish={onFinish}
        autoComplete="off"
      >
        <Form.Item
          label="修改用户名："
          name="username"
          //   rules={[
          //     {
          //       required: true,
          //       message: "Please input your username!",
          //     },
          //   ]}
        >
          <Input placeholder="请输入新用户名" />
        </Form.Item>

        <Form.Item
          label="修 改 密 码："
          name="password"
          //   rules={[
          //     {
          //       required: true,
          //       message: "Please input your password!",
          //     },
          //   ]}
        >
          <Input.Password placeholder="请输入新密码" />
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit" style={{ float: "right" }}>
            提交
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
}
