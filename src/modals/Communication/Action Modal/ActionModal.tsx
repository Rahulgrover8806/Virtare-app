import { Alert, Modal } from "antd";
import { useContext, useEffect, useState } from "react";
import { ActionModalApi } from "../../../components/Communication/ListView/listViewApi";
import { LoaderContext } from "../../../layout/DashBoardLayout";

interface IActionModal {
  title: string;
  visible: boolean;
  setVisible: any;
  callId: any;
}

export const ActionModal = ({
  title,
  visible,
  setVisible,
  callId,
}: IActionModal) => {
  const {setLoading} = useContext(LoaderContext);
  const [modalBody, setModalBody] = useState<any>();
  const handleCancel = () => {
    setVisible(false);
  };
  useEffect(() => {
    (async () => {
      setLoading(true);
      await ActionModalApi(callId, setModalBody);
      setLoading(false);

    })();
  }, []);

  return (
    <>
      <Modal
        width={800}
        visible={visible}
        title={title}
        footer={null}
        centered
        onCancel={handleCancel}
        className="add-note loader-modal-custom"
      >
        {
            modalBody?.length>0?
            "":
            <Alert
            message="No one joined the call."
            style={{fontWeight:"500",fontSize:"16px",marginBottom:"28%"}}
            type="error"
          />
        }
      </Modal>
    </>
  );
};
