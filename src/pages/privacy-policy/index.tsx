import { api } from '@/common/api';
import { getStructuredProjectMap } from '@/common/commonFunctions';

export const getStaticProps = async () => {
  const privacyPolicy = (await api.getContacts()) || {}; //change

  return { props: privacyPolicy };
};

type PrivacyPolicyProps = {
  privacyPolicy: string;
};

export default function PrivacyPolicy(props: PrivacyPolicyProps) {
  const { privacyPolicy } = props;
  return <div dangerouslySetInnerHTML={{ __html: privacyPolicy }}></div>;
}
