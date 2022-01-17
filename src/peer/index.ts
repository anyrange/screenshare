import Peer from "peerjs";

export const createPeer = (id?: string) => {
  return new Peer(id, {
    host: "localhost",
    port: 9000,
    path: "/peer",
  });
};
