import React, { useState } from "react";
import type { MenuProps } from "antd";
import { Button, Dropdown, Table, message } from "antd";
import type { ColumnsType } from "antd/es/table";
import { Avatar } from "antd";
import { Client } from "api/SharedTypes";
import { useQuery } from "react-query";
import { createApiClient } from "api/apiClient";

const accessToken = localStorage.getItem("access_token");

const apiClient = createApiClient(accessToken!);

interface ClientListProps {
  data: any;
}
const ClientTable: React.FC<ClientListProps> = ({data}) => {
  

  const items: MenuProps["items"] = [
    {
      label: "View",
      key: "1",
    },
    {
      label: "View Member",
      key: "2",
    },
    {
      label: "Delete",
      key: "3",
      danger: true,
    },
  ];

  const handleMenuClick: MenuProps["onClick"] = (e) => {
    message.info("Click on menu item.");
    console.log("click", e);
  };

  const menuProps = {
    items,
    onClick: handleMenuClick,
  };

  const columns: ColumnsType<Client> = [
    {
      title: "Display Name",
      dataIndex: "name",
      key: "name",
      render: (_, { name }) => (
        <>
          {
            <Avatar
              style={{ verticalAlign: "middle" }}
              shape="square"
              size="large"
            >
              {name.charAt(0)}
            </Avatar>
          }
          <span style={{ marginLeft: 5 }}>{name}</span>
        </>
      ),
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Identifier",
      dataIndex: "identifier",
      key: "identifier",
    },

    {
      title: "Action",
      key: "identifier",
      render: (_, { identifier }) => (
        <>
          <Dropdown menu={menuProps}>
            <Button>...</Button>
          </Dropdown>
        </>
      ),
    },
  ];

  return (
    <>
      <Table columns={columns} dataSource={data}></Table>
    </>
  );
};

export default ClientTable;
