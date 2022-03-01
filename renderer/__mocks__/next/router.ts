export const push = jest.fn();

export const useRouter = jest.fn().mockImplementation(() => ({
  push,
}));
