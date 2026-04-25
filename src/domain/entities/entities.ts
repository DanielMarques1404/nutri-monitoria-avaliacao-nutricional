export interface IGeneric {
  id: number;
  entityType: "Tags" | "Options" | "Categories" | "Questions";
}

export interface ITag extends IGeneric {
  name: string;
}

export interface IOption extends IGeneric {
  questionId: string;
  description: string;
}

export interface ICategory extends IGeneric {
  name: string;
  active: boolean;
}

export interface IQuestion extends IGeneric {
  title: string;
  statement: string;
  question: string;
  options: IOption[];
  correctOptionId: number;
  explanation: string;
  category: ICategory;
  difficulty: string;
  tags?: ITag[];
  summaryImage?: string;
}
