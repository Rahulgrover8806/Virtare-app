import { LoadingOutlined } from "@ant-design/icons";
import { Spin } from "antd";
import './Style.css';

interface iLoader {
  loading: boolean;
}
export default function Loader({ loading }: iLoader) {
     
  const antIcon = (
    <div className="loader">
    <LoadingOutlined
      style={{
        fontSize: 60,
      }}
      spin
    />
    </div>
  );
  return <>{loading && <Spin indicator={antIcon} />}</>;
}
