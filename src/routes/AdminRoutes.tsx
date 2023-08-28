
import React from "react";
import { Routes, Route } from "react-router-dom";

import Result from "antd/lib/result";
import { AdminRoutesRef, SuperAdminRoutesRef } from "constants/routes";
import { AdminLayout } from "layouts/adminLayout";
import { DashboardPage } from "pages/DashbaordPage";
import { UserPage } from "pages/UsersPage";
import { LoginPage } from "pages/LoginPage";
import ClientListPage from "pages/client/client-list";



export const AdminRoutes: React.FC = () => {
  return (
    <div>
      <AdminLayout>
        <Routes>
          <Route path={`/`} element={<DashboardPage />} />
          
          <Route
            path={`/${AdminRoutesRef.User}`}
            element={<UserPage />}
          />
          <Route
            path={`/${AdminRoutesRef.Login}`}
            element={<LoginPage />}
          />
           <Route
            path={`/${AdminRoutesRef.Client}`}
            element={<ClientListPage />}
          />
          <Route
            path="*"
            element={
              <>
                <Result
                  status="404"
                  title="404"
                  subTitle="Sorry, the page you visited does not exist."
                />
              </>
            }
          />
        </Routes>
      </AdminLayout>
    </div>
  );
};