import React, { useState, useEffect } from "react";
import "./less/ListTable.less";
import { Table, Button, Space ,message} from "antd";
// import { Link } from "react-router-dom";
import moment from "moment";
import { useNavigate } from "react-router-dom";
import { ArticleListApi, ArticleDelApi } from "../request/api";

// 标题组件
function MyTitle(props) {
  return (
    <div>
      <a
        className="table_title"
        target="_black"
        href={"http://codesohigh.com:8765/article/" + props.id}
        to="/"
      >
        {props.title}
      </a>
      <h4>123</h4>
      <p style={{ color: "#999" }}>{props.subTitle}</p>
    </div>
  );
}

// 真正从后端拿的数据要替换这个data数组

export default function ListTable() {
  const navigate = useNavigate();
  // 列表数组
  const [arr, SetArr] = useState([
    {
      key: "1",
      name: "John Brown",
      subName: "asda",
      address: "New York No. 1 Lake Park",
    },
  ]);
  // 分页
  const [pagination, setPagination] = useState({
    current: 1,
    pageSize: 10,
    total: 0,
  });

  // 提取请求的代码
  const getArticleList = (current, pageSize) => {
    ArticleListApi({
      num: current,
      count: pageSize,
    }).then((res) => {
      // console.log(res)
      //文章列表请求成功

      //获取data数据
      if (res.errCode === 0) {
        console.log(res.data);
        // 更改pagination
        let { num, count, total } = res.data;
        setPagination({
          current: num,
          pageSize: count,
          total,
        });
        // 深拷贝获取到的数组
        let newArr = JSON.parse(JSON.stringify(res.data.arr));
        // 声明一个空数组
        let myarr = [];
        /**
         * 1.要给每个数组项加key，让key=id
         * 2.需要有一套标签结构，赋予一个属性
         */
        // .map是循环处理的
        // newArr.map((item) => {
        // item.key = item.id;
        // item.date = moment(item.date).format("YYYY-MM-DD hh:mm:ss");
        // item.mytitle = `
        //   <div>
        //     <Link className="table_title" to="/">${item.title}</Link>
        //     <h4>123</h4>
        //     <p style={{ color: "#999" }}>${item.subTitle}</p>
        //   </div>
        //   `;
        /**
         * 写活字符串的方法。（优化）👇
         */
        newArr.map((item) => {
          let obj = {
            key: item.id,
            date: moment(item.date).format("YYYY-MM-DD hh:mm:ss"),
            mytitle: (
              <MyTitle
                id={item.id}
                title={item.title}
                subTitle={item.subTitle}
              />
            ),
          };
          myarr.push(obj);
        });
        // console.log(newArr[0]);
        // console.log(newArr);
        //setArr 设置参数导入
        // SetArr(newArr);
        SetArr(myarr);
      }
    });
  };

  //请求文章列表(mounted)
  useEffect(() => {
    getArticleList(pagination.current, pagination.pageSize);
  }, []);

  // 分页的函数
  const pageChange = (arg) => {
    console.log(pagination);
    getArticleList(arg.current, arg.pageSize);
  };

  // 删除
  const delFn = (id) => {
    // console.log(id)
    ArticleDelApi({ id }).then((res) => {
      if (res.errCode === 0) {
        message.success(res.message);
        //重新刷页面，要么重新请求这个列表的数据  window.reload   调用getList(1)  增加变量的检测
        // getList(1);
        getArticleList(1, pagination.pageSize);

      }
    });
  };

  //每一列
  const columns = [
    {
      dataIndex: "mytitle",
      key: "mytitle",
      width: "60%",
      //   render: (text) => <div dangerouslySetInnerHTML={{ __html: text }}></div>,
      // },
      render: (text) => <div>{text}</div>,
    },

    {
      dataIndex: "date",
      key: "date",
      render: (text) => (
        <>
          <p>{text}</p>
        </>
      ),
    },

    {
      key: "action",
      render: (text) => {
        return (
          <Space size="middle">
            {/**text.key就是id */}
            <Button type="primary" onClick={() => navigate("/edit/" + text.key)}>
              编辑
            </Button>
            <Button type="danger" onClick={() => delFn(text.key)}>
              删除
            </Button>
          </Space>
        );
      },
    },
  ];
  return (
    <div className="list-table">
      {/* columns是列， dataSource是数据 */}
      <Table
        // className="list-table"
        showHeader={false}
        columns={columns}
        dataSource={arr}
        onChange={pageChange}
        pagination={pagination}
      />
    </div>
  );
}
