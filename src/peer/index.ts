import Peer from "peerjs";

export const createPeer = (id?: string) => {
  return new Peer(id);
};
