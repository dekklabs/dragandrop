export interface Questions {
  id: string;
  prefix: string;
  content: string;
}

export interface Data {
  id: number;
  name: string;
  questions: Questions[]
}
