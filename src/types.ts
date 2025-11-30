// types.ts

export interface Rule {
  type: 'must' | 'mustNot';
  targetParticipantId: string;
}

export interface Participant {
  id: string;
  name: string;
  hint?: string;      // Gift Hint
  rules: Rule[];

  // New fields for CSV / shipping info
  address?: string;
  phone?: string;
  notes?: string;
}

export type Participants = Record<string, Participant>;

// New type for encrypted data
export interface ReceiverData {
  name: string;
  hint?: string;
  address?: string;
  phone?: string;
  notes?: string;
}

// Optional: pair types
export interface Pair {
  giverId: string;
  receiverId: string;
}
