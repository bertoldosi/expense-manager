export interface User {
  id: string;
  name: string;
  email: string;
  image?: string | null;
  card: Card[];
}

export interface Card {
  id: string;
  name: string;
  createAt: Date;
  user: User;
  userId: string;
  shopping: Shopping[];
}

export interface Shopping {
  id: string;
  position: number;
  description: string;
  category: string;
  amount: string;
  paymentStatus: string;
  createAt: Date;
  card: Card;
  cardId: string;
}
