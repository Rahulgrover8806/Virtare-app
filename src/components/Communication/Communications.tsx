import React, { useState } from "react";
import { Col, Row } from "antd";
import { Button } from "antd";
import { Typography } from "antd";
import { useNavigate } from "react-router-dom";
import "./Communication.css";

import DashboardView from "./DashboardView/DashboardView";
import ListView from "./ListView";
import { StartCallModal } from "../../modals/Communication/StartCall";
import { ConversationModal } from "../../modals/Communication/Create Conversation/conversationModal";

const Communications = () => {
  const [view, setView] = useState<boolean>(true);
  const [visible, setVisible] = useState(false);
  const [callModal, setCallModal] = useState(false);
  const navigate=useNavigate();
  const onTabChange = (tab: string) => {
    if (tab === "listView") {
      setView(false)
      navigate("?view=list")
    } 
    else {
      navigate("?view=dashboard")
      setView(true);
    }
  };
  return (
    <>
      {visible && (
        <ConversationModal
          setVisible={setVisible}
          title={"Communications"}
          visible={visible}
        />
      )}
          {callModal && (
        <StartCallModal
          setVisible={setCallModal}
          title={"Start Call"}
          visible={callModal}
        />
      )}
      <Row>
        <Col span={12}>
          <Typography.Title
            level={3}
            style={{
              margin: 0,
            }}
          >
            Communication
          </Typography.Title>
        </Col>
        <Col span={6}>
          <span className="communication-btn">
            <Button
              size={"large"}
              className="call-button"
              type="ghost"
              onClick={() => setCallModal(true)}
            >
              Start call
            </Button>
            <Button
              size={"large"}
              className="conversation-button"
              type="ghost"
              onClick={() => setVisible(true)}
            >
              Create Conversation
            </Button>
          </span>
        </Col>
        <Col span={6} className="content-btn">
          <button
            className={view ? "dashboard-btn" : "list-btn"}
            onClick={() => onTabChange("dashboardView")}
          >
            Dashboard view
          </button>
          <button
            className={view ? "list-btn" : "dashboard-btn"}
            onClick={() => onTabChange("listView")}
          >
            List view
          </button>
        </Col>
      </Row>
      {view ? <DashboardView /> : <ListView />}
    </>
  );
};

export default Communications;
