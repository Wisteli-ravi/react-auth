import React, { useState } from 'react';
import './antd.css'
import { Layout, Menu, theme } from 'antd';
import { AppRoutes } from './pages/routes'
import { MenuComponent } from './compoents/MenuComponent';
import { RoutesContainer } from './routes/RoutesContainer';


const { Header, Content, Footer, Sider } = Layout;


const App: React.FC = () => {

  return (
    <RoutesContainer />
  );
};

export default App;