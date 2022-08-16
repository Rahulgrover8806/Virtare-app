import { Button, Checkbox, Col, Row, Timeline } from "antd";
import { useContext, useEffect, useState } from "react";
import { TimelineFlags } from "./timelineFlags";
import "../../Style.css";
import { UpdateFlag } from "./updateFlag";
import { patientTimeline } from "../../../../components/Communication/ListView/listViewApi";
import { LoaderContext } from "../../../../layout/DashBoardLayout";

export const PatientTimeline = ({ id }: any) => {
  const [timeline, setTimeline] = useState<any>();
  const {setLoading} = useContext(LoaderContext);
  const [flag, setFlag] = useState(false)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    (async () => {
      setLoading(true)
     await patientTimeline(id, setTimeline);
      setLoading(false)
    })();
       window.scroll(0,0)
  }, []);

  return (
    <>
      <UpdateFlag visible={visible} setVisible={setVisible} title={"Update Flag"} />
      <Row>
       { flag && <Col span={3} offset={21}>
          <Button type="primary" onClick={()=>setVisible(true)}>
            Clear Flag
          </Button>
        </Col>}
        <Col span={24}>
          <Timeline>
            {timeline &&
              timeline.map((item: any, index: number) => {
                
                return (
                  <Timeline.Item
                    dot={TimelineFlags(item?.type).dot}
                    color={TimelineFlags(item?.type).color}
                    key={index}
                  >
                    <p className="timeline-body">
                      {" "}
                      <span className="timeline-heading">{item?.heading}:</span>
                      <span className="time">{item?.createdAt}</span>
                      {item?.type === "7" && (
                        <span className="timeline-checkbox">
                          <Checkbox onChange={()=>setFlag(true)} />
                        </span>
                      )}
                    </p>
                    <p className='summaryText left' dangerouslySetInnerHTML={{ __html: item?.title }}>
                        </p>
                    
                  </Timeline.Item>
                );
              })}
          </Timeline>
        </Col>
      </Row>

    </>
  );
};
