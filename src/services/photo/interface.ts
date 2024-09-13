import { IUseUser } from "../../common/hooks/use-user/interface";

export interface IPhoto {
  id: string;
  ext: string;
  path: string;
  likes: number;
  userId: string;
  isShowGallery: boolean;
}

export interface IPhotoService {
  uploadPhoto(
    file: Blob,
    user: IUseUser | undefined
  ): Promise<{
    message?: string;
    isError?: boolean;
  }>;
  getAllGallery(): Promise<{
    gallery?: IPhoto[];
    isError?: boolean;
  }>;
}
