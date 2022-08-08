export type Post = {
  id: string;
  title: string;
  body: string;
  createdAt: number;
  updatedAt: number | null;
  authorId: string;
};
