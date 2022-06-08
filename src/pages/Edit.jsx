import React, { useEffect, useState } from "react";
import { Button, PageHeader, Modal, Form, Input, message } from "antd";
import moment from "moment";
import E from "wangeditor";
import {
  ArticleAddApi,
  ArticleSearchApi,
  ArticleUpdateApi,
} from "../request/api";
import { useParams, useNavigate, useLocation } from "react-router-dom";

let editor = null;
// console.log(new Date());

export default function Edit() {
  const [content, setContent] = useState("");
  const location = useLocation();
  const [title, setTitle] = useState("");
  const [subTitle, setSubTitle] = useState("");
  const [isModalVisible, setIsModalVisible] = useState(false);
  const navigate = useNavigate();
  const [form] = Form.useForm();
  const params = useParams();

  const dealData =(errCode,msg) =>{
//关闭对话框
setIsModalVisible(false);
if (errCode === 0) {
  // console.log(res);
  message.success(msg);
  setTimeout(() => {
    //跳回list页面
    navigate("/listlist");
  }, 1500);
} else {
  message.error(msg);
}
  }

  console.log(params);

  //   对话框点击了提交
  const handleOk = () => {
    form
      .validateFields() //校验  //字段
      .then((values) => {
        // form.resetFields(); //重置
        let { title, subTitle } = values;
        console.log(content);
        // 地址栏有id代表现在想要更新一片文章
        if (params.id) {
          //更新文章的请求
          ArticleUpdateApi({
            title,
            subTitle,
            content,
            id: params.id,
          }).then(res => dealData(res.errCode,res.message))
        } else {
          //添加文章的请求
          ArticleAddApi({
            title,
            subTitle,
            content,
          }).then(res => dealData(res.errCode,res.message))
        }
      })
      //   .catch(() => {
      //     return;
      //   });
      .catch(() => false);
  };

  //模拟componentDidMount
  useEffect(() => {
    editor = new E("#div1");
    editor.config.onchange = (newHtml) => {
      setContent(newHtml);
    };
    editor.create();

    //根据地址栏id做请求
    if (params.id) {
      ArticleSearchApi({ id: params.id }).then((res) => {
        if (res.errCode === 0) {
          editor.txt.html(res.data.content); //重新设置编译器内容
          // console.log(res.data.content)
          setTitle(res.data.title);
          setSubTitle(res.data.subTitle);
        }
      });
    }
    return () => {
      // 组件销魂时销毁编辑器 注:class写法需要在componentWillUnmount中调用
      editor.destroy();
    };
  }, [location.pathname]);

  return (
    <div>
      <PageHeader
        ghost={false}
        onBack={params.id ? () => window.history.back() : null}
        title="文章编辑"
        subTitle={"当前日期:" + moment(new Date()).format("YYYY-MM-DD")}
        extra={
          <Button
            key="1"
            type="primary"
            onClick={() => setIsModalVisible(true)}
          >
            提交文章
          </Button>
        }
      ></PageHeader>
      <div id="div1" style={{ padding: "0 20px 20px", background: "#fff" }}>
        <Modal
          zIndex={99999}
          title="填写文章标题"
          visible={isModalVisible}
          onOk={handleOk}
          onCancel={() => setIsModalVisible(false)}
          okText="提交"
          cancelText="取消"
        >
          <Form
            form={form}
            name="basic"
            labelCol={{
              span: 3,
            }}
            wrapperCol={{
              span: 21,
            }}
            // 自动补全
            autoComplete="off"
            initialValues={{ title, subTitle }}
          >
            <Form.Item
              label="标题"
              name="title"
              rules={[
                {
                  required: true,
                  message: "请填写标题",
                },
              ]}
            >
              <Input />
            </Form.Item>

            <Form.Item label="副标题" name="subTitle">
              <Input />
            </Form.Item>
          </Form>
        </Modal>
      </div>
    </div>
  );
}
