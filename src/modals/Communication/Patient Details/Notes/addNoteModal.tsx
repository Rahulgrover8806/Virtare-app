import { Button, Col, DatePicker, Form, Modal, Row, Select } from "antd";
import TextArea from "antd/lib/input/TextArea";
import moment from "moment";
import { useContext, useEffect, useState } from "react";
import { LoaderContext } from "../../../../layout/DashBoardLayout";
import {
  AddNoteCategoryGlobalCode,
  AddNoteTypeGlobalCode,
} from "../../Create Conversation/conversationModalApi";

interface IAddNoteModal {
  title: string;
  visible: boolean;
  setVisible: any;
}

export const AddNoteModal = ({ title, visible, setVisible }: IAddNoteModal) => {
  const [form] = Form.useForm();
  const [addType, setAddType] = useState<any>();
  const {setLoading} = useContext(LoaderContext);
  const [addCategory, setAddCategory] = useState<any>();
  const { Option } = Select;

  const handleCancel = () => {
    form.resetFields();
    setVisible(false);
  };
  const handleClick = () => {
    form.submit();
  };
  useEffect(() => {
    (async () => {
      setLoading(true);
      await AddNoteCategoryGlobalCode(setAddCategory);
      await AddNoteTypeGlobalCode(setAddType);
      setLoading(false);
    })();
    form.setFieldsValue({ date: moment(new Date(), dateFormat) });
  }, []);

  const dateFormat = "MMM d,YYYY";

  return (
    <>
      <Modal
        title={title}
        visible={visible}
        footer={null}
        width={700}
        className="add-note"
        onCancel={handleCancel}
      >
        <div>
          <Form size="large" form={form} layout="vertical" name="useForm">
            <Row gutter={[20, 48]}>
              <Col span={12}>
                <Form.Item
                  name="date"
                  label="Date"
                  rules={[
                    { required: true, message: "This input is required" },
                  ]}
                >
                  <DatePicker
                    format={dateFormat}
                    style={{
                      width: "100%",
                    }}
                    disabled
                  />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item
                  name="category"
                  label="Category"
                  rules={[
                    { required: true, message: "This input is required" },
                  ]}
                >
                  <Select>
                    {addCategory?.map((item: any, index: number) => {
                      return <Option value={item?.name}> {item?.name}</Option>;
                    })}
                  </Select>
                </Form.Item>
              </Col>
            </Row>
            <Row gutter={[20, 48]}>
              <Col span={12}>
                <Form.Item
                  name="type"
                  label="Type"
                  rules={[
                    { required: true, message: "This input is required" },
                  ]}
                >
                  <Select>
                    {addType?.map((item: any, index: number) => {
                      return <Option value={item?.name}> {item?.name}</Option>;
                    })}
                  </Select>
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item
                  name="removal reason"
                  label="Removal Reason"
                  rules={[
                    { required: true, message: "This input is required" },
                  ]}
                >
                  <Select>
                    <Option value="Low">Low</Option>
                    <Option value="Normal ">Normal</Option>
                    <Option value="High">High</Option>
                    <Option value="Other">Other</Option>
                  </Select>
                </Form.Item>
              </Col>
            </Row>
            <Row gutter={[20, 48]}>
              <Col span={24}>
                <Form.Item
                  name="user age"
                  label="User Age"
                  rules={[
                    { required: true, message: "This input is required" },
                  ]}
                >
                  <TextArea />
                </Form.Item>
              </Col>
            </Row>
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
    </>
  );
};
