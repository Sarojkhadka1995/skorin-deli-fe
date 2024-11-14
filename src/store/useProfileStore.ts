import { create } from "zustand";
import { Profile } from "@/interface/auth.types";

interface ProfileState {
  profileData: Profile | null;
  setProfile: (profile: Profile) => void;
  clearProfile: () => void;
}

const useProfileStore = create<ProfileState>((set) => ({
  profileData: null,
  setProfile: (profile) => set({ profileData: profile }),
  clearProfile: () => set({ profileData: null }),
}));

export default useProfileStore;
