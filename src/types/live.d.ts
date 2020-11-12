export declare type LiveResponse = Array<number>;
export declare type Live = "new" | "top" | "best" | "ask" | "show" | "job";
export interface ItemResponse {
    by: string;
    descendants: number;
    id: number;
    kids: Array<number>;
    score: number;
    time: number;
    title: string;
    type: string;
    url: string;
}
//# sourceMappingURL=live.d.ts.map