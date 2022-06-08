import React, { useEffect ,useState} from "react";
import "./less/Means.less";
import { Button, Form, Input, message,Upload } from "antd";
import { GetUserDataApi,ChangeUserDataApi } from "../request/api";
import { LoadingOutlined, PlusOutlined } from '@ant-design/icons';

// const onFinish = (values) => {
//   console.log("Success:", values);
// };

// const onFinishFailed = (errorInfo) => {
//   console.log("Failed:", errorInfo);
// };

// 将图片路径转base64
const getBase64 = (img, callback) => {
    const reader = new FileReader();
    reader.addEventListener('load', () => callback(reader.result));
    reader.readAsDataURL(img);
  };

// 限制图片大小只能时200kb
function beforeUpload (file) {
    const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
  
    if (!isJpgOrPng) {
      message.error('You can only upload JPG/PNG file!');
    }
  
    const isLt2M = file.size / 1024 / 1024 / 1024  < 200;
    // 除于三次1024得到（KB）然后再与200（KB）比较
  
    if (!isLt2M) {
      message.error('请上传小于200kB的图!');
    }
  
    return isJpgOrPng && isLt2M;
  };


export default function Means(props) {
    console.log(props)
    const [loading,setLoading] =useState(false)
  const [imageUrl, setImageUrl] = useState("");

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
//   点击了上传图片
  const handleChange = (info) => {
    if (info.file.status === 'uploading') {
      setLoading(true);
      return;
    }
//上传成功
    if (info.file.status === 'done') {
        // 文件的名称
        // console .log(info.file.response.data.filePath)
      // Get this url from response in real world.
      getBase64(info.file.originFileObj, (url) => {
        setLoading(false);
        setImageUrl(url);
        message.success("图片上传成功！")
        // 存储图片名称
        localStorage.setItem('avatar',info.file.response.data.filePath)
        // 触发Header组件更新
        // props.setMykey(props.myKey+1)
        // message.success("头像修改成功！")
        window.location.reload()  //强制页面刷新
        // react-redux
      });
    }
  };
//   上传按钮
  const uploadButton = (
    <div>
      {loading ? <LoadingOutlined /> : <PlusOutlined />}
      <div
        style={{
          marginTop: 8,
        }}
      >
        Upload
      </div>
    </div>
  );
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
      <p>点击下方修改头像：</p>
      <Upload
    //   跟后端要协约好的name字段
      name="avatar"
      listType="picture-card"
      className="avatar-uploader"
    //   多图上传与单图上传
      showUploadList={false}
    //   后端的接口
      action="/api/upload"
    //   上传前
      beforeUpload={beforeUpload}
      onChange={handleChange}
      headers={{"cms-token":localStorage.getItem('cms-token')}}
    >
      {imageUrl ? (
        <img
          src={imageUrl}
          alt="avatar"
          style={{
            width: '100%',
          }}
        />
      ) : (
        uploadButton
      )}
    </Upload>

    </div>
  );
}
