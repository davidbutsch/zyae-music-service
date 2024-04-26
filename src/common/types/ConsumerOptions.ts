export type ConsumerOptions = {
  streamKey: string; // default StreamKeys.DEFAULT
  ms?: number; // default 5000
  adaptiveInterval?: boolean; // default true
  stopOnProcessError?: boolean; // default false
};
