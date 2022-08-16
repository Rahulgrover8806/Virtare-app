import { useContext, useState } from "react";
import { Card, Col, Row } from "antd";
import { useEffect } from "react";
import "../DashboardView.css";
import { communicationPlanned, communicationStatus } from "../dashboardViewApi";
import { WaitingRoomCard } from "./waitingRoomCard";
import CallPlanned from "./CallPlanned";
import CallStatus from "./CallStatus";
import  {LoaderContext}  from "../../../../layout/DashBoardLayout";

const tabList = [
  {
    key: "newRequests",
    tab: "New Requests",
  },
];
const contentList: Record<string, React.ReactNode> = {
  tab1: <WaitingRoomCard />,
};

const DashboardCharts = () => {
  const [chartStore, setChartStore] = useState({
    planned: [],
    status: [],
    type: [],
  });
  const {setLoading} = useContext(LoaderContext);
  useEffect(() => {
    (async () => {
      setLoading(true);
      communicationPlanned(setChartStore);
      communicationStatus(setChartStore);
      // communicationType(setChartStore);
      setLoading(false);
    })();
  }, []);
  return (
    <>
      <Row gutter={20}>
        <Col span={12}>
          <Card
            className="chart-card"
            bordered={false}
            title="Call Planned"
            headStyle={{ fontSize: "x-large" }}
          >
            <CallPlanned params={chartStore.planned} />
          </Card>
        </Col>
        <Col span={12}>
          <Card
            className="chart-card"
            bordered={false}
            title="Call Status"
            headStyle={{ fontSize: "x-large" }}
          >
            <CallStatus params={chartStore.status} />
          </Card>
        </Col>
      </Row>
      <Row gutter={20}>
        <Col span={12}>
          <Card
            className="chart-card"
            bordered={false}
            title="Populate Waiting Room"
            tabList={tabList}
            activeTabKey="newRequests"
            headStyle={{ fontSize: "x-large" }}
          >
            {contentList.tab1}
          </Card>
        </Col>
      </Row>
    </>
  );
};

export default DashboardCharts;
