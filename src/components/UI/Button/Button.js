import classes from "./Button.module.css";

const Button = (props) => {
  return (
    <button
      className={props.disabled ? classes.buttonDisabled : classes.button}
      style={props.buttonStyle}
      onClick={props.onClick}
      disabled={props.disabled}
    >
      {props.children}
    </button>
  );
};

export default Button;
