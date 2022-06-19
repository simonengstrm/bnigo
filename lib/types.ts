import { WithId, Document } from "mongodb";

export interface Bingo extends WithId<Document>{
  id: string;
  name: string;
  description: string;
  questions: string[];
}