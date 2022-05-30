import React, { useState, useEffect } from "react";
import "./less/ListTable.less";
import { Table, Button, Space } from "antd";
import { Link } from "react-router-dom";
import { ArticleListApi } from "../request/api";

// 真正从后端拿的数据要替换这个data数组

export default function ListTable() {
  // 列表数组
  const [arr, SetArr] = useState([
    {
      key: "1",
      name: "John Brown",
      subName:"asda",
      address: "New York No. 1 Lake Park",
    },
  ]);

  //请求文章列表
  useEffect(() => {
    ArticleListApi().then((res) => {
      // console.log(res)
      //文章列表请求成功

      //获取data数据
      if (res.errCode === 0) {
        
        let newArr = JSON.parse(JSON.stringify(res.data.arr));
        /**
         * 1.要给每个数组项加key，让key=id
         * 2.需要有一套标签结构，赋予一个属性
         */
        newArr.map((item) => {
            item.key = item.id;
            item.mytitle = `
            <>
              <Link className="table_title" to="/">标题</Link>
              <h4>123</h4>
              <p style={{ color: "#999" }}>简直是大家</p>
            </>
            `;
          });
          console.log(newArr[0]);
          //setArr 设置参数导入
          SetArr(newArr)
          
      }
    });
  }, []);

  //每一列
  const columns = [
    {
      dataIndex: "name",
      key: "name",
      width: "60%",
      
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
      render: (text, record) => (
        <Space size="middle">
          <Button type="primary">编辑</Button>
          <Button type="danger">删除</Button>
        </Space>
      ),
    },
  ];
  return (
    <div>
      {/* columns是列， dataSource是数据 */}
      <Table
        className="list-table"
        showHeader={false}
        columns={columns}
        dataSource={arr}
      />
    </div>
  );
}
