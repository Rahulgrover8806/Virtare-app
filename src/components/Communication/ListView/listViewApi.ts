import moment from "moment";
import { API_URLS } from "../../../config/ApiUrls";
import API from "../../../services/Api.Services";
import { format } from "../../../util/Time";

export const careCoordinator = async (payload: any, modalBody: any) => {
  await API.get(`${API_URLS.CARECOORDINATORDETAILS}/${payload}`)
    .then((response: any) => {
      return modalBody(response?.data);
    })
    .catch((err) => {
      console.log(err);
      return err;
    });
};
export const patientCoordinator = async (payload: any, modalBody: any) => {
  await API.get(`${API_URLS.PATIENTDETAILS}/${payload}`)
    .then((response: any) => {
      return modalBody(response?.data);
    })
    .catch((err) => {
      console.log(err);
      return err;
    });
};
interface ICommunicationList {
  search?: string;
  modalBody: any;
  pagination: any;
}
export const CommunicationList = async ({
  search,
  modalBody,
  pagination,
}: ICommunicationList) => {
  await API.get(
    `${API_URLS.COMMUNICATION}?active=1&search=${search}&orderField=&orderBy=&filter=&fromDate=&toDate=
    `
  ).then((response: any) => {
    const data = response.data?.map((item: any) => {
      return {
        ...item,
        duration: moment.unix(item?.createdAt).format("MMM d,YYYY,h:mmA"),
        key: Math.random() * 10,
      };
    });
    modalBody(data);
    pagination(response?.meta);
  });
};
export const patientTimeline = async (payload: any, modalBody: any) => {
  await API.get(`${API_URLS.PATIENTDETAILS}/${payload}/timeLine?type=`)
    .then((response: any) => {
      const data = response.data?.map((item: any) => {
        return {
          ...item,
          createdAt: moment.unix(item?.createdAt).format("MMM d,YYYY,h:mmA"),
        };
      });
      modalBody(data);
    })
    .catch((err) => {
      console.log(err);
      return err;
    });
};
export const ActionModalApi = async (payload: any, modalBody: any) => {
  await API.get(`${API_URLS.COMMUNICATION}/${payload}/${API_URLS.CALL}`).then(
    (response: any) => {
      modalBody(response.data);
    }
  );
};

export const patientNotes = async (payload: any, modalBody: any) => {
  await API.get(`${API_URLS.PATIENTDETAILS}/${payload}/notes`)
    .then((response: any) => {
      const data = response.data?.map((item: any) => {
        return {
          ...item,
          duration: moment.unix(item?.date).format("MMM d,YYYY,h:mmA"),
        };
      });
      modalBody(data);
    })
    .catch((err) => {
      console.log(err);
      return err;
    });
};
export const patientDocument = async (payload: any, modalBody: any) => {
  await API.get(`${API_URLS.PATIENTDETAILS}/${payload}/document`)
    .then((response: any) => {
      const data = response.data?.map((item: any) => {
        return {
          ...item,
          date: moment.unix(item?.date).format("MMM d,YYYY"),
        };
      });
      modalBody(data);
    })
    .catch((err) => {
      console.log(err);
      return err;
    });
};
export const patientAppoinment = async (payload: any, modalBody: any) => {
  await API.get(`${API_URLS.PATIENTDETAILS}/${payload}/appointment?all=all`)
    .then((response: any) => {
      const data = response.data?.map((item: any) => {
        return {
          ...item,
          date: moment.unix(item?.date).format("MMM d,YYYY,"),
        };
      });
      modalBody(data);
    })
    .catch((err) => {
      console.log(err);
      return err;
    });
};
export const criticalNotes = async (payload: any, modalBody: any) => {
  await API.get(`${API_URLS.CONVERSATIONPATIENT}/${payload}/criticalNote`)
    .then((response: any) => {
      modalBody(response.data);
    })
    .catch((err) => {
      console.log(err);
      return err;
    });
};
export const AddCriticalNotes = async (id: any, payload: any) => {
  await API.post(`${API_URLS.CONVERSATIONPATIENT}/${id}/criticalNote`, payload)
    .then((response: any) => {
      console.log(response);
    })
    .catch((err) => {
      console.log(err);
      return err;
    });
};
export const WaitingRoomList = async (modalBody: any) => {
  await API.get(`${API_URLS.CONFERENCE}`)
    .then((response: any) => {
      response?.data.map((item: any) => {
        const data = response.data?.map((item: any) => {
          return {
            ...item,
            date: format(item.date,"h:mmA"),
          };
        });
        modalBody(data)
      });
    })
    .catch((err) => {
      console.log(err);
      return err;
    });
};
