import { Col, Modal, Row, Form, Input, Select, Button } from "antd";
import TextArea from "antd/lib/input/TextArea";
import { useEffect, useState } from "react";
import "../Style.css";
import {
  ConversationGlobalCodeModal,
  ConversationStaffModal,
  ConversationPatientModal,
  ConversationGlobalCodeMessageModal,
} from "./conversationModalApi";

interface IConversationModal {
  title: string;
  setVisible: any;
  visible: boolean;
}
export const ConversationModal = ({
  title,
  setVisible,
  visible,
}: IConversationModal) => {
  const [coordinator, setCoordinator] = useState(true);
  const [conversationModal, setConversationModal] = useState({
    globalCode: [],
    patient: [],
    staff: [],
    messageCategory: [],
  });

  const [loading, setLoading] = useState(false);
  const handleCancel = () => {
    form.resetFields();
    setVisible(false);
  };
  useEffect(() => {
    (async () => {
      setLoading(true);
      await ConversationGlobalCodeModal(setConversationModal);
      await ConversationStaffModal(setConversationModal);
      await ConversationPatientModal(setConversationModal);
      await ConversationGlobalCodeMessageModal(setConversationModal);
      setLoading(false);
    })();
  }, []);

  const handleClick = (active: any) => {
    form.setFieldsValue({
      patient: "",
    });
    if (active === "patient") {
      setCoordinator(true);
    } else {
      setCoordinator(false);
    }
  };

  const [form] = Form.useForm();
  const { Option } = Select;
  return (
    <>
      <Modal
        width={1000}
        visible={visible}
        title={title}
        footer={null}
        onCancel={handleCancel}
        className="add-note"
      >
        <Form size="large" form={form} layout="vertical" name="userForm" >
          <Row gutter={[20, 48]}>
            <Col span={12}>
              <Form.Item
                name="from"
                label="From"
                rules={[
                  {
                    required: true,
                    message: "This input is required",
                  },
                ]}
              >
                <Select defaultValue="Admin,Super">
                  {conversationModal.staff?.map((item: any, index: number) => {
                    return (
                      <Option value={item?.fullName}>{item?.fullName}</Option>
                    );
                  })}
                </Select>
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item name="to" label="To">
                <button
                  type="button"
                  onClick={() => handleClick("patient")}
                  className={
                    coordinator ? "modal-active-btn" : "modal-inactive-btn"
                  }
                >
                  Patient
                </button>
                <button
                  type="button"
                  onClick={() => handleClick("care-coordinator")}
                  className={
                    !coordinator ? "modal-active-btn" : "modal-inactive-btn"
                  }
                >
                  Care Coordinator
                </button>
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={[20, 48]}>
            <Col span={12}>
              <Form.Item
                name="patient"
                label={coordinator ? "Patient" : "Care Coordinator"}
                rules={[
                  {
                    required: true,
                    message: "This input is required",
                  },
                ]}
              >
                <Select>
                  {coordinator
                    ? conversationModal.patient?.map(
                        (item: any, index: number) => {
                          return (
                            <Option value={item?.fullName} key={index}>
                              {item?.fullName}
                            </Option>
                          );
                        }
                      )
                    : conversationModal.staff?.map(
                        (item: any, index: number) => {
                          return (
                            <Option value={item?.fullName} key={index}>
                              {item?.fullName}
                            </Option>
                          );
                        }
                      )}
                </Select>
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="messageCategory"
                label="Message Category"
                rules={[
                  {
                    required: true,
                    message: "This input is required",
                  },
                ]}
              >
                <Select>
                  {conversationModal.messageCategory?.map(
                    (item: any, index: number) => {
                      return <Option value={item?.name}>{item?.name}</Option>;
                    }
                  )}
                </Select>
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={[20, 48]}>
            <Col span={12}>
              <Form.Item
                name="priority"
                label="Priority"
                rules={[
                  {
                    required: true,
                    message: "This input is required",
                  },
                ]}
              >
                <Select>
                  {conversationModal.globalCode?.map(
                    (item: any, index: number) => {
                      return <Option value={item?.name}>{item?.name}</Option>;
                    }
                  )}
                </Select>
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="messageType"
                label="Message Type"
                rules={[
                  {
                    required: true,
                    message: "This input is required",
                  },
                ]}
              >
                <Select defaultValue={"Select Message Type"}>
                  <Option value="Select Message Type" disabled>
                    Select Message Type
                  </Option>
                  <Option value="App Message">App Message</Option>
                  <Option value="Email">Email</Option>
                  <Option value="SMS">SMS</Option>
                </Select>
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={[20, 48]}>
            <Col span={24}>
              <Form.Item
                name="message"
                label="Message"
                rules={[
                  {
                    required: true,
                    message: "This input is required",
                  },
                ]}
              >
                <TextArea />
              </Form.Item>
            </Col>
          </Row>
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
              <Button type="primary" htmlType="submit">
                Save
              </Button>
            </Col>
          </Row>
        </Form>
      </Modal>
    </>
  );
};
