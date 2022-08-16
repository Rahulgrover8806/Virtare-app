import {
  Button,
  Col,
  DatePicker,
  DatePickerProps,
  Form,
  Input,
  Modal,
  Row,
  Select,
  TimePicker,
} from "antd";
import TextArea from "antd/lib/input/TextArea";
import { useContext, useEffect, useState } from "react";
import { LoaderContext } from "../../../../layout/DashBoardLayout";
import { AppoinmentTimeZone, GlobalCode, staffDetails } from "../../Create Conversation/conversationModalApi";
import "../../Style.css";
interface IAddAppoinment {
  title: string;
  visible: boolean;
  setVisible: any;
  name: string;
}

export const AddAppoinment = ({
  title,
  visible,
  setVisible,
  name,
}: IAddAppoinment) => {
  const {setLoading} = useContext(LoaderContext);
  const [durationTime, setDurationTime] = useState<any>();
  const [typeOfVisit, setTypeOfVisit] = useState<any>();
  const [careCoordinator, setcareCoordinator] = useState<any>();
  const [timeZone, setTimeZone] = useState<any>();
  useEffect(() => {
    (async () => {
      setLoading(true);
      await GlobalCode(31, setDurationTime);
      await GlobalCode(1, setTypeOfVisit);
      await staffDetails(setcareCoordinator);
      await AppoinmentTimeZone(setTimeZone);
      setLoading(false);
    })();
    form.setFieldsValue({
      patient: name,
    });
  }, []);

  const handleCancel = () => {
    setVisible(false);
  };
  const [form] = Form.useForm();
  const { Option } = Select;
  const onChange: DatePickerProps["onChange"] = (date, dateString) => {
    console.log(date, dateString);
  };
  const timeStore=(value:any)=>{
    console.log(value)
  }

  return (
    <div>
      <Modal
        width={1000}
        visible={visible}
        title={title}
        footer={null}
        onCancel={handleCancel}
        className="add-note"
      >
        <div>
          <Form size="large" form={form} layout="vertical" name="userForm">
            <Row gutter={[20, 48]}>
              <Col span={12}>
                <Form.Item
                  name="patient"
                  label="Patient"
                  rules={[
                    {
                      required: true,
                      message: "This input is required",
                    },
                  ]}
                >
                  <Input disabled />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item
                  name="care-coordinator"
                  label="Care Coordinator"
                  rules={[
                    {
                      required: true,
                      message: "This input is required",
                    },
                  ]}
                >
                  <Select>
                    {careCoordinator?.map((item: any, index: number) => {
                      return (
                        <Option value={item?.fullName}>{item?.fullName}</Option>
                      );
                    })}
                  </Select>
                </Form.Item>
              </Col>
            </Row>
            <Row gutter={[20, 48]}>
              <Col span={12}>
                <Form.Item
                  name="start date"
                  label="Start Date"
                  rules={[
                    {
                      required: true,
                      message: "This input is required",
                    },
                  ]}
                >
                  <DatePicker onChange={timeStore} style={{ width: "100%" }} />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item
                  name="start time"
                  label="Start Time"
                  rules={[
                    {
                      required: true,
                      message: "This input is required",
                    },
                  ]}
                >
                  <TimePicker onChange={onChange} style={{width:"100%"}} />
                </Form.Item>
              </Col>
            </Row>
            <Row gutter={[20, 48]}>
              <Col span={12}>
                <Form.Item
                  name="duration Time"
                  label="Duration time"
                  rules={[
                    {
                      required: true,
                      message: "This input is required",
                    },
                  ]}
                >
                  <Select>
                    {durationTime?.map((item: any, index: number) => {
                      return <Option value={item?.name}>{item?.name}</Option>;
                    })}
                  </Select>
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item
                  name="time zone"
                  label="Time Zone"
                  rules={[
                    {
                      required: true,
                      message: "This input is required",
                    },
                  ]}
                >
                  {" "}
                  <Select>
                    {timeZone?.map((item: any, index: number) => {
                      return <Option value={item?.abbr}>{item?.abbr}</Option>;
                    })}
                  </Select>
                </Form.Item>
              </Col>
            </Row>
            <Row gutter={[20, 48]}>
              <Col span={12}>
                <Form.Item
                  name="type of visit "
                  label="Type of Visit"
                  rules={[
                    {
                      required: true,
                      message: "This input is required",
                    },
                  ]}
                >
                  <Select>
                    {typeOfVisit?.map((item: any, index: number) => {
                      return <Option value={item?.name}>{item?.name}</Option>;
                    })}
                  </Select>
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item
                  name="priority "
                  label="Priority"
                  rules={[
                    {
                      required: true,
                      message: "This input is required",
                    },
                  ]}
                >
                  <Select>
                    <Option value="Low" key="Low">
                      Low
                    </Option>
                    <Option value="Normal" key="Normal">
                      Normal
                    </Option>
                    <Option value="High" key="High">
                      High
                    </Option>
                    <Option value="Other" key="Other">
                      Other
                    </Option>
                  </Select>
                </Form.Item>
              </Col>
            </Row>
            <Row gutter={[20, 48]}>
              <Col span={24}>
                <Form.Item
                  name="note"
                  label="Note"
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
        </div>
      </Modal>
    </div>
  );
};
