/**
 *  Basic functionality Test
 */

//  == Game ==
JSON.stringify({
  // pk
  game_id: "eba74ad2c25991346e73e330dbea12f4",

  //   properties
  name: "cyberpunk",
  href: "https://cyberpunk-dev.sunnyland.fun",
  category: "slot",

  //    times
  created_at: new Date().toUTCString(),
  updated_at: new Date().toUTCString()
});
// "{\"game_id\":\"eba74ad2c25991346e73e330dbea12f4\",\"name\":\"cyberpunk\",\"href\":\"https:\/\/cyberpunk-dev.sunnyland.fun\",\"category\":\"slot\",\"created_at\":\"Wed, 22 Apr 2020 13:40:32 GMT\",\"updated_at\":\"Wed, 22 Apr 2020 13:40:32 GMT\"}"

//  == User ==
JSON.stringify({
  // pk
  user_id: "eba74ad2c25991346e73e330dbea12f4",

  // properties
  username: "kayac",

  //  times
  created_at: new Date().toUTCString(),
  updated_at: new Date().toUTCString()
});
// "{\"user_id\":\"eba74ad2c25991346e73e330dbea12f4\",\"username\":\"kayac\",\"created_at\":\"Wed, 22 Apr 2020 13:42:09 GMT\",\"updated_at\":\"Wed, 22 Apr 2020 13:42:09 GMT\"}"

//  == Order ==
JSON.stringify({
  //  pk
  order_id: "9c4b7a31-92b0-469a-bf46-37980d2216f7",

  //  properties
  state: "C",
  bet: 60,
  win: 100,

  // fk
  game_id: "eba74ad2c25991346e73e330dbea12f4",
  user_id: "eba74ad2c25991346e73e330dbea12f4",

  //  times
  created_at: new Date().toUTCString(),
  updated_at: new Date().toUTCString(),
  completed_at: new Date().toUTCString()
});
// "{\"order_id\":\"9c4b7a31-92b0-469a-bf46-37980d2216f7\",\"state\":\"C\",\"bet\":60,\"win\":100,\"game_id\":\"eba74ad2c25991346e73e330dbea12f4\",\"user_id\":\"eba74ad2c25991346e73e330dbea12f4\",\"created_at\":\"Wed, 22 Apr 2020 13:43:23 GMT\",\"updated_at\":\"Wed, 22 Apr 2020 13:43:23 GMT\",\"completed_at\":\"Wed, 22 Apr 2020 13:43:23 GMT\"}"
