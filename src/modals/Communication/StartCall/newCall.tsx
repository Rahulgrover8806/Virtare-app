import { Button, Col, Form, Row, Select } from "antd"
import "../Style.css"
const { Option } = Select;

export const NewCall=()=>{
    const [form]=Form.useForm()
    const onFinish=()=>{
        
    }
  const  onChange=()=>{

    }  
      return(
     <>
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
                  <Select
          onChange={onChange}
        >
          <Option value="male"> </Option>
          <Option value="female"> </Option>
        </Select>
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
                marginTop:"19px"
              }}
            >
              <Button type="primary" htmlType="submit">
                Start Call
              </Button>
            </Col>
          </Row>
        </Form.Item>
      </div>
        </Form>
     </>   
    )
}