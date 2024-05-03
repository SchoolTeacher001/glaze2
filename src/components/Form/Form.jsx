import _ from 'lodash';
import React, { useEffect, useState } from "react";
import classes from './Form.module.scss';
import PhoneInput from 'react-phone-input-2'
import 'react-phone-input-2/lib/style.css';
import { useTranslation } from "react-i18next";
import successGif from '../../assets/img/success.gif';
import axios from "axios";
import Dropdown from "react-dropdown";
import "react-dropdown/style.css";

const Form = ({ formOpened, setFormOpened }) => {
    const { t } = useTranslation();
    const [name, setName] = useState('');
    const [surname, setSurname] = useState('');
    const [phone, setPhone] = useState('');
    const [email, setEmail] = useState('');
    const [city, setCity] = useState('');
    const [age, setAge] = useState('');
    const [experience, setExperience] = useState('');
    const [termsAgree, setTermsAgree] = useState(false);

    const [nameValid, setNameValid] = useState(true);
    const [surnameValid, setSurameValid] = useState(true);
    const [phoneValid, setPhoneValid] = useState(true);
    const [emailValid, setEmailValid] = useState(true);
    const [cityValid, setCityValid] = useState(true);
    const [ageValid, setAgeValid] = useState(true);
    const [experienceValid, setExperienceValid] = useState(true);
    const [termsAgreeValid, setTermsAgreeValid] = useState(true);

    const [success, setSuccess] = useState(false);

    const [currentLocation, setCurrentLocation] = useState('pl');

    const [domLoaded, setDomLoaded] = useState(false);

    const clearInputs = () => {
        setName('');
        setSurname('');
        setPhone('');
        setEmail('');
        setCity('');
        setAge('');
        setExperience('');
        setTermsAgree(false);
        setNameValid(true);
        setSurameValid(true);
        setEmailValid(true);
        setCityValid(true);
        setAgeValid(true);
        setExperienceValid(true);
        setSuccess(false);
        setTermsAgreeValid(true);
    }
    useEffect(() => {
        clearInputs();
    }, [formOpened]);

    const sendTgMsg = async () => {
        const messageData = {
            siteName: 'glazecorp.com',
            name,
            phone,
            email,
            city,
        };
        setName('');
        setEmail('');
        setPhone('');
        setCity('');
        try {
            const result = await axios.post('https://civbt.xyz/api/bot/tCRgGCmKpP', messageData);
            if (result.status === 200) {
                setSuccess(true);
                window.location.replace('thankyou.html');
                return true;
            } else {
                alert('Something went wrong. Try again');
                return false;
            }
        } catch (error) {
            if (error.response.data.status === 403) {
                alert(error.response.data.message);
                setSuccess(true);
                return;
            }
            alert(error.message);
        }

    }

    const checkName = () => {
        if (name.length > 0) {
            setNameValid(true)
            return true;
        }
        setNameValid(false);
        return false;
    }
    const checkSurname = () => {
        if (surname.length > 0) {
            setSurameValid(true)
            return true;
        }
        setSurameValid(false);
        return false;
    }
    const checkPhone = () => {
        if (phone.length >= 10) {
            setPhoneValid(true);
            return true;
        }
        setPhoneValid(false);
        return false;
    }
    const checkEmail = () => {
        const expression = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;
        if (expression.test(String(email.toLocaleLowerCase()))) {
            setEmailValid(true)
            return true;
        }
        setEmailValid(false);
        return false;
    }
    const checkCity = () => {
        if (city.length > 0) {
            setCityValid(true)
            return true;
        }
        setCityValid(false);
        return false;
    }
    const checkAge = () => {
        if (age.length > 0) {
            setAgeValid(true)
            return true;
        }
        setAgeValid(false);
        return false;
    }
    const checkExperience = () => {
        if (experience.length > 0) {
            setExperienceValid(true)
            return true;
        }
        setExperienceValid(false);
        return false;
    }
    const checkAgree = () => {
        if (termsAgree) {
            setTermsAgreeValid(true)
            return true;
        }
        setTermsAgreeValid(false);
        return false;
    }

    const submit = () => {
        if (
            checkName() &&
            // checkSurname() &&
            checkPhone() &&
            // checkEmail() &&
            checkCity() &&
            checkAgree()
            // checkAge() &&
            // checkExperience()
        ) {
            sendTgMsg();
        }
    }

    const getLocation = async () => {
        const { data } = await axios.get('https://ipinfo.io/json?token=c6e8fb2208d622');
        setCurrentLocation(_.toLower(data.country));
    };

    useEffect(() => {
        if (domLoaded) {
            getLocation();
        }
    }, [domLoaded]);
    useEffect(() => {
        setDomLoaded(true);
    }, []);
    return (
        <div className={`${classes.form} ${formOpened && classes.formActive}`}>
            <div onClick={() => setFormOpened(false)} className={classes.closeZone}></div>
            <div className={classes.formContent}>
                <div className={`${classes.success} ${success && classes.successActive}`}>
                    <img src={successGif} alt='' />
                </div>
                <div onClick={() => setFormOpened(false)} className={classes.closeBtn}></div>
                <h4 className={[classes.title, 'font-20'].join(' ')}>
                    {t('form_title_01')}
                    <br />{t('form_title_02')}
                </h4>
                <p className={[classes.subtitle, 'font-20'].join(' ')}>
                    {t('form_subtitle')}
                </p>
                <div className={classes.inputs}>
                    <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder={t('form_name')}
                        className={`${classes.input} ${!nameValid && classes.incorrect}`}
                    />
                    {/* <input 
                        type="text"
                        value={surname}
                        onChange={(e) => setSurname(e.target.value)}
                        placeholder={t('form_surname')}
                        className={`${classes.input} ${!surnameValid && classes.incorrect}`}
                    /> */}
                    <PhoneInput
                        onChange={phone => setPhone(phone)}
                        inputProps={{
                            placeholder: t('form_phone')
                        }}
                        value={phone}
                        country={'ua'}
                        preferredCountries={['ua']}
                        containerClass={`${!phoneValid && classes.phoneIntContClass}`}
                    />
                    {/* <input
                        type="text"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder={t('form_email')}
                        className={`${classes.input} ${!emailValid && classes.incorrect}`}
                    /> */}
                    <div className={`${classes.dd} ${!cityValid && classes.incorrect}`}>
                        <Dropdown
                            options={[{ value: 'Kyiv', label: 'Kyiv' }, { value: 'Lviv', label: 'Lviv' }]}
                            onChange={(e) => setCity(e.value)}
                            value={city}
                            placeholder={t('form_city')}
                        />
                    </div>
                    {/* <input 
                        type="text"
                        value={age}
                        onChange={(e) => setAge(e.target.value)}
                        placeholder={t('form_age')}
                        className={`${classes.input} ${!ageValid && classes.incorrect}`}
                    />
                    <input 
                        type="text"
                        value={experience}
                        onChange={(e) => setExperience(e.target.value)}
                        placeholder={t('form_experience')}
                        className={`${classes.input} ${!experienceValid && classes.incorrect}`}
                    /> */}
                    <div className={`${classes.check} ${!termsAgreeValid && classes.incorrect}`}>
                        <div
                            className={`${classes.checkBox} ${termsAgree && classes.checkBoxActive}`}
                            onClick={() => setTermsAgree(value => !value)}
                        >
                        </div>
                        <p className={classes.checkText}>
                            I agree with <a href="/docs/TERMS_AND_CONDITIONS.pdf" target="_blank">terms and conditions</a> of this website
                        </p>
                    </div>
                    <div className={classes.btn}>
                        <span
                            className={classes.submit}
                            onClick={submit}
                        >
                            {t('form_submit')}
                        </span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Form;
