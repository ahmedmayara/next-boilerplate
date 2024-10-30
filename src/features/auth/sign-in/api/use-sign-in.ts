import { signIn } from "@/features/auth/sign-in/actions";

import { useServerActionMutation } from "@/hooks/action-hooks";

export const useSignUp = () => {
  const mutation = useServerActionMutation(signIn);

  return mutation;
};
