/* eslint-disable import/prefer-default-export */
import axios from 'axios';

export const getData = url => {
  axios.get(url).then(
    res => {
      return res.data;
    },
    err => {
      console.log(err);
    },
  );
};

export const asyncGetData = async url => {
  try {
    const response = await axios.get(url);
    return response.data;
  } catch (error) {
    console.log(error);
  }
};
