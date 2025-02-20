export type Question = {
    id: number;
    text: string;
    options: string[];
}

export type LeaderboardEntry = {
    name: string;
    total: number;
    score: number;
    time: number;
}