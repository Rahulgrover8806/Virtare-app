import { Button, Col, Form, Input, Modal, Row, Select } from "antd";
import { useContext, useEffect, useState } from "react";
import { LoaderContext } from "../../../../layout/DashBoardLayout";
import { DocumentFileUploader, GlobalCode } from "../../Create Conversation/conversationModalApi";

interface IAddDocument {
  visible: boolean;
  setVisible: any;
  title: string;
}
export const AddDocument = ({ title, visible, setVisible }: IAddDocument) => {
  const [documentType, setDocumentType] = useState<any>();
  const {setLoading} = useContext(LoaderContext);
  const [documentTags, setDocumentTags] = useState<any>();
  useEffect(() => {
    (async () => {
      setLoading(true);
      await GlobalCode(11, setDocumentType);
      await GlobalCode(12, setDocumentTags);
      setLoading(false);
    })();
  }, []);
  const handleCancel = () => {
    setVisible(false);
  };
  const handleClick = () => {
    form.submit();
  };
  const fileUpload = async (e: any) => {
    const { value: inputValue } = e.target;
    let formData = new FormData();
    formData.append("file", inputValue);
    await DocumentFileUploader(formData);
  };

  const [form] = Form.useForm();
  const { Option } = Select;

  return (
    <>
      <Modal
        title={title}
        visible={visible}
        footer={null}
        width={700}
        onCancel={handleCancel}
      >
        <div className="add-note">
          <Form size="large" form={form} layout="vertical" name="useForm">
            <Row gutter={[20, 48]}>
              <Col span={12}>
                <Form.Item
                  name="name"
                  label="Name"
                  rules={[
                    { required: true, message: "This input is required" },
                  ]}
                >
                  <Input />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item
                  name="document"
                  label="Document"
                  rules={[
                    { required: true, message: "This input is required" },
                  ]}
                >
                  <Input type="file" onChange={fileUpload} />
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
                    {documentType?.map((item: any, index: number) => {
                      return <Option value={item?.name}> {item?.name}</Option>;
                    })}
                  </Select>
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item
                  name="tags"
                  label="Tags"
                  rules={[
                    { required: true, message: "This input is required" },
                  ]}
                >
                  <Select mode="multiple">
                    {documentTags?.map((item: any, index: number) => {
                      return <Option value={item?.name}> {item?.name}</Option>;
                    })}
                  </Select>
                </Form.Item>
              </Col>
            </Row>
            <Row>
              <Col span={24}>
                <Button
                  style={{
                    margin: "0 8px",
                  }}
                  onClick={() => form.resetFields()}
                >
                  Clear
                </Button>
                <Button type="primary" onClick={() => handleClick()}>
                  Save
                </Button>
              </Col>
            </Row>
          </Form>
        </div>
      </Modal>
    </>
  );
};
