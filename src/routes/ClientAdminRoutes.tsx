
import React from "react";
import { Routes, Route } from "react-router-dom";

import Result from "antd/lib/result";
import { SuperAdminRoutesRef } from "constants/routes";
import { ClientAdminLayout } from "layouts/clientAdminLayout";
import { DashboardPage } from "pages/DashbaordPage";
import { UserPage } from "pages/UsersPage";

export const ClientAdminRoutes: React.FC = () => {
  return (
    <div>
      <ClientAdminLayout>
        <Routes>
          <Route path={`/`} element={<DashboardPage />} />
          
          <Route
            path={`/${SuperAdminRoutesRef.User}/:id`}
            element={<UserPage />}
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
      </ClientAdminLayout>
    </div>
  );
};