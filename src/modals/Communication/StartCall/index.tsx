import { Modal, Tabs } from 'antd';
import { WaitingRoomCard } from '../../../components/Communication/DashboardView/DasboardCharts/waitingRoomCard';
import { NewCall } from './newCall';

const { TabPane } = Tabs;
interface IStartCallModal{
    visible:boolean;
    setVisible:any;
    title:string;
}
export const  StartCallModal=({visible,setVisible,title}:IStartCallModal)=>{
    const handleCancel = () => {
        setVisible(false);
      };
    return(
        <>
      <Modal
      width={1000}
      visible={visible}
      title={title}
      footer={null}
      onCancel={handleCancel}
      className="add-note"
    >
 <Tabs defaultActiveKey="scheduledCall" size="large">
    <TabPane tab="Scheduled Call" key="scheduledCall">
     <WaitingRoomCard/> 
    </TabPane>
  
    <TabPane tab="New Call" key="newCall">
     <NewCall/> 
    </TabPane>
  </Tabs>
  </Modal>
        </>
    )
}
