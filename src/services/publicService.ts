import axios from "axios";

export const getStudiesOptions = () => {
  return axios.get(
    `${process.env.REACT_APP_API_URL}api/v1/public/getStudiesOption`
  );
};
