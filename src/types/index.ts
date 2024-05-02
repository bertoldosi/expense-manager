export interface UserType {
  id: string;
  name: string;
  email: string;
  emailVerified?: string | null;
  image?: string | null;
  card: CardType[];
}

export interface CardType {
  id: string;
  name: string;
  createAt: Date;
  user: UserType;
  userId: string;
  shopping: ShoppingType[];
}

export interface CardCreateType {
  name: string;
}

export interface ShoppingType {
  id: string;
  position: number;
  description: string;
  category: string;
  amount: string;
  paymentStatus: string;
  createAt: Date;
  card: CardType;
  cardId: string;
}

export interface ShoppingCreateType {
  id: string;
  position: number;
  description: string;
  category: string;
  amount: string;
  paymentStatus: string;
  cardId: string;
}
