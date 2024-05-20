export const WORLD_CUP = /^[Women's ]*Rugby World Cup \d+$/;

// I need to check if home advantage applies in a competition.
// For example I've seen that home advantage didn't seem apply
// to the ranking calculations for the `Asia Rugby Championship 2024`.
// I see nothing in the api data that can tell me this.
// So I'm just going to keep a list `NO_HOME_ADVANTAGE_COMPS` here in the code.
// I'll update this list if I see this happening with other competitions.
export const NO_HOME_ADVANTAGE_COMPS = [
  /^Asia Rugby Championship 2024$/,
];

export const UNRANKED_COMPS = [
  /^Americas Rugby Trophy 2023$/,
  // /^Women's Internationals 2023$/,
];
