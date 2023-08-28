
import { useNavigate } from "react-router-dom";

import {
  PieChartOutlined,
  TeamOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { Menu } from "antd";
import type { MenuProps } from "antd";
type MenuItem = Required<MenuProps>["items"][number];

function getItem(
  label: React.ReactNode,
  key: React.Key,
  icon?: React.ReactNode,
  children?: MenuItem[],
): MenuItem {
  return {
    key,
    icon,
    children,
    label,
  } as MenuItem;
}

const items: MenuItem[] = [
  getItem("Dashbaord", "/", <PieChartOutlined />),
  getItem("Application", "application", <TeamOutlined />, [
    getItem("Team 1", "application-1"),
    getItem("Login", "/login"),
  ]),
  getItem("User Management", "user", <UserOutlined />, [
    getItem("Users", "/user"),
    getItem("Roles", "/roles"),
    
  ]),
  getItem("Client", "/client"),
  
];



export const MenuComponent = () => {
    const navigate = useNavigate();
    return (
        <>
        <Menu theme="dark" defaultSelectedKeys={['1']} onClick={({key}) => {
            console.log(key)
            navigate(key)
        }} mode="inline" items={items} />
        </>
    );
};
