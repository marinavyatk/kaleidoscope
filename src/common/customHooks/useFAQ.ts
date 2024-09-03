import {useEffect, useState} from 'react';
import {api} from '@/common/api';
import {Nullable} from '@/common/types';


type Faq = {
    title: string;
    content: string;
}

export const useFAQ = () => {
    const [faqData, setFaqData] = useState<Nullable<Faq[]>>(null);
    useEffect(() => {
        api.getFAQ()
            .then((data) => setFaqData(data as Faq[]))
            .catch((error) => console.error('Error fetching FAQs:', error));
    }, []);

    return faqData
}