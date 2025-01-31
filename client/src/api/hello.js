import { requestHandler } from "./requestHandler";

export const hello = async () => {
  return await requestHandler("/api", "GET");
};
