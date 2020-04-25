type Order = {
  //  pk
  order_id: string;

  //  properties
  state: string;
  bet: number;
  win: number;

  // fk
  game_id: string;
  user_id: string;

  //  times
  created_at: Date;
  updated_at: Date;
  completed_at: Date;
};

Order.pk = "order_id";

export default function Order(data: any): Order {
  //
  return {
    order_id: data.order_id,

    state: data.state,
    bet: Number(data.bet),
    win: Number(data.win),

    game_id: data.game_id,
    user_id: data.user_id,

    created_at: new Date(data.created_at),
    updated_at: new Date(data.updated_at),
    completed_at: new Date(data.completed_at)
  };
}
