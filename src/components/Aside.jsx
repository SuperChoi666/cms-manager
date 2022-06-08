import React ,{useEffect,useState} from 'react'
import { Menu } from 'antd';
import { useNavigate ,useLocation} from 'react-router-dom';
import { ReadOutlined,EditOutlined,FormOutlined } from '@ant-design/icons';



export default function Aside() {

    const navigate = useNavigate()
    const location = useLocation()
    const [defaultKey,setDefaultKey]= useState('')

    // 一般加个空数组就是为了模仿componentDidMounted
    useEffect(() => {
        let path =location.pathname
        let key=(path.split('/')[1])     //'/edit'->['','edit']
        setDefaultKey(key)
    }, [location.pathname])

    const onClick = (e) => {
        navigate('/'+ e.key);
        setDefaultKey(e.key)
      };
        return (
          <Menu
            onClick={onClick}
            style={{
              width: 180,
            }}
            selectedKeys={[defaultKey]}
            mode="inline"
            className='aside'
            theme="dark"
            
          >
          <Menu.Item key='listlist'><ReadOutlined />查看文章列表list</Menu.Item>
          <Menu.Item key='listtable'><ReadOutlined />查看文章列表table</Menu.Item>
          <Menu.Item key='edit'><EditOutlined />文章编辑</Menu.Item>
          <Menu.Item key='means'><FormOutlined />修改资料</Menu.Item>
          </Menu>
        );
      };
