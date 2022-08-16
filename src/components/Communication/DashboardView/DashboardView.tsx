import React, { useContext, useEffect, useState } from "react";
import { Row, Col } from "antd";
import { UserOutlined } from "@ant-design/icons";
import "./DashboardView.css";
import { dailyCount } from "./dashboardViewApi";
import DashboardCharts from "./DasboardCharts/DashboardCharts";
import { LoaderContext } from "../../../layout/DashBoardLayout";

const DashboardView = () => {
  const [count, setCount] = useState([]);
  const {setLoading} = useContext(LoaderContext);

  useEffect(() => {
    (async () => {
      setLoading(true);
      await dailyCount(setCount);
      setLoading(false);
    })();
  }, []);
  return (
    <>
      <Row className="wrapper">
        {count &&
          count?.map((item: any) => {
            return (
              <Col span={6} className="cards-wrapper">
                <div
                  className="colorbox"
                  style={{
                    backgroundColor: item?.backgroundColor,
                    color: "rgb(255, 255, 255)",
                  }}
                >
                  <span className="antIcon">
                    <UserOutlined width={"1em"} height={"1em"} />
                  </span>
                  <h3>{item?.count}</h3>
                  <p>{item?.text}</p>
                </div>
              </Col>
            );
          })}
      </Row>
      <DashboardCharts />
    </>
  );
};

export default DashboardView;
