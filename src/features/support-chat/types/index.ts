export interface ChatLink {
  label: string;
  href: string;
}

export interface ChatReply {
  text: string;
  link?: ChatLink;
}

export interface ChatMessage extends ChatReply {
  id: string;
  role: "user" | "support";
  /** Unix ms */
  createdAt: number;
}
