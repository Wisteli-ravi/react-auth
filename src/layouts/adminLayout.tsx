import React, { useState } from "react";
import styled from "styled-components";
import { useLocation } from "react-router-dom";
import '../antd.css'
import { Layout, Menu, theme } from 'antd';
import { MenuComponent } from "../compoents/MenuComponent"
const { Header, Content, Footer, Sider } = Layout;

type Props = {
    children?: React.ReactNode
  };

export const AdminLayout: React.FC<Props> = ({ children }) => {
  const location = useLocation();
  const {
    token: { colorBgContainer },
  } = theme.useToken();
  const [collapsed, setCollapsed] = useState(false);
  
  return (
    <Layout hasSider>
      <Sider collapsible collapsed={collapsed} onCollapse={(value) => setCollapsed(value)} style={{
          overflow: 'auto',
          height: '100vh',
         
          left: 0,
          top: 0,
          bottom: 0,
          paddingTop: 64
        }}>
       
       <MenuComponent></MenuComponent>
      </Sider>
      <Layout className="site-layout" >
        <Header
        style={{
          position: 'sticky',
          top: 0,
          zIndex: 1,
          width: '100%',
          display: 'flex',
          alignItems: 'center',
          paddingLeft: 200,
          
        }}
      >
         <div className="demo-logo" />
        
      </Header>
        <Content style={{ margin: '24px 16px 0', overflow: 'initial' }}>
          <div style={{ padding: 24, textAlign: 'center', background: colorBgContainer, minHeight: 360 }}>
          <LayoutStyled>{children}</LayoutStyled>
          </div>
          
        </Content>
        <Footer style={{ textAlign: 'center' }}>Ant Design ©2023 Created by Ant UED</Footer>
      </Layout>
    </Layout>
  );
};

const LayoutStyled = styled(Layout)`
  overflow-x: hidden;
  overflow: auto;
  padding: 15px 18px 18px 18px;
  background-color: #fff;
`;