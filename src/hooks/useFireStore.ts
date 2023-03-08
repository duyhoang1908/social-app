import {
  onSnapshot,
  collection,
  where,
  query,
  orderBy,
  WhereFilterOp,
} from "firebase/firestore";
import { useEffect, useState } from "react";
import { db } from "../firebase/config";

interface Condition {
  fieldName: string;
  operator: WhereFilterOp;
  value: string;
}

const useFireStore = (collectionName: string, condition: Condition) => {
  const [data, setData] = useState<any[]>([]);
  useEffect(() => {
    const collectionRef = query(
      collection(db, collectionName),
      orderBy("createAt"),
      where(condition.fieldName, condition.operator, condition.value)
    );

    const unsubcribed = onSnapshot(collectionRef, (querySnapshot) => {
      const documents: any[] = [];
      querySnapshot.forEach((doc) => {
        documents.push({ ...doc.data() });
      });
      console.log(documents);
      setData(documents);
    });

    return unsubcribed;
  }, [collection, condition]);

  return data;
};

export default useFireStore;
