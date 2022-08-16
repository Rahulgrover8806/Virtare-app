import { Button, Col, Row, Table, Typography } from "antd";
import { useContext, useEffect, useState } from "react";
import { patientAppoinment } from "../../../../components/Communication/ListView/listViewApi";
import { LoaderContext } from "../../../../layout/DashBoardLayout";
import { AddAppoinment } from "./addAppoinment";

const Appoinment = ({ id,name }: any) => {
  const [appoinment, setAppoinment] = useState();
  const {setLoading} = useContext(LoaderContext);
  const [visible, setVisible] = useState(false);
  const { Link } = Typography;
  useEffect(() => {
    (async () => {
      setLoading(true);
     await patientAppoinment(id, setAppoinment);
      setLoading(false);
    })();
  }, []);

  const columns = [
    {
      title: "Type",
      dataIndex: "appointmentType",
      key: "type",
      width: "16%",
    },
    {
      title: "Care Coordinator",
      dataIndex: "staff",
      key: "care-coordinator",
      width: "16%",
      render: (staff: any) => <Link> {staff?.fullName} </Link>,
    },
    {
      title: "Time",
      dataIndex: "date",
      key: "date",
      width: "20%",
    },
    {
      title: "Duration",
      dataIndex: "duration",
      key: "duration",
      width: "16%",
    },
    {
      title: "Notes",
      dataIndex: "notes",
      key: "notes",
      width: "16%",
    },
    {
      title: "Priority",
      dataIndex: "flagName",
      key: "priority",
      width: "16%",
    },
  ];
  return (
    <>
     <AddAppoinment name={name} visible={visible} setVisible={setVisible} title="Add Appoinment"/>
      <Row>
        <Col span={2}>
          <Button type="primary" onClick={() => setVisible(true)}>
            Add Appoinment  
          </Button>
        </Col>
      </Row>
      <Row>
        <Col span={24}>
          <Table columns={columns} dataSource={appoinment} pagination={false} />
        </Col>
      </Row>
    </>
  );
};

export default Appoinment;
