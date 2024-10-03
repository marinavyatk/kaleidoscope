import { api } from '@/common/api';
import { PrivacyPolicyData } from '@/common/types';
import s from './privacy.module.scss';
import { Layout } from '@/components/layout/layout';

type PrivacyPolicyProps = {
  privacyPolicy: PrivacyPolicyData;
};

export const getStaticProps = async () => {
  const privacyPolicy = await api.getPrivacyPolicy();
  return { props: { privacyPolicy } };
};

export default function PrivacyPolicy(props: PrivacyPolicyProps) {
  const { privacyPolicy } = props;
  return (
    <Layout>
      <main className={'mainContainer ' + s.privacyPolicy}>
        <h1 dangerouslySetInnerHTML={{ __html: privacyPolicy?.title }}></h1>
        <div dangerouslySetInnerHTML={{ __html: privacyPolicy?.content }}></div>
      </main>
    </Layout>
  );
}
