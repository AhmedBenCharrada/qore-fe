import axios from "axios";
import { Person } from "../types";
import { BaseURL } from "../constants";

const getPersons = async (page: number, limit: number): Promise<Person[]> => {
  const res = await axios.get<{ content: Person[] }>(
    `${BaseURL}/person?page=${page}&limit=${limit}`,
  );

  return res.data.content;
};

export default getPersons;
