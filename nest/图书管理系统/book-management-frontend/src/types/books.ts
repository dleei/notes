export interface Book {
  id: number;
  name: string;
  author: string;
  description: string;
  cover: string;
}

export interface CreateBook {
  name: string;
  author: string;
  description: string;
  cover: string;
}

export interface UpdateBook {
  id: number;
  name: string;
  author: string;
  description: string;
  cover: string;
}
