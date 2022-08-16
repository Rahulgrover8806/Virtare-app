import { Button, Col, Form, Modal, Row, Select } from "antd";
import TextArea from "antd/lib/input/TextArea";
import "../../Style.css";

interface IUpdateFlag {
  title: string;
  visible: boolean;
  setVisible: any;
}
export const UpdateFlag = ({ title, setVisible, visible }: IUpdateFlag) => {
  const [form] = Form.useForm();
  const { Option } = Select;

  const handleCancel = () => {
    form.resetFields();
    setVisible(false);
  };
  const handleClick = () => {
    form.submit();
  };
  return (
    <Modal
      title={title}
      visible={visible}
      footer={null}
      width={700}
      onCancel={handleCancel}
      className="add-note"
    >
      <div >
        <Form form={form} size="large" layout="vertical" name="useForm">
          <Form.Item
            name="removal reason"
            label="Removal Reason"
            rules={[{ required: true, message: "This input is required" }]}
          >
            <Select>
              <Option value="Appoinment Created">Appoinment Created</Option>
              <Option value="Normal Reading">Normal Reading</Option>
              <Option value="Wrong Input">Wrong Input</Option>
              <Option value="Escaleted">Escaleted</Option>
              <Option value="Resolved">Resolved</Option>
            </Select>
          </Form.Item>
          <Form.Item
            name="user age"
            label="User Age"
            rules={[{ required: true, message: "This input is required" }]}
          >
            <TextArea />
          </Form.Item>
        </Form>
        <Row>
          <Col
            span={24}
            style={{
              textAlign: "right",
            }}
          >
            <Button
              style={{
                margin: "0 8px",
              }}
              onClick={() => handleCancel()}
            >
              Cancel
            </Button>
            <Button type="primary" onClick={() => handleClick()}>
              Save
            </Button>
          </Col>
        </Row>
      </div>
    </Modal>
  );
};
