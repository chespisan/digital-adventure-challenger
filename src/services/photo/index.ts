import { getDownloadURL, ref } from "firebase/storage";
import { v4 as uuidv4 } from "uuid";

import { FirebaseService } from "../firebase";
import { IUseUser } from "../../common/hooks/use-user/interface";
import { storage } from "../../config/firebase";
import { IPhoto, IPhotoService } from "./interface";

export class PhotoManagementService implements IPhotoService {
  public static _instance: PhotoManagementService;
  private firebase: FirebaseService;

  constructor() {
    this.firebase = FirebaseService.getInstance();
  }

  public static getInstance(): PhotoManagementService {
    if (!this._instance) this._instance = new this();
    return this._instance;
  }

  async uploadPhoto(file: Blob, user: IUseUser | undefined) {
    try {
      const path = `${import.meta.env.VITE_FOLDER_BUCKET_FB}/${
        user?.username
      }-${uuidv4()}`;
      await this.firebase.upload(file, path);

      const finalPath = await getDownloadURL(ref(storage, path));

      await this.firebase.saveDatabase(import.meta.env.VITE_STORAGE_PHOTO_FB, {
        path: finalPath,
        ext: ".jpg",
        userId: user?.id,
        likes: 0,
        isShowGallery: true,
      });
      return { message: "Foto guardada!" };
    } catch (error) {
      return {
        isError: true,
      };
    }
  }

  async getAllGallery() {
    try {
      const galleryPhotos: IPhoto[] = await this.firebase.findDatabase(
        import.meta.env.VITE_STORAGE_PHOTO_FB
      );
      return {
        galleryPhotos,
      };
    } catch (error) {
      return {
        isError: true,
      };
    }
  }
}
