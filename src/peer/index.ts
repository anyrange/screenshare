import P2PCF from "p2pcf";
import { getCliendId } from "@/utils";

export const openChannel = (id?: string) => {
  const client_id = getCliendId();

  const USE_FALLBACK_SERVERS = import.meta.env.VITE_FALLBACK_SERVERS as boolean;

  return new P2PCF(client_id, id, {
    // workerUrl: '<your worker url>',
    ...(USE_FALLBACK_SERVERS && {
      stunIceServers: {
        urls: import.meta.env.VITE_STUN_SERVER as string,
      },
      turnIceServers: {
        urls: import.meta.env.VITE_TURN_SERVER as string,
        username: import.meta.env.VITE_TURN_USER as string,
        credential: import.meta.env.VITE_TURN_PASSWORD as string,
      },
    }),
  });
};
