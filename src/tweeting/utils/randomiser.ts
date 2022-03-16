export const randomiser = (arg: string[]) => {
  return arg[Math.floor(Math.random() * arg.length)];
};
