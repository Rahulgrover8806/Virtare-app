import React, { Suspense } from "react";
import AuthLayout from "./layout/AuthLayout";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import DashBoardLayout from "./layout/DashBoardLayout";
import { routes } from "./config/Routes";
// import { IRoute } from "./models/IHeader";
import 'antd/dist/antd.css';
import { IRoute } from "./modals/IHeader";

const App = () => {
  return (
    <>
      <Router>
        <Routes>
          {routes.map((route: IRoute) => {
            return (
              <Route
                path={route.path}
                element={
                  route.private ? (
                    <DashBoardLayout>
                      <Suspense fallback="">
                        <route.element />
                      </Suspense>
                    </DashBoardLayout>
                  ) : (
                    <AuthLayout>
                      <Suspense fallback="">
                        <route.element />
                      </Suspense>
                    </AuthLayout>
                  )
                }
              />
            );
          })}
        </Routes>
      </Router>
    </>
  );
};

export default App;
