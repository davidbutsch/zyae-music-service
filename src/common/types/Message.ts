export type MessageMetadata = {
  ownerServiceTag: string;
  ownerPid: number;
};

export type MessageOptions = {
  emitToSelf?: boolean; // default false
};

export type Message = {
  id: string;
  payload: any;
  metadata: MessageMetadata;
  options: MessageOptions;
};
