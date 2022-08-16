import { Alert, Avatar, Col, Modal, Row, Space, Upload } from "antd";
import { useContext, useEffect, useState } from "react";
import ImgCrop from "antd-img-crop";
import {
  UserOutlined,
  MailOutlined,
  PhoneOutlined,
  EditOutlined,
  FieldTimeOutlined,
  FilePdfOutlined,
  BorderOuterOutlined,
  ScheduleOutlined,
  PushpinOutlined,
} from "@ant-design/icons";
import styled from "styled-components";
import moment from "moment";
import { Typography } from "antd";
import "./Style.css";
import { PatientTimeline } from "./Patient Details/Timeline/timeline";
import Notes from "./Patient Details/Notes/notes";
import { criticalNotes } from "../../components/Communication/ListView/listViewApi";
import AddPin from "./Patient Details/Add pin/addpin";
import Document from "./Patient Details/Document/document";
import Vital from "./Patient Details/Vital/vital";
import Appoinment from "./Patient Details/Appoinment/appoinment";
import { LoaderContext } from "../../layout/DashBoardLayout";

const { Text, Link } = Typography;
const Wrapper = styled.div`
  padding: 15px;
  background: #fafafa;
`;

interface ICareCoordinatorDetails {
  title: string;
  setVisible: any;
  visible: boolean;
  body: any;
  id?: any;
}

export default function CareCoordinatorDetails({
  title,
  setVisible,
  visible,
  body,
  id,
}: ICareCoordinatorDetails) {
  const handleCancel = () => {
    setVisible(false);
  };
  return (
    <>
      <Modal
        width={650}
        visible={visible}
        title={title}
        onCancel={handleCancel}
        footer={null}
        className="care-coordinator-modal"
      >
        <Row>
          <Col span={7}>
            {" "}
            <Avatar size={141} icon={<UserOutlined />} />
          </Col>
          <Col span={17}>
            <Space direction="vertical">
              <Text>Name:{body?.fullName}</Text>
              <Text>Designation:{body?.designation}</Text>
              <Link>
                {<MailOutlined />}
                <span className="icon-text">{body?.email}</span>
              </Link>
              <Link>
                {<PhoneOutlined />}
                <span className="icon-text">
                  {body?.phoneNumber
                    .replace(/\D+/g, "")
                    .replace(
                      /([0-9]{3})([0-9]{3})([0-9]{4}$)/gi,
                      "$1-$2-$3"
                    )}{" "}
                </span>
              </Link>
            </Space>
          </Col>
        </Row>
        <div className="care-coordinator-body">
          <Row>
            <Col span={5} offset={1}>
              Gender
            </Col>
            <Col span={4} offset={13}>
              {body?.gender}
            </Col>
          </Row>
          <Row>
            <Col span={5} offset={1}>
              Specialization
            </Col>
            <Col span={4} offset={13}>
              {body?.specialization}
            </Col>
          </Row>
          <Row>
            <Col span={5} offset={1}>
              Network
            </Col>
            <Col span={4} offset={13}>
              {body?.network}
            </Col>
          </Row>
          <Row>
            <Col span={5} offset={1}>
              Status
            </Col>
            <Col span={4} offset={13}>
              {body?.isActive === true ? "Active" : "Not Active"}
            </Col>
          </Row>
        </div>
      </Modal>
    </>
  );
}

export const PatientCoordinatorDetails = ({
  title,
  setVisible,
  visible,
  body,
  id,
}: ICareCoordinatorDetails) => {
  const handleCancel = () => {
    setVisible(false);
  };
  const [isPinAdded, setIsPinAdded] = useState<any>();
  const [addPin, setAddPin] = useState(false);
  const {setLoading} = useContext(LoaderContext);
  const [tabs, setTabs] = useState({
    timeline: false,
    vital: false,
    notes: false,
    document: false,
    appoinment: false,
  });
  const handleCheck = (name: string) => {
    if (name === "timeline") {
      setTabs({
        timeline: true,
        vital: false,
        notes: false,
        document: false,
        appoinment: false,
      });
    }
    if (name === "document") {
      setTabs({
        timeline: false,
        vital: false,
        notes: false,
        document: true,
        appoinment: false,
      });
    }
    if (name === "vital") {
      setTabs({
        timeline: false,
        vital: true,
        notes: false,
        document: false,
        appoinment: false,
      });
    }
    if (name === "note") {
      setTabs({
        timeline: false,
        vital: false,
        notes: true,
        document: false,
        appoinment: false,
      });
    }
    if (name === "appoinment") {
      setTabs({
        timeline: false,
        vital: false,
        notes: false,
        document: false,
        appoinment: true,
      });
    }
  };
  useEffect(() => {
    (async () => {
      setLoading(true);
      await criticalNotes(id, setIsPinAdded);
      setLoading(false);
    })();
  }, [addPin]);

  return (
    <>
      <Modal
        width={1200}
        visible={visible}
        title={title}
        onCancel={handleCancel}
        footer={null}
      >
        <Wrapper>
          <Row>
            <Col
              span={12}
              style={{
                backgroundColor: "#fff",
                padding: "10px",
                borderRadius: "16px",
              }}
            >
              <div className="patient-profile">
                <Row>
                  <Col span={8}>
                    {body?.profile_photo === "" ? (
                      <Avatar size={100} icon={<UserOutlined />} />
                    ) : (
                      <Avatar size={100} src={body?.profile_photo} />
                    )}
                    <ImgCrop
                      zoom={false}
                      rotate={false}
                      //  aspect={16/9}
                      modalTitle="Crop Image"
                      modalOk="Save"
                      modalCancel=" "
                    >
                      <Upload showUploadList={false}>
                        <Space direction="vertical">
                          <Link style={{ cursor: "pointer" }}>
                            <EditOutlined /> Change picture
                          </Link>
                        </Space>
                      </Upload>
                    </ImgCrop>
                  </Col>

                  <Col span={16}>
                    <Space direction="vertical">
                      <Text className="patient-name">
                        Name:{body?.fullName}
                      </Text>
                      <Text>
                        DOB:{moment(body?.dob).format("MMMM D, YYYY")}
                      </Text>
                      <Text>MRN:{body?.medicalRecordNumber}</Text>
                      <Link>
                        {<MailOutlined />}
                        <span className="icon-text">{body?.email}</span>
                      </Link>
                      <Link>
                        {<PhoneOutlined />}
                        <span className="icon-text">
                          {body?.phoneNumber
                            .replace(/\D+/g, "")
                            .replace(
                              /([0-9]{3})([0-9]{3})([0-9]{4}$)/gi,
                              "$1-$2-$3"
                            )}{" "}
                        </span>
                      </Link>
                    </Space>
                  </Col>
                </Row>
              </div>
            </Col>
            <Col span={12} style={{ padding: "10px" }}>
              <div className="patientDetails">
                <div
                  className="patientDetailsContent yellowBgColor"
                  onClick={() => handleCheck("timeline")}
                >
                  <FieldTimeOutlined />
                  <p>Timeline</p>
                </div>
                <div
                  className="patientDetailsContent green"
                  onClick={() => handleCheck("note")}
                >
                  <EditOutlined />
                  <p>Note(s)</p>
                </div>
                <div
                  className="patientDetailsContent blueBgColor"
                  onClick={() => handleCheck("document")}
                >
                  <FilePdfOutlined />
                  <p>Document(s)</p>
                </div>
              </div>
              <div className="patientDetails">
                <div
                  className="patientDetailsContent vital"
                  onClick={() => handleCheck("vital")}
                >
                  <BorderOuterOutlined />
                  <p>Vital(s)</p>
                </div>
                <div
                  className="patientDetailsContent skyBlueBgColor"
                  onClick={() => handleCheck("appoinment")}
                >
                  <ScheduleOutlined />
                  <p>Appoinment(s)</p>
                </div>
                <div
                  className="patientDetailsContent red"
                  onClick={() => setAddPin(true)}
                >
                  <PushpinOutlined />
                  <p>Add Pin</p>
                </div>
              </div>
            </Col>
          </Row>

          <div className="patient-wrapper">
            {isPinAdded?.length > 0 && (
              <div className="pinAlert">
                <Alert
                  message={isPinAdded[0]?.criticalNote}
                  type="success"
                  style={{ border: "3px solid green" }}
                  closable
                />
              </div>
            )}

            {addPin && (
              <AddPin id={id} visible={addPin} setVisible={setAddPin} />
            )}
            <div className="patient-tabs">
              {tabs?.notes && <Notes id={id} />}
              {tabs?.document && <Document id={id} />}
              {tabs?.vital && <Vital id={id} />}
              {tabs?.timeline && <PatientTimeline id={id} />}
              {tabs?.appoinment && <Appoinment id={id} name={body?.fullName} />}
            </div>
            {!(
              tabs?.notes ||
              tabs?.appoinment ||
              tabs?.document ||
              tabs?.vital ||
              tabs?.timeline
            ) && (
              <div className="no-data ">
                <Row>
                  <Col span={24}>No Data</Col>
                </Row>
              </div>
            )}
          </div>
        </Wrapper>
      </Modal>
    </>
  );
};
