export interface LegalSection {
  id: string;
  title: string;
  paragraphs: string[];
  /** Bulleted list shown after the paragraphs */
  list?: string[];
  /** Paragraph shown after the list */
  closing?: string;
}

export interface LegalDocument {
  title: string;
  description: string;
  /** ISO date, YYYY-MM-DD */
  updated: string;
  sections: LegalSection[];
}
