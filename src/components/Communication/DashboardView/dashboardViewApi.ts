import moment from "moment";
import { API_URLS } from "../../../config/ApiUrls";
import API from "../../../services/Api.Services";

const todayStart = moment(new Date(new Date().setHours(0, 0, 0, 0))).unix();
const todayEnd = moment(new Date(new Date().setHours(23, 59, 59, 999))).unix();
export const communicationType =async (setChartStore: any) => {
 await API.get(
    `${API_URLS.COMMUNICATIONTYPE}?fromDate=${todayStart}&toDate=${todayEnd}`
  )
    .then((response: any) => {
      setChartStore((old: any) => ({
        ...old,
        type: response?.data,
      }));
    })
    .catch((err) => {
      console.log(err);
    });
};
export const communicationPlanned = async(setChartStore: any) => {
 await API.get(`${API_URLS.CALLSTAFF}?fromDate=${todayStart}&toDate=${todayEnd}`)
    .then((response: any) => {
      setChartStore((old: any) => ({
        ...old,
        planned: response?.data,
      }));
    })
    .catch((err) => {
      console.log(err);
    });
};
export const communicationStatus = async(setChartStore: any) => {
 await API.get(`${API_URLS.CALLSTATUS}?fromDate=${todayStart}&toDate=${todayEnd}`)
    .then((response: any) => {
      setChartStore((old: any) => ({
        ...old,
        status: response?.data,
      }));
    })
    .catch((err) => {
      console.log(err);
    });
};
export const dailyCount = async(setChartStore: any) => {
  await API.get(`${API_URLS.COUNT}?fromDate=${todayStart}&toDate=${todayEnd}`)
     .then((response: any) => {
       setChartStore(response.data);
     })
     .catch((err) => {
       console.log(err);
     });
 };
