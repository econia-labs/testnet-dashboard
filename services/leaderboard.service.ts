import { AxiosResponse } from "axios";
import { getRequest } from "./axiosSetup";
import { leaderboardType, metadataType } from "@/types/leaderboard";

const COMP_ID = process.env.NEXT_PUBLIC_COMPETITION_ID;
const LEADERBOARD_MAX_ROWS = process.env.NEXT_PUBLIC_LEADERBOARD_MAX_ROWS;

export const getLeaderboard = async (): Promise<AxiosResponse<leaderboardType[]>> => {
  const rs = await getRequest(`competition_leaderboard_users?limit=${LEADERBOARD_MAX_ROWS}`);
  return rs;
};

export const getEligibleUsers = async (): Promise<AxiosResponse<leaderboardType[]>> => {
  const headers = { Prefer: 'count=estimated' };
  const rs = await getRequest(`competition_leaderboard_users?competition_id=eq.${COMP_ID}&is_eligible=eq.true`, headers);
  return rs;
};

export const getTotalTradingVolume = async (): Promise<AxiosResponse<leaderboardType[]>> => {
  const rs = await getRequest(`competition_metadata?select=*,volume&id=eq.${COMP_ID}`);
  return rs;
};

export const getUserData = async (userAddress: string): Promise<AxiosResponse<leaderboardType[]>> => {
  const rs = await getRequest(`competition_leaderboard_users?user=eq.${userAddress}`);
  return rs;
};

export const getMetaData = async (): Promise<AxiosResponse<metadataType[]>> => {
  const rs = await getRequest(`competition_metadata?id=eq.${COMP_ID}`);
  return rs;
};

export const getExclusionList = async (userAddress: string): Promise<AxiosResponse<leaderboardType[]>> => {
  const rs = await getRequest(`competition_exclusion_list?user=eq.${userAddress}`);
  return rs;
};
