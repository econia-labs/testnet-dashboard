import { AxiosResponse } from "axios";
import { getRequest } from "./axiosSetup";
import { leaderboardType, metadataType } from "@/types/leaderboard";

export const getLeaderboard = async (): Promise<AxiosResponse<leaderboardType[]>> => {
  const rs = await getRequest("competition_leaderboard_users");
  return rs;
};

export const getMetaData = async (): Promise<AxiosResponse<metadataType[]>> => {
  const rs = await getRequest("competition_metadata");
  return rs;
};
