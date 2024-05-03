import _ from 'lodash';
import React, { useState, useEffect } from "react";
import Button from "../Button/Button";
import classes from './Page.module.scss';
import logo from '../../assets/img/logo.png';
import image_01 from '../../assets/img/image_01.png';
import image_02 from '../../assets/img/image_02.png';
import image_03 from '../../assets/img/image_03.png';
import eyes from '../../assets/img/eyes.png';
import { useTranslation } from "react-i18next";
import Cookies from "js-cookie";
import Form from "../Form/Form";
import $ from 'jquery';

const Page = () => {
    const { t } = useTranslation();
    const [currentLang, setCurrentLang] = useState(Cookies.get("i18next"));
    const [formOpened, setFormOpened] = useState(false);
    const [num, setNum] = useState(_.random(1, 6));
    useEffect(() => {
        setCurrentLang(Cookies.get("i18next"));
    }, [Cookies.get("i18next")]);
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);
    useEffect(() => {
        setInterval(() => {
            setNum(_.random(1, 6));
        }, 70000);
    }, []);
    useEffect(() => {
        if (formOpened) {
            $('body').addClass("ovf-hidden");
        } else {
            $('body').removeClass("ovf-hidden");
        }
    }, [formOpened]);
    return (
        <div className={classes.page}>
            <Form formOpened={formOpened} setFormOpened={setFormOpened} />
            <header className={classes.header}>
                <div className="container">
                    <div className={classes.headerWrap}>
                        <img src={logo} />
                        <div className={classes.headerContent}>
                            <a href="#salesperson" className={classes.headerItem}>
                                {t('header_what_offer')}
                            </a>
                            <a href="#requirements" className={classes.headerItem}>
                                {t('header_requirements')}
                            </a>
                            <a href="#whoweare" className={classes.headerItem}>
                                {t('header_who_we_are')}
                            </a>
                        </div>
                    </div>
                </div>
            </header>

            <section id="salesperson" className={classes.salesperson}>
                <div className="container">
                    <h1 className={classes.title}>
                        <span className={`${classes.titleText_01} font-55`}>
                            <span className={classes.titleText_01_open}>
                                Відкрита!
                            </span>
                            Вакансія менеджера
                        </span>
                        <span className={`${classes.titleText_02} font-30`}>
                            по комунікації з клієнтами
                        </span>
                    </h1>
                    <p className={[classes.text, 'font-20'].join(' ')}>
                        {t('salesperson_text')}
                    </p>
                    <h4 className={[classes.subtitle, 'font-20'].join(' ')}>
                        {t('salesperson_subtitle')}
                    </h4>
                    <div className={classes.slspBtn}>
                        <Button setFormOpened={setFormOpened}>
                            {t('btn_respond')}
                        </Button>
                    </div>
                    <div className={classes.annotation}>
                        <img className={classes.annotationImg} src={eyes} alt='' />
                        <p className={classes.annotationText}>
                            {currentLang === 'en' ?
                                <>
                                    {num === 1 ?
                                        <>
                                            {t('annotation_text_01', { num })}
                                        </>
                                        :
                                        <>
                                            {t('annotation_text_01_multiple', { num })}
                                        </>
                                    }
                                </>
                                :
                                (currentLang === 'ru' || currentLang === 'ua') ?
                                    <>
                                        {num === 1 ?
                                            <>
                                                {t('annotation_text_01', { num })}
                                            </>
                                            :
                                            <>
                                                {num >= 5 ?
                                                    <>
                                                        {t('annotation_text_01_multiple_02', { num })}
                                                    </>
                                                    :
                                                    <>
                                                        {t('annotation_text_01_multiple_01', { num })}
                                                    </>
                                                }
                                            </>
                                        }
                                    </>
                                    :
                                    <>
                                        {t('annotation_text_01', { num })}
                                    </>
                            }
                            <br />{t('annotation_text_02')}
                        </p>
                    </div>
                    <img className={classes.image_01} src={image_01} alt='' />
                </div>
            </section>

                
            <div className={classes.undbWrap}>
                <img className={classes.image_02} src={image_02} alt=''/>
                <div className='container'>
                    <section className={classes.undb}>
                        <div className={classes.undbList}>
                            <h2 className={[classes.listTitle, 'font-30'].join(' ')}>
                                {t('what_we_offer_title')}
                            </h2>
                            <ul className="font-20">
                                <li>{t('what_we_offer_li_01')}</li>
                                <li>{t('what_we_offer_li_02')}</li>
                                <li>{t('what_we_offer_li_02_02')}</li>
                                <li>{t('what_we_offer_li_03')}</li>
                                <li>{t('what_we_offer_li_04')}</li>
                                <li>{t('what_we_offer_li_05')}</li>
                                <li>{t('what_we_offer_li_06')}</li>

                            </ul>
                            <div className={[classes.btn, classes.pcBtn1].join(" ")}>
                                <Button setFormOpened={setFormOpened}>
                                    {t('btn_respond')}
                                </Button>
                            </div>
                        </div>
                        <section id="requirements" className={classes.requirements}>
                            <div className={[classes.container].join(' ')}>
                                <div className={classes.content}>
                                    <h2 className={[classes.title, 'font-30'].join(' ')}>
                                        {t('requirements_title')}
                                    </h2>
                                    <ul className="font-20">
                                        <li>{t('requirements_li_01')}</li>
                                        <li>{t('requirements_li_02')}</li>

                                    </ul>
                                    <div className={classes.btn}>
                                        <Button setFormOpened={setFormOpened}>
                                            {t('btn_respond')}
                                        </Button>
                                    </div>
                                </div>
                            </div>
                        </section>
                    </section>
                </div>
            </div>


            <section id="whoweare" className={classes.whoWeAre}>
                <div className={[classes.container, "container"].join(' ')}>
                    <div className={classes.hwaContent}>
                        <h2 className={[classes.title, 'font-30'].join(' ')}>
                            {t('who_we_are_title')}
                        </h2>
                        <div className={[classes.text, 'font-20'].join(' ')}>
                            <p>
                                {t('who_we_are_text_01')}
                            </p>
                            <p>
                                {t('who_we_are_text_02')}
                            </p>
                            <p>
                                {t('who_we_are_text_03')}
                            </p>
                            <p>
                                {t('who_we_are_text_04')}
                            </p>
                        </div>
                        <div className={classes.btn}>
                            <Button setFormOpened={setFormOpened}>
                                {t('btn_respond')}
                            </Button>
                        </div>
                        <img className={classes.image_03} src={image_03} alt='' />
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Page;
