import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  UploadOutlined,
  UserOutlined,
  VideoCameraOutlined,
} from "@ant-design/icons";
import { Layout, Menu } from "antd";
import React, { useState, createContext } from "react";
import Loader from "../../components/Controls/Loader/Index";
import "./Style.css";
import { useNavigate } from "react-router-dom";


const { Header, Sider, Content } = Layout;

export const LoaderContext =createContext<any>(null)

const DashBoardLayout = ({ children }: { children: JSX.Element }) => {
  const [collapsed, setCollapsed] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate(); 
   const handleChange=()=>{
    navigate('/communication?view=dashboard')
   }
  return (
    <LoaderContext.Provider value={{ setLoading : setLoading}}>
    <Layout className="layout">
      <Sider trigger={null} collapsible collapsed={collapsed}>
        <div className="logo" />
        <Menu
          theme="dark"
          mode="inline"
          defaultSelectedKeys={["1"]}
          items={[
            {
              key: "1",
              icon: <UserOutlined />,
              label: "Clinical Dasboard",
            },
            {
              key: "2",
              icon: <VideoCameraOutlined />,
              label: "Business Dasboard",
            },
            {
              key: "3",
              icon: <UploadOutlined />,
              label: "Escalations",
            },
            {
              key: "4",
              icon: <UploadOutlined />,
              label: "Referrals",
            },
            {
              key: "5",
              icon: <UploadOutlined />,
              label: "Communications",
              onClick:()=>handleChange()
            },
          ]}
        />
      </Sider>
      <Layout className="site-layout">
        <Header
          className="site-layout-background"
          style={{ padding: "0 10px" }}
        >
          {React.createElement(
            collapsed ? MenuUnfoldOutlined : MenuFoldOutlined,
            {
              className: "trigger",
              onClick: () => setCollapsed(!collapsed),
            }
          )}
        </Header>
        <Content className="site-layout-background main-content">
          <Loader loading={loading}/>
          {children}
        </Content>
      </Layout>
    </Layout>
    </LoaderContext.Provider>
  );
};

export default DashBoardLayout;
