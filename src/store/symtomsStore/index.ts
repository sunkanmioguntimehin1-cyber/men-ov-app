import { create } from "zustand";

interface SymptomsData {
  symptomslist: string;
  uploadUrl: string;
  publicUrl: string[]; // Explicitly typed as string array
  notePublicUrl: string[];
}

interface SymptomsStore {
  symtomsDataList: SymptomsData;
  setSymtomsDataList: (data: Partial<SymptomsData>) => void;
  clearPublicUrls: () => void;
  clearAllData: () => void;
}

const symtomsStore = (set: any): SymptomsStore => ({
  symtomsDataList: {
    symptomslist: "",
    uploadUrl: "",
    publicUrl: [], // Empty array of strings
    notePublicUrl: [],
  },

  setSymtomsDataList: (data: Partial<SymptomsData>) => {
    set((state: any) => ({
      ...state,
      symtomsDataList: { ...state.symtomsDataList, ...data },
    }));
  },

  clearPublicUrls: () => {
    set((state: any) => ({
      ...state,
      symtomsDataList: {
        ...state.symtomsDataList,
        publicUrl: [],
        notePublicUrl: [],
      },
    }));
  },

  clearAllData: () => {
    set((state: any) => ({
      ...state,
      symtomsDataList: {
        symptomslist: "",
        uploadUrl: "",
        publicUrl: [],
        notePublicUrl: [],
      },
    }));
  },
});

const useSymtomsStore = create(symtomsStore);
export default useSymtomsStore;
