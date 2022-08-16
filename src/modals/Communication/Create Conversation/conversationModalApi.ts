import { API_URLS } from "../../../config/ApiUrls";
import API from "../../../services/Api.Services";

export const ConversationGlobalCodeModal = async (modalBody: any) => {
  await API.get(
    `${API_URLS.CONVERSATIONGLOBALCODE}?orderField=priority&globalCodeCategoryId=7?isActive=1&code=utf-8&search=`
  )
    .then((response: any) => {
      return modalBody((old: any) => ({
        ...old,
        globalCode: response?.data,
      }));
    })
    .catch((err) => {
      console.log(err);
      return err;
    });
};
export const ConversationGlobalCodeMessageModal = async (modalBody: any) => {
  await API.get(
    `${API_URLS.CONVERSATIONGLOBALCODE}?orderField=priority&globalCodeCategoryId=24?isActive=1&code=utf-8&search=`
  )
    .then((response: any) => {
      return modalBody((old: any) => ({
        ...old,
        messageCategory: response?.data,
      }));
    })
    .catch((err) => {
      console.log(err);
      return err;
    });
};
export const ConversationStaffModal = async (modalBody: any) => {
  await API.get(`${API_URLS.CONVERSATIONSTAFF}?isActive=1&code=utf-8&search=`)
    .then((response: any) => {
      return modalBody((old: any) => ({
        ...old,
        staff: response?.data,
      }));
    })
    .catch((err) => {
      console.log(err);
      return err;
    });
};
export const ConversationPatientModal = async (modalBody: any) => {
  await API.get(`${API_URLS.CONVERSATIONPATIENT}?isActive=1&code=utf-8&search=`)
    .then((response: any) => {
      return modalBody((old: any) => ({
        ...old,
        patient: response?.data,
      }));
    })
    .catch((err) => {
      console.log(err);
      return err;
    });
};
export const AddNoteCategoryGlobalCode = async (modalBody: any) => {
  await API.get(
    `${API_URLS.CONVERSATIONGLOBALCODE}?orderField=priority&globalCodeCategoryId=49?isActive=1&code=utf-8&search=`
  )
    .then((response: any) => {
      return modalBody(response?.data);
    })
    .catch((err) => {
      console.log(err);
      return err;
    });
};
export const AddNoteTypeGlobalCode = async (modalBody: any) => {
  await API.get(
    `${API_URLS.CONVERSATIONGLOBALCODE}?orderField=priority&globalCodeCategoryId=35?isActive=1&code=utf-8&search=`
  )
    .then((response: any) => {
      return modalBody(response?.data);
    })
    .catch((err) => {
      console.log(err);
      return err;
    });
};
export const GlobalCode = async (id: any, modalBody: any) => {
  await API.get(
    `${API_URLS.CONVERSATIONGLOBALCODE}?orderField=priority&globalCodeCategoryId=${id}?isActive=1&code=utf-8&search=`
  )
    .then((response: any) => {
      return modalBody(response?.data);
    })
    .catch((err) => {
      console.log(err);
      return err;
    });
};
export const DocumentFileUploader = async (payload: any) => {
  await API.post(API_URLS.FILE, payload)
    .then((response: any) => {
      return response.data;
    })
    .catch((err) => {
      console.log(err);
      return err;
    });
};
export const staffDetails = async ( modalBody: any) => {
  await API.get(
    `${API_URLS.CARECOORDINATORDETAILS}?isActive=1&code=utf-8&search=`
  )
    .then((response: any) => {
      return modalBody(response?.data);
    })
    .catch((err) => {
      console.log(err);
      return err;
    });
};
export const AppoinmentTimeZone = async (modalBody: any) => {
  await API.get(
    `${API_URLS.TIMEZONE}?isActive=1&code=utf-8&search=`
  )
    .then((response: any) => {
      return modalBody(response?.data);
    })
    .catch((err) => {
      console.log(err);
      return err;
    });
};


