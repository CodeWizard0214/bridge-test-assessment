import axios, { AxiosRequestConfig } from "axios";
import { API_RESP_STATUS } from "../config/enum";

export const API_URL = "https://free-nba.p.rapidapi.com/";

export const API = axios.create({
  baseURL: API_URL,
  headers: {
    "X-RapidAPI-Host": "free-nba.p.rapidapi.com",
    "X-RapidAPI-Key": "f50a47a7ddmsh482e257a603d514p106077jsn56e5e9623fd3",
  },
});

export const getTeams = async (currentPage: number, per_page: number) => {
  const options = {
    url: "/teams",
    params: { page: currentPage, per_page: per_page },
  };
  try {
    const response = await API.request(options);
    return {
      status:
        response.status === 200
          ? API_RESP_STATUS.SUCCESS
          : API_RESP_STATUS.FAIL,
      data: response.data,
    };
  } catch (error) {
    console.error(error);
  }
};

export const getPlayers = async (
  currentPage: number,
  per_page: number,
  search: string
) => {
  const options = {
    url: "/players",
    params: { page: currentPage, per_page: per_page, search: search },
  };
  try {
    const response = await API.request(options);
    return {
      status:
        response.status === 200
          ? API_RESP_STATUS.SUCCESS
          : API_RESP_STATUS.FAIL,
      data: response.data,
    };
  } catch (error) {
    console.error(error);
  }
};

export const getPlayerDetail = async (id: number) => {
  const options = {
    url: "/players/" + id,
  };
  try {
    const response = await API.request(options);
    return {
      status:
        response.status === 200
          ? API_RESP_STATUS.SUCCESS
          : API_RESP_STATUS.FAIL,
      data: response.data,
    };
  } catch (error) {
    console.error(error);
  }
};

export const getAllGames = async (
  currentPage: number,
  per_page: number,
  team_ids: string,
  date?: string,
  Seasons?: string
) => {
  const options = {
    url: "/games",
    params: {
      page: currentPage,
      per_page: per_page,
      team_ids: team_ids,
      date: date,
      Seasons: Seasons,
    },
  };
  try {
    const response = await API.request(options);
    return {
      status:
        response.status === 200
          ? API_RESP_STATUS.SUCCESS
          : API_RESP_STATUS.FAIL,
      data: response.data,
    };
  } catch (error) {
    console.error(error);
  }
};

export const getGameDetail = async (id: string) => {
  const options = {
    url: "/games/" + id,
  };
  try {
    const response = await API.request(options);
    return response.data;
  } catch (error) {
    console.error(error);
  }
};
