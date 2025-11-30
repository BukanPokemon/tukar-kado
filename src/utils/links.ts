// links.ts
import { encryptText } from "./crypto";
import { ReceiverData } from "../types";

export async function generateAssignmentLink(
  giver: string,
  receiver: ReceiverData,
  instructions?: string
) {
  const baseUrl = `${window.location.origin}${window.location.pathname.replace(/\/[^/]*$/, '')}`;

  // Always encrypt a JSON object with all possible fields
  const dataToEncrypt = JSON.stringify(receiver);
  const encryptedReceiver = await encryptText(dataToEncrypt);

  const params = new URLSearchParams({
    from: giver,
    to: encryptedReceiver,
  });

  if (instructions?.trim()) {
    params.set("info", instructions.trim());
  }

  return `${baseUrl}/pairing?${params.toString()}`;
}

// Optional CSV generator
export function generateCSV(assignments: [string, string][]) {
  const csvContent = assignments
    .map(([giver, receiver]) => `${giver}\t${receiver}`)
    .join('\n');
  return `Giver\tReceiver\n${csvContent}`;
}
