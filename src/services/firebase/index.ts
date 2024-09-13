import { ref, uploadBytes } from "firebase/storage";

import { db, storage } from "../../config/firebase";
import {
  addDoc,
  collection,
  DocumentData,
  getDocs,
  WithFieldValue,
} from "firebase/firestore";

export class FirebaseService {
  public static _instance: FirebaseService;

  public static getInstance(): FirebaseService {
    if (!this._instance) this._instance = new this();
    return this._instance;
  }

  async upload(file: Blob, path: string) {
    const storageRef = ref(storage, path);
    const result = await uploadBytes(storageRef, file);
    return result;
  }

  async saveDatabase(
    collectionName: string,
    data: WithFieldValue<DocumentData>
  ) {
    const res = await addDoc(collection(db, collectionName), data);
    return res;
  }

  async findDatabase(collectionName: string) {
    const doc_refs = await getDocs(collection(db, collectionName));
    const res: any[] = [];

    doc_refs.forEach((data) => {
      res.push({
        id: data.id,
        ...data.data(),
      });
    });
    return res;
  }
}
