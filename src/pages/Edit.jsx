import React, { useEffect, useState } from "react";
import { Button, PageHeader, Modal, Form, Input } from "antd";
import moment from "moment";
import E from "wangeditor";
import { ArticleAddApi } from "../request/api";

let editor = null;
// console.log(new Date());

export default function Edit() {
  const [content, setContent] = useState("");
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [form] = Form.useForm();

  //   对话框点击了提交
  const handleOk = () => {
    // setIsModalVisible(false);

    form
      .validateFields() //校验  //字段
      .then((values) => {
        // form.resetFields(); //重置
        let { title, subTitle } = values;
        console.log(content);
        //请求
        ArticleAddApi({
          title,
          subTitle,
          content,
        }).then((res) => {
          console.log(res);
        });
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

    return () => {
      // 组件销魂时销毁编辑器 注:class写法需要在componentWillUnmount中调用
      editor.destroy();
    };
  }, []);

  return (
    <div>
      <PageHeader
        ghost={false}
        onBack={() => window.history.back()}
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
