import React, { useContext, useEffect } from "react";
import { message, notification } from "antd";
import { useQuery } from "react-query";
import { createApiClient } from "apiClient";
import {  UserRoles } from "constants/roles";
import { SuperAdminRoutes } from "./SuperAdminRoutes";
import { ClientAdminRoutes } from "./ClientAdminRoutes";
import { AdminRoutes } from "./AdminRoutes";
//import { UserContext, UserContextState } from "contextApis/userContext";


export const RoutesContainer: React.FC = () => {
//  const userContext = useContext<UserContextState>(UserContext);
 
  const { data } = useQuery("userData", async () => {
    return await createApiClient().getLoggedInUserData();
  });

  const userRole = sessionStorage.getItem("userRole");
  useEffect(() => {
    if (data) {
      // userContext.setLoggedInUserData(data);
    }
  }, [data]);

  return userRole === UserRoles.SUPER_ADMIN ? (
    <SuperAdminRoutes />
  ) : userRole === UserRoles.CLIENT_ADMIN ? (
    <ClientAdminRoutes />
  ) : (
    <AdminRoutes />
  );
};