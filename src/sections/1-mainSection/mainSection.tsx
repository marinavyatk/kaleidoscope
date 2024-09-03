import {Button} from '../../components/button/button';
import s from './mainSection.module.scss';
import Background from '../../assets/main-section-bg.png';
import Kids from '../../assets/kids.png';
import Image from 'next/image';

export const MainSection = () => {
    return (
        <section className={s.mainSection}>
            <div className={s.background}>
                <Image src={'/main-section-bg.png'} alt="" fill quality={100}/>
            </div>
            <div className={s.kids}>
                <Image src={'/kids.png'} alt="" fill quality={100}/>
            </div>
            <h1>
                Калейдоскоп ИГР
                <br/>
                <span> конструкторское бюро</span>
            </h1>
            <p>Производим уникальные изделия для развития спортивного будущего!</p>
            <Button as="a" href="#catalog">
                Смотреть все изделия
            </Button>
        </section>
    );
};
