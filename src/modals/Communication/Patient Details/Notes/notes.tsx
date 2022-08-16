import { useContext, useEffect, useState } from "react";
import "../../Style.css";
import { Button, Col, Row, Table } from "antd";
import { EyeOutlined } from "@ant-design/icons";
import { AddNoteModal } from "./addNoteModal";
import { NotesDetail } from "./notesDetail";
import { patientNotes } from "../../../../components/Communication/ListView/listViewApi";
import { LoaderContext } from "../../../../layout/DashBoardLayout";

const Notes = ({ id }: any) => {
  const [notes, setNotes] = useState();
  const {setLoading} = useContext(LoaderContext);
  const [addNote, setAddNote] = useState(false);
  const [showNotes, setShowNotes] = useState(false);
  const [notesDetail, setNotesDetail] = useState();
  useEffect(() => {
    (async () => {
      setLoading(true);
      await patientNotes(id, setNotes);
      setLoading(false);
    })();
  }, []);
  const showModal = (e:any,data: any) => {
    setNotesDetail(data);
    setShowNotes(true);
  };
  const columns = [
    {
      title: "Date",
      dataIndex: "duration",
      key: "date",
      width: "20%",
    },
    {
      title: "Priority",
      dataIndex: "flag",
      key: "flag",
      width: "20%",
    },
    {
      title: "Note",
      dataIndex: "note",
      key: "note",
      width: "20%",
    },
    {
      title: "Type",
      dataIndex: "type",
      key: "type",
      width: "20%",
    },
    {
      title: "Detail",
      dataIndex: "detail",
      key: "detail",
      width: "20%",
      render: (item:any,data:any) => (
        <a className="details-icon">
          <EyeOutlined onClick={(e) => showModal(e,data)} />
        </a>  
      ),
    },
  ];

  return (
    <>
      <NotesDetail
        setVisible={setShowNotes}
        visible={showNotes}
        body={notesDetail}
        title="Notes Detail"
        id={id}
      />
      <AddNoteModal
        title="Add Notes"
        visible={addNote}
        setVisible={setAddNote}
      />
      <Row>
        <Col span={2}>
          <Button type="primary" onClick={() => setAddNote(true)}>
            Add Note
          </Button>
        </Col>
      </Row>
      <Row>
        <Col span={24}>
          <Table columns={columns} dataSource={notes} pagination={false} />
        </Col>
      </Row>
    </>
  );
};

export default Notes;
