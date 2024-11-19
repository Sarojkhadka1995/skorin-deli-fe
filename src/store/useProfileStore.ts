import { create } from "zustand";
import { PersonalDetails } from "@/service/account.service";

interface ProfileState {
  profileData: PersonalDetails | null;
  setProfile: (profile: PersonalDetails) => void;
  clearProfile: () => void;
}

const useProfileStore = create<ProfileState>((set) => ({
  profileData: null,
  setProfile: (profile) => set({ profileData: profile }),
  clearProfile: () => set({ profileData: null }),
}));

export default useProfileStore;
