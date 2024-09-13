import { IUseUser } from "../../common/hooks/use-user/interface";

export interface IPhoto {
  id: string;
  ext: string;
  path: string;
  likes: number;
  userId: string;
  username: string;
  usersLike: string[];
  isShowGallery: boolean;
}

export interface IResponsePhotoService {
  message?: string;
  isError?: boolean;
  galleryPhotos?: IPhoto[];
}

export interface IPhotoService {
  uploadPhoto(
    file: Blob,
    user: IUseUser | undefined
  ): Promise<IResponsePhotoService>;
  getAllGallery(): Promise<IResponsePhotoService>;
  addLikeToPhoto(photo: IPhoto, userId: string): Promise<IResponsePhotoService>;
}
