export interface leaderboardType {
    user: string;
    volume: number;
    integrators_used: string[];
    n_trades: number;
    points: number;
    competition_id: number;
    rank: number;
}

export interface metadataType {
    id: number;
    start: string;
    end: string;
    prize: number;
    market_id: number;
    integrators_required: string[];
}