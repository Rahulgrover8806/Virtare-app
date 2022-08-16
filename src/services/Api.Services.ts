import Axios from "axios";
import { notification } from "antd";
const API = Axios.create({ baseURL: "https://dev.icc-health.com/dev/" });
API.interceptors.request.use(
  (conf: any) => {
    conf.headers = {
      Authorization: `Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwczpcL1wvZGV2LmljYy1oZWFsdGguY29tXC9kZXZcL2xvZ2luIiwiaWF0IjoxNjYwNjQxMzUzLCJleHAiOjE2NjA2NDg1NTMsIm5iZiI6MTY2MDY0MTM1MywianRpIjoibnhxN1YwQW12VnF6STI4RyIsInN1YiI6MSwicHJ2IjoiYjkxMjc5OTc4ZjExYWE3YmM1NjcwNDg3ZmZmMDFlMjI4MjUzZmU0OCJ9.1atGf3pvNYBLJ47HmK6mZMgJYiqgP8yQm3XyB8iKEYM`,
    };
    return conf;
  },
  (error: any) => {
    return Promise.reject(error);
  }
);
API.interceptors.response.use(
  (next: { data: any }) => {
    return Promise.resolve(next.data);
  },
  (error: { message: any }) => {
    notification.open({
      message: "Error",
      description: error.message,
    });

    return Promise.reject(error);
  }
);
export default API;
