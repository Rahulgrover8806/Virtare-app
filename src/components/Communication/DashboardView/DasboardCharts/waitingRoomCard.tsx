import { Button, Col, Row, Space, Table, Typography } from "antd";
import { useContext, useEffect, useState } from "react";
import { InfoCircleOutlined } from "@ant-design/icons";
import "../../ListView/Style.css";
import { patientCoordinator, WaitingRoomList } from "../../ListView/listViewApi";
import { PatientCoordinatorDetails } from "../../../../modals/Communication/modalList";
import { LoaderContext } from "../../../../layout/DashBoardLayout";

let id: any;
export const WaitingRoomCard = () => {
  const {setLoading} = useContext(LoaderContext);
  const [conferenceList, setConferenceList] = useState();
  const [patientDetails, setPatientDetails] = useState();
  const [patientModal, setPatientModal] = useState(false);
  const { Link } = Typography;

  const handleClick = (e: any, item: any) => {
    (async () => {
      setLoading(true);
      id = item?.patientUdid;
      await patientCoordinator(item?.patientUdid, setPatientDetails);
      setPatientModal(true);
      setLoading(false);
    })();
  };
  const columns = [
    {
      title: "Patient Name",
      dataIndex: "patient",
      key: "patientName",
      render: (patient: any, item: any) => (
        <>
          <Space size="middle">
            <Link>
              {patient}
              <span
                className="list-modal"
                onClick={(e: any) => handleClick(e, item)}
              >
                {<InfoCircleOutlined />}{" "}
              </span>
            </Link>
          </Space>
        </>
      ),
    },
    {
      title: "Appointment Type",
      dataIndex: "appointmentType",
      key: "appointmentType",
    },
    {
      title: "Time",
      dataIndex: "date",
      key: "time",
    },
    {
      title: "Action",
      dataIndex: "detail",
      key: "action",
      render: (item: any, data: any) => <Button type="primary">Start</Button>,
    },
  ];
  useEffect(() => {
    (async () => {
      setLoading(true);
      await WaitingRoomList(setConferenceList);
      setLoading(false);
    })();
    console.log(conferenceList);
  }, []);

  return (
    <div style={{ minHeight: "298px" }} className="communication-table">

      {patientModal && (
        <PatientCoordinatorDetails
          id={id}
          title="Patient Details"
          setVisible={setPatientModal}
          visible={patientModal}
          body={patientDetails}
        />
      )}

      <Row>
        <Col span={24}>
          <Table
            columns={columns}
            dataSource={conferenceList}
            pagination={false}
          />
        </Col>
      </Row>
    </div>
  );
};
