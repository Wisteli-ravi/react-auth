import React from "react";
import Layout from "antd/lib/layout";
import styled from "styled-components";
import { useLocation } from "react-router-dom";

type Props = {
    children?: React.ReactNode
  };
export const SuperAdminLayout: React.FC<Props> = ({ children }) => {
  const location = useLocation();
  return (
    <Layout
      style={{
        minHeight: "100vh",
        maxHeight: "100vh",
        paddingTop: "125px"
      }}
    >
        <LayoutStyled>{children}</LayoutStyled>
    </Layout>
  );
};

const LayoutStyled = styled(Layout)`
  overflow-x: hidden;
  overflow: auto;
  padding: 15px 18px 18px 18px;
  background-color: #fff;
`;