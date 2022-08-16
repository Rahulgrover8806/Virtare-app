import {
  JSXElementConstructor,
  ReactElement,
  ReactFragment,
  ReactPortal,
  useEffect,
  useState,
  createContext,
  useContext,
} from "react";
import {
  Table,
  Button,
  Col,
  Row,
  Space,
  Avatar,
  Typography,
  Tooltip,
  Input,
  Alert,
} from "antd";
import { CSVLink } from "react-csv";
import {
  careCoordinator,
  patientCoordinator,
  CommunicationList,
} from "./listViewApi";
import "./Style.css";
import {
  MessageOutlined,
  PhoneOutlined,
  EyeOutlined,
  MessageTwoTone,
  MailOutlined,
  CommentOutlined,
  InfoCircleOutlined,
  SearchOutlined,
} from "@ant-design/icons";
import CareCoordinatorDetails, { PatientCoordinatorDetails } from "../../../modals/Communication/modalList";
import { ActionModal } from "../../../modals/Communication/Action Modal/ActionModal";
import { LoaderContext } from "../../../layout/DashBoardLayout";
interface ICommunicationContext {
  fromId: any;
}

export const CommunicationContext = createContext<ICommunicationContext>({
  fromId: "",
});

const ListView = () => {
  // const scroll = { y: 300 };
  const [listData, setListData] = useState([]);
  const {setLoading} = useContext(LoaderContext);
  const [pages, setPages] = useState<any>();
  const [viewActionModal, setViewActionModal] = useState(false);
  const [ids, setIds] = useState({
    patient: "",
    careCoordinator: "",
  });

  const { Link } = Typography;
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [senderModal, setSenderModal] = useState(false);
  const [recieverModal, setRecieverModal] = useState(false);
  const [dataStore, setDataStore] = useState<any>();
  const [careDetailmodalData, setCareDetailModalData] = useState();
  const [patientDetailmodalData, setPatientDetailModalData] = useState();
  const [callID, setCallID] = useState();
  useEffect(() => {
    (async () => {
      setLoading(true);
      await CommunicationList({
        search: "",
        modalBody: setListData,
        pagination: setPages,
      });
      setLoading(false);
    })();
  }, []);

  const handleShow = (record: any) => {
    setCallID(record?.id);
    setViewActionModal(true);
  };
  const CareCoordinatorDetailsModal = async (e: any, data: any) => {
    if (data?.is_sender_patient) {
      setLoading(true);
      await patientCoordinator(data?.fromId, setPatientDetailModalData);
      setIds((old: any) => ({
        ...old,
        patient: data?.fromId,
      }));
      setRecieverModal(true);
      setDataStore(data);
      setLoading(false);
    }
    if (!data?.is_sender_patient) {
      setLoading(true);
      await careCoordinator(data?.fromId, setCareDetailModalData);
      setIds((old: any) => ({
        ...old,
        careCoordinator: data?.fromId,
      }));
      setDataStore(data);

      setSenderModal(true);
      setLoading(false);
    }
  };
  const handleSearch = async (e: any) => {
    const value = e.target.value;
    setLoading(true);
    await CommunicationList({
      search: value,
      modalBody: setListData,
      pagination: setPages,
    });
    setLoading(false);
  };
  const handleChange = async (e: any, data: any) => {
    if (data?.is_receiver_patient) {
      setLoading(true);
      await patientCoordinator(data?.toId, setPatientDetailModalData);
      setIds((old: any) => ({
        ...old,
        patient: data?.toId,
      }));
      setDataStore(data);

      setRecieverModal(true);
      setLoading(false);
    }
    if (!data?.is_receiver_patient) {
      setLoading(true);
      await careCoordinator(data?.toId, setCareDetailModalData);
      setIds((old: any) => ({
        ...old,
        careCoordinator: data?.toId,
      }));
      setDataStore(data);

      setSenderModal(true);
      setLoading(false);
    }
  };

  const columns = [
    {
      title: "From",
      dataIndex: "from",
      key: "from",
      sorter: {
        compare: (a: any, b: any) => {
          if (a.from < b.from) return -1;
          if (b.from < a.from) return 1;
          return 0;
        },
      },
      render: (from: any, item: any) => (
        <>
          <Space
            size="middle"
            onClick={(e: any) => CareCoordinatorDetailsModal(e, item)}
            style={
              item?.is_sender_patient === true
                ? { backgroundColor: "rgb(255 250 96)", padding: "5px" }
                : { backgroundColor: "", padding: "5px" }
            }
          >
            <Link>
              {from}{" "}
              <span className="list-modal">{<InfoCircleOutlined />} </span>
            </Link>
          </Space>
        </>
      ),
    },
    {
      title: "To",
      dataIndex: "to",
      key: "to",
      sorter: {
        compare: (a: any, b: any) => {
          if (a.to < b.to) return -1;
          if (b.to < a.to) return 1;
          return 0;
        },
      },
      render: (to: any, data: any) => (
        <>
          <Space
            size="middle"
            onClick={(e: any) => handleChange(e, data)}
            style={
              data?.is_receiver_patient === true
                ? { backgroundColor: "rgb(255 250 96)", padding: "5px" }
                : { backgroundColor: "", padding: "5px" }
            }
          >
            <Link>
              {to} <span className="list-modal">{<InfoCircleOutlined />} </span>
            </Link>
          </Space>
        </>
      ),
    },
    {
      title: " Type",
      dataIndex: "type",
      key: "type",
      render: (_: any, { type }: any) => (
        <>
          <Tooltip
            placement="topLeft"
            title={
              type === "App Call"
                ? "App Call"
                : type === "Email"
                ? "Email"
                : type === "App Message"
                ? "App Message"
                : "SMS"
            }
          >
            <Space size="large" className="svg-icon">
              {type === "App Call" && <PhoneOutlined />}
              {type === "Email" && <MailOutlined />}
              {type === "App Message" && <CommentOutlined />}
              {type === "SMS" && <MessageTwoTone />}
            </Space>
          </Tooltip>
        </>
      ),
    },
    {
      title: "Priority",
      dataIndex: "priority",
      key: "priority",
      render: (_: any, { priority }: any) => (
        <>
          <Tooltip
            placement="right"
            title={
              priority === "Normal"
                ? "Normal"
                : priority === "Urgent"
                ? "Urgent"
                : "Medium"
            }
          >
            <Avatar
              style={{
                backgroundColor:
                  priority === "Normal"
                    ? "rgb(0,128,0)"
                    : priority === "Urgent"
                    ? "rgb(255, 96, 97)"
                    : "rgb(255, 168, 0)",

                verticalAlign: "middle",
              }}
              size="large"
            ></Avatar>
          </Tooltip>
        </>
      ),
    },

    {
      title: "Category",
      dataIndex: "category",
      key: "category",

      sorter: {
        compare: (a: any, b: any) => {
          if (a.category < b.category) return -1;
          if (b.category < a.category) return 1;
          return 0;
        },
      },
    },
    {
      title: "Last Update",
      dataIndex: "duration",
      sorter: {
        compare: (a: any, b: any) => {
          if (a.duration < b.duration) return -1;
          if (b.duration < a.duration) return 1;
          return 0;
        },
      },
    },
    {
      title: "Action",
      dataIndex: "action",
      key: "action",
      render: (
        _: any,
        record: {
          type: string;
          name:
            | string
            | number
            | boolean
            | ReactElement<any, string | JSXElementConstructor<any>>
            | ReactFragment
            | ReactPortal
            | null
            | undefined;
        }
      ) => (
        <Tooltip placement="bottom" title={"Reply"}>
          <Space size="middle" className="svg-icon">
            <Link onClick={() => handleShow(record)}>
              {" "}
              {record?.type === "App Call" ? (
                <EyeOutlined />
              ) : (
                <MessageOutlined />
              )}
            </Link>
          </Space>
        </Tooltip>
      ),
    },
  ];

  return (
    <>
      <CommunicationContext.Provider
        value={{
          fromId: dataStore?.fromId,
        }}
      >
        {viewActionModal && (
          <ActionModal
            title={"Call Details"}
            visible={viewActionModal}
            setVisible={setViewActionModal}
            callId={callID}
          />
        )}

        <CareCoordinatorDetails
          id={ids.careCoordinator}
          title="Care Coordinator Details"
          setVisible={setSenderModal}
          visible={senderModal}
          body={careDetailmodalData}
        />
        {recieverModal && (
          <PatientCoordinatorDetails
            id={ids.patient}
            title="Patient Details"
            setVisible={setRecieverModal}
            visible={recieverModal}
            body={patientDetailmodalData}
          />
        )}
        <div className="index-serch-header">
          <Row>
            <Col span={12}>
              <span className="excel-export">
                <Input
                  size="large"
                  onChange={handleSearch}
                  placeholder="Search..."
                  suffix={<SearchOutlined />}
                />
              </span>
            </Col>
            <Col span={4} offset={8}>
              <span className="excel-export">
                <Button className="export-button">
                  <CSVLink filename="data.csv" data={listData}>
                    Export to Excel
                  </CSVLink>
                </Button>
              </span>
            </Col>
          </Row>
        </div>
        <Row>
          <Col span={24}>
            <Alert
              message="Patients are highlighted"
              style={{
                fontWeight: "500",
                fontSize: "16px",
                marginBottom: "22px",
                marginTop: "8px",
              }}
              type="error"
            />
          </Col>
        </Row>

        <Table
          id="table"
          size={"large"}
          columns={columns}
          className="communication-table"
          scroll={{
            y: 500,
          }}
          showSorterTooltip={false}
          dataSource={listData}
          pagination={false}
          expandable={{
            expandedRowRender: () => (
              <p
                style={{
                  margin: 0,
                }}
              ></p>
            ),
          }}
        />
      </CommunicationContext.Provider>
    </>
  );
};

export default ListView;
