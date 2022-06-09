import React,{useState}from "react";
import "./assets/base.less";
import { Outlet } from "react-router-dom";
import { Layout } from "antd";
import Header from "./components/Header";
import Aside from "./components/Aside";
import Bread from "./components/Bread";

const { Content } = Layout;

export default function App() {
  const[Mykey,setMyKey]=useState(1)
  return (
    <Layout id="app">
      <Header key={Mykey}/>
      <div className='container'>
        <Aside />
        <div className='container_box'>
          <Bread />
          <div className="container_content">
            <Outlet  myKey={Mykey} setMykey={setMyKey}/>
          </div>
        </div>
      </div>
      <footer>Respect | Copyright &copy; 2022 Choi 学习来源:前端aka</footer>
    </Layout>
  );
}
