import { create } from "zustand";

interface InfoModal {
  title: string;
  message: string;
  action?: Function;
  actionText?: string;
}

type TModalStore = {
  isShow: boolean;
  info?: InfoModal;
  toggleModal: (info?: InfoModal) => void;
};

export const useModalStore = create<TModalStore>((set) => ({
  isShow: false,
  toggleModal: (info?) =>
    set((state) => ({
      isShow: !state.isShow,
      info,
    })),
}));
