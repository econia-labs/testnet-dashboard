import { AxiosResponse } from "axios";
import { getRequest } from "./axiosSetup";
import { leaderboardType, metadataType } from "@/types/leaderboard";

const COMP_ID = process.env.NEXT_PUBLIC_COMPETITION_ID;

export const getLeaderboard = async (): Promise<AxiosResponse<leaderboardType[]>> => {
  const rs = await getRequest(`competition_leaderboard_users?competition_id=eq.${COMP_ID}&select=competition_exclusion_list(*)&competition_exclusion_list=not.is.null`);
  return rs;
};

export const getMetaData = async (): Promise<AxiosResponse<metadataType[]>> => {
  const rs = await getRequest(`competition_metadata?id=eq.${COMP_ID}`);
  return rs;
};
