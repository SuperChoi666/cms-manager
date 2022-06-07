import React, { useState, useEffect } from "react";
import { List, Skeleton, Pagination, Button } from "antd";
import { ArticleListApi } from "../request/api";
import moment from  "moment";

export default function ListList() {
  const [list, setList] = useState([]);
  const [total, setTotal] = useState(0);
  const [current, setCurrent] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  // 请求封装
  const getList = (num) => {
    ArticleListApi({
      num,
      count: pageSize,
    }).then((res) => {
      // console.log(res.data.arr)
      if (res.errCode === 0) {
        let { arr, total, num, count } = res.data;
        setList(arr);
        setTotal(total);
        setCurrent(num);
        setPageSize(count);
      }
    });
  };

  //请求列表数据
  useEffect(() => {
    getList(current);
  }, []);


  // 分页
  const onChange = (pages) => {
    // setCurrent(pages);  //setXX是异步的
    getList(pages);
  };

  return (
    <div className="list-table" style={{ padding: "20px" }}>
      <List
        className="demo-loadmore-list"
        itemLayout="horizontal"
        dataSource={list}
        renderItem={(item) => {
          // console.log(item);
          return (
            <List.Item
              actions={[
                <Button type='primary' onClick={()=>console.log(item.id)}>编辑</Button>,
                <Button type='danger' onClick={()=>console.log(item.id)}>删除</Button>,
              ]}
            >
              <Skeleton loading={false} title={false}>
                <List.Item.Meta
                  title={<a href="!#">{item.title}</a>}
                  description={item.subTitle}
                />
                <div>{moment(item.date).format("YYYY-MM-DD hh:mm:ss")}</div>
              </Skeleton>
            </List.Item>
          );
        }}
      />
      <Pagination
      style={{float:'right',marginTop:'20px'}}
        onChange={onChange}
        total={total}
        current={current}
        pageSize={pageSize}
      />
    </div>
  );
}
