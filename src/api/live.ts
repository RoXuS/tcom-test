import { ItemResponse, Live, LiveResponse } from "../types/live";

const baseUrl = "https://hacker-news.firebaseio.com/v0";

export const getLive = async (type: Live) => {
  const liveResponse = await fetch(
    `${baseUrl}/${type}stories.json?print=pretty`
  );
  if (liveResponse.ok) {
    const parsedLiveResponse = (await liveResponse.json()) as LiveResponse;
    return parsedLiveResponse;
  }
  return [];
};

export const getItem = async (itemId: number) => {
  const itemResponse = await fetch(
    `${baseUrl}/item/${itemId}.json?print=pretty`
  );
  if (itemResponse.ok) {
    const parsedItemResponse = (await itemResponse.json()) as ItemResponse;
    return parsedItemResponse;
  }
  return null;
};
