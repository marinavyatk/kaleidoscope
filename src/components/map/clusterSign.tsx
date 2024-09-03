import s from './map.module.scss';

export type ClusterProps = {
  number: number;
};

export const ClusterSign = (props: ClusterProps) => {
  return <div className={s.cluster}>{props.number}</div>;
};
