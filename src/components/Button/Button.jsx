import React from "react";
import classes from './Button.module.scss';

const Button = ({ setFormOpened, children }) => {
    return (
        <div 
            className={classes.button}
            onClick={() => setFormOpened(true)}
        >
            <span className="no-select">{children}</span>
        </div>
    );
};

export default Button;
