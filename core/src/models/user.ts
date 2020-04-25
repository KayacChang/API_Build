type User = {
  //  pk
  user_id: string;

  //  properties
  username: string;
  balance: number;

  //  times
  created_at: Date;
  updated_at: Date;
};

User.pk = "user_id";

export default function User(data: any): User {
  //
  return {
    user_id: data.user_id,

    username: data.username,
    balance: Number(data.balance),

    created_at: new Date(data.created_at),
    updated_at: new Date(data.updated_at)
  };
}
