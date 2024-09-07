import { useEffect, useState } from 'react';
import { api } from '@/common/api';
import { DocumentData, Nullable } from '@/common/types';

export const useDocuments = () => {
  const [documents, setDocuments] = useState<Nullable<DocumentData[]>>(null);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    setLoading(true);
    api
      .getDocuments()
      .then((data) => {
        setDocuments(data);
      })
      .catch((error) => console.error('Error fetching documents:', error))
      .finally(() => setLoading(false));
  }, []);

  return { documents, loading };
};
