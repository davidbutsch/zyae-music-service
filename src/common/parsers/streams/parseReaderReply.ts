import { parseStream } from ".";

export const parseReaderReply = (streams: unknown[] | undefined) => {
  if (!streams) return [];

  const parsedStreams = streams.map(parseStream);

  const omitNull = parsedStreams.flatMap((f) => (f ? [f] : []));

  return omitNull;
};
