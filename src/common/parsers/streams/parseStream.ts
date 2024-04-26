import { ParsedStream, parseStreamMessage } from "@/common";

export const parseStream = (stream: unknown) => {
  if (!Array.isArray(stream)) return null;

  /**
   * stream: [
   *   stream[0]: "STREAM_KEY",
   *   stream[1]: [
   *     ...messages
   *   ]
   * ],
   */

  const parsedStream: ParsedStream = {
    key: stream[0],
    messages: stream[1].map(parseStreamMessage),
  };

  return parsedStream;
};
