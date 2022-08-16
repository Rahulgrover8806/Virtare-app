import Axios from 'axios';
import { notification } from 'antd';
const API = Axios.create({ baseURL: "https://dev.icc-health.com/dev/" })
API.interceptors.request.use((conf: any) => {
  // you can add some information before send it.
  
  // let token=localStorage.getItem('token');
  conf.headers["Authorization"] = "Bearer " + localStorage.getItem('token');
  return conf;
},
  (error) => {
    return Promise.reject(error);
  }
);
API.interceptors.response.use((next) => {
  return Promise.resolve(next.data);
},
  (error) => {
    // You can handle error here and trigger warning message without get in the code inside
    //   store.dispatch({ 
    //     type: env.actionsTypes.openModal,
    //     message: error.message,
    //   });
    notification.open({
        message: 'Error',
        description:error.message,
      });

    return Promise.reject(error);
  }
);
export default API; 

function token(token: any) {
  throw new Error('Function not implemented.');
}
