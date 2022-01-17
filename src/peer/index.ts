import Peer from "peerjs";

const key = (import.meta.env.VITE_KEY as string) || "peerjs";

export const createPeer = (id?: string) => {
  return new Peer(id, {
    host: "localhost",
    port: 9000,
    path: "/peer",
    key,
  });
};
