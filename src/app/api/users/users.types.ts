export type TUser = {
  id: string;
  name: string;
  email: string;
  password: string;
  createdAt: Date;
  updatedAt: Date;
};

export type TUserRequest = Omit<TUser, "id" | "createdAt" | "updatedAt">;

export type TUserResponse = Omit<TUser, "password">;