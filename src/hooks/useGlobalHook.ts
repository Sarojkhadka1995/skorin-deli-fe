import { useRouter } from "next/navigation";

const useGlobalHook = () => {
  const router = useRouter();

  const goBack = () => {
    router.back();
  };
  return {
    goBack,
  };
};

export default useGlobalHook;
