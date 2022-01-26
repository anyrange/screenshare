import Peer from "peerjs";

export const createPeer = (id?: string) => {
  const host = import.meta.env.VITE_PEER_SERVER as string;
  const key = (import.meta.env.VITE_KEY as string) || "peerjs";

  const FALLBACK_SERVERS =
    import.meta.env.VITE_TURN_SERVER && import.meta.env.VITE_STUN_SERVER;

  return new Peer(id, {
    ...(host && { host, path: "/peer", key }),

    ...(FALLBACK_SERVERS && {
      config: {
        iceServers: [
          { urls: import.meta.env.VITE_STUN_SERVER as string },
          {
            urls: import.meta.env.VITE_TURN_SERVER as string,
            username: import.meta.env.VITE_TURN_USER as string,
            credential: import.meta.env.VITE_TURN_PASSWORD as string,
          },
        ],
      },
    }),
  });
};
