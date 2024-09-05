import { useEffect, useState } from 'react';
import { api } from '@/common/api';
import { DocumentData, Nullable } from '@/common/types';

export const useDocuments = () => {
  const [documents, setDocuments] = useState<Nullable<DocumentData[]>>(null);
  useEffect(() => {
    api
      .getDocuments()
      .then((data) => {
        console.log('documents', data);
        setDocuments(data);
      })
      .catch((error) => console.error('Error fetching documents:', error));
  }, []);

  return documents;
};
