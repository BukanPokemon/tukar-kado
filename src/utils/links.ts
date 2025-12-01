// links.ts
import { encryptText } from "./crypto";
import { ReceiverData } from "../types";

/**
 * Generate the unique Secret Santa assignment link for a giver.
 */
export async function generateAssignmentLink(
  giver: string,
  receiver: ReceiverData,
  instructions?: string
) {
  const baseUrl = `${window.location.origin}${window.location.pathname.replace(/\/[^/]*$/, '')}`;

  // Encrypt all receiver fields as JSON
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

/**
 * Generate CSV content from an array of [Giver, SecretSantaLink].
 * Does NOT include header; caller should provide it if needed.
 */
export function generateCSV(assignments: [string, string][]) {
  return assignments.map(([giver, link]) => `${giver}\t${link}`).join("\n");
}
