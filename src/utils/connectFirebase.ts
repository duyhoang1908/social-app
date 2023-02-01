import { collection, addDoc, query, where, getDocs } from 'firebase/firestore';
import { db } from '../firebase/config';


export const addDocument = async (collectionName:string, data:any) => {
    try {
        await addDoc(collection(db, collectionName), {
            ...data,
        });
    } catch (e) {
        console.error('Error adding document: ', e);
    }
};