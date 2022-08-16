import { Alert, Col, Row } from "antd";

const Vital = ({ id }: any) => {
  return (
    <div>
      <Row>
        <Col span={24} offset={8}>
        </Col>
      </Row>
      <Alert
        message="No devices are assigned to this Patient. Please assign device(s) to see Vitals."
        style={{fontWeight:"500",fontSize:"16px"}}
        type="error"
      />
    </div>
  );
};

export default Vital;
