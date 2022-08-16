import { Button, Col, Form, Modal, Row } from "antd";
import TextArea from "antd/lib/input/TextArea";
import "../../Style.css";
import { useContext, useState } from "react";
import { AddCriticalNotes } from "../../../../components/Communication/ListView/listViewApi";
import { LoaderContext } from "../../../../layout/DashBoardLayout";
interface IAddPin {
  id: any;
  visible: boolean;
  setVisible: any;
}

const AddPin = ({ id, visible, setVisible }: IAddPin) => {
  const {setLoading} = useContext(LoaderContext);
  const handleCancel = () => {
    setVisible(false);
  };
  const [form] = Form.useForm();
  const onFinish = async(values: any) => {
    setLoading(true);
    await AddCriticalNotes(id,{criticalNote:values.note});
    setLoading(false);
    setVisible(false);
  };
  return (
    <Modal
      width={1000}
      visible={visible}
      title={null}
      footer={null}
      onCancel={handleCancel}
      className="add-note"
    >
      <Form
        size="large"
        form={form}
        layout="vertical"
        name="useForm"
        onFinish={onFinish}
      >
        <Row gutter={[20, 48]}>
          <Col span={24}>
            <Form.Item
              name="note"
              label="Note"
              rules={[{ required: true, message: "This input is required" }]}
            >
              <TextArea rows={4} />
            </Form.Item>
          </Col>
        </Row>
      
      <div className="form-footer">
        <Form.Item >
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
                onClick={() => form.resetFields()}
              >
                Clear
              </Button>
              <Button type="primary" htmlType="submit">
                Save
              </Button>
            </Col>
          </Row>
        </Form.Item>
      </div>
        </Form>
    </Modal>
  );
};

export default AddPin;
