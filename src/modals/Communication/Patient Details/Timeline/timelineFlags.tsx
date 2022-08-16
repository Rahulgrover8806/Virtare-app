import {
  MessageOutlined,
  ClockCircleOutlined,
  FlagOutlined,
  FolderOpenOutlined,
  FileTextOutlined,
  PushpinOutlined,
  FilePdfOutlined,
  HeatMapOutlined,
  BellOutlined,
} from "@ant-design/icons";

export const TimelineFlags = (type: string) => {
  let obj: any = {
    dot: "",
    color: "",
  };
  switch (type) {
    case "1": {
      obj.dot = <BellOutlined />;
      obj.color = "#f1f439";
      break;
    }
    case "2": {
      obj.dot = <ClockCircleOutlined />;
      obj.color = "#f2811f";
      break;
    }
    case "3": {
      obj.dot = <HeatMapOutlined />;
      obj.color = "#880808";
      break;
    }
    case "4": {
      obj.dot = <FolderOpenOutlined />;
      obj.color = "#1890ff";
      break;
    }
    case "5": {
      obj.dot = <FilePdfOutlined />;
      obj.color = "#3c9b8e";
      break;
    }
    case "6": {
      obj.dot = <FileTextOutlined />;
      obj.color = "#1890ff";
      break;
    }
    case "7": {
      obj.dot = <FlagOutlined />;
      obj.color = "red";
      break;
    }
    case "8": {
      obj.dot = <PushpinOutlined />;
      obj.color = "green";
      break;
    }
    case "9": {
      obj.dot =<MessageOutlined />;
      obj.color = "#3646ac";
      break;
    }
    case  "10": {
      obj.dot = <FolderOpenOutlined />;
      obj.color = "green";
      break;
    }
    default: {
      obj.color = "";
      obj.dot = "";
    }
  }

  return obj;
};
