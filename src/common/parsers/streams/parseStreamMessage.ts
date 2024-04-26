import { Message } from "@/common";

export const parseStreamMessage = (message: any[]): Message => {
  if (!Array.isArray(message[1]) || message[1].length !== 2)
    throw new Error(
      `Message with id: ${message[0]} contains unexpected message content: ${message[1]}`
    );

  /**
   * message: [
   *   message[0]: "1234567890123-0",
   *   message[1]: [
   *     "content",
   *     message[1][1]: "stringified json",
   *   ],
   * ];
   */

  let parsedContent;

  try {
    parsedContent = JSON.parse(message[1][1]);
  } catch (error) {
    throw new Error(
      `Message with id: ${message[0]} contains invalid JSON: ${message[1]}`
    );
  }

  const parsedMessage: Message = {
    id: message[0],
    payload: parsedContent.payload,
    metadata: parsedContent.metadata,
    options: parsedContent.options,
  };

  return parsedMessage;
};
