import { signUp } from "@/features/auth/sign-up/actions";

import { useServerActionMutation } from "@/hooks/action-hooks";

export const useSignUp = () => {
  const mutation = useServerActionMutation(signUp);

  return mutation;
};
