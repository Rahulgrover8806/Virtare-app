import { Button, Col, Row, Table, Typography } from "antd";
import { useContext, useEffect, useState } from "react";
import { FileTwoTone } from "@ant-design/icons";
import { AddDocument } from "./addDocument";
import { patientDocument } from "../../../../components/Communication/ListView/listViewApi";
import { LoaderContext } from "../../../../layout/DashBoardLayout";

const Document = ({ id }: any) => {
  const {setLoading} = useContext(LoaderContext);
  const [document, setDocument] = useState();
  const [visible, setVisible] = useState(false)
  const { Text, Link } = Typography;

  useEffect(() => {
    (async () => {
      setLoading(true);
      await patientDocument(id, setDocument);
      setLoading(false);
    })();
  }, []);
  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      width: "20%",
      sorter: {
        compare: (a: any, b: any) => {
          if (a.name < b.name) return -1;
          if (b.name < a.name) return 1;
          return 0;
        },
      },
    },
    {
      title: "Document",
      dataIndex: "document",
      key: "document",
      width: "20%",
      
       render: (path:any) => (
        <Link href={path}>
          <FileTwoTone onClick={() => {}} />
        </Link>
      ),
    },
    {
      title: "Type",
      dataIndex: "type",
      key: "type",
      width: "20%",
      sorter: {
        compare: (a: any, b: any) => {
          if (a.type < b.type) return -1;
          if (b.type < a.type) return 1;
          return 0;
        },
      },
    },
    {
      title: "Tags",
      dataIndex: "tags",
      key: "tags",
      width: "40%",
      render: (tags: any) => (
        <>
      {tags.data?.map((item:any)=>{
        return <Text>
          {item?.tag}
        </Text>
      })}
        </>
      ),
    },
  ];
  return (
    <>
      <AddDocument visible={visible} setVisible={setVisible} title="Add Document"/>
      <Row>
        <Col span={2}>
          <Button type="primary" onClick={() =>setVisible(true)}>
            Add Document
          </Button>
        </Col>
      </Row>
      <Row>
        <Col span={24}>
          <Table columns={columns} dataSource={document} pagination={false} />
        </Col>
      </Row>
    </>
  );
};

export default Document;
