export * from "./leaderboard.service";

export enum FETCH_STATUS {
    IDLE = 'IDLE',
    LOADING = 'LOADING',
    SUCCESS = 'SUCCESS',
    ERROR = 'ERROR',
    RATE_LIMIT = 'RATE_LIMIT',
} 