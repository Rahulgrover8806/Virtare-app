import { Col, Modal, Row } from "antd";
import { useContext } from "react";
import { useEffect, useState } from "react";
import * as Time from "../../../../util/Time"
import { CommunicationContext } from "../../../../components/Communication/ListView";
import { careCoordinator } from "../../../../components/Communication/ListView/listViewApi";
import CareCoordinatorDetails from "../../modalList";
import { LoaderContext } from "../../../../layout/DashBoardLayout";

interface INotesDetail {
  title: string;
  visible: boolean;
  setVisible: any;
  body: any;
  id: any;
}
export const NotesDetail = ({
  title = "",
  visible = false,
  setVisible = () => {},
  body = {},
  id = "",
}: INotesDetail) => {
  const coOrdinatorFrom = useContext(CommunicationContext);
  const coOrdinatorFromId = coOrdinatorFrom?.fromId;

  const [careCoordinatorData, setCareCoordinatorData] = useState();
  const {setLoading} = useContext(LoaderContext);
  const [showDetails, setShowDetails] = useState(false);

  const handleCancel = () => {
    setVisible(false);
  };

  const handleChange = () => {
    setShowDetails(true);
  };

  useEffect(() => {
    (async () => {
      setLoading(true);
      await careCoordinator(coOrdinatorFromId, setCareCoordinatorData);
      setLoading(false);
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      {showDetails && careCoordinatorData && (
        <CareCoordinatorDetails
          id={id}
          title="Care Coordinator Details"
          setVisible={setShowDetails}
          visible={showDetails}
          body={careCoordinatorData}
        />
      )}
      <Modal
        title={title}
        visible={visible}
        footer={null}
        width={470}
        onCancel={handleCancel}
      >
        <div className="notes-detail">
          <Row>
            <Col span={5}>
              <span>Added By</span>
            </Col>
            <Col span={7} offset={12}>
              <a onClick={handleChange}>{body?.addedBy}</a>
            </Col>
          </Row>
          <Row>
            <Col span={5}>
              <span>Date Time</span>
            </Col>
            <Col span={7} offset={12}>
              <span>{Time.format(body?.date)}</span>
            </Col>
          </Row>
          <Row>
            <Col span={5}>
              <span>Category</span>
            </Col>
            <Col span={7} offset={12}>
              <span>{body?.category}</span>
            </Col>
          </Row>
          <Row>
            <Col span={5}>
              <span>Type</span>
            </Col>
            <Col span={7} offset={12}>
              <span className="note-data">{body?.type}</span>
            </Col>
          </Row>
          <Row>
            <Col span={5}>
              <span>Priority</span>
            </Col>
            <Col span={7} offset={12}>
              <span>{body?.flag}</span>
            </Col>
          </Row>
          <Row>
            <Col span={5}>
              <span>Note</span>
            </Col>
            <Col span={7} offset={12}>
              <span>{body?.note}</span>
            </Col>
          </Row>
        </div>
      </Modal>
    </>
  );
};
