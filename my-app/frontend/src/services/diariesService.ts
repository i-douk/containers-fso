import axios, { AxiosError } from 'axios';
import { Diary, NewDiaryEntry} from "../types";

const baseUrl = 'http://localhost:3000/api/diaries'

export const getAllDiaries = async () => {
  const response = await axios.get<Diary[]>(baseUrl);
    return response.data;
}

export const createDiaryEntry = async (object: NewDiaryEntry) : Promise<Diary | AxiosError | undefined> => {
  try {
    const response  = await axios.post<Diary>(baseUrl, object);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.log(error.status);
      console.error(error.response);
      return error}
  }
};
