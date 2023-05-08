import classes from "./Modal.module.css";
import Button from "../Button/Button";

const Modal = (props) => {
  return (
    <div
      className={`${classes.modal} ${props.show ? classes.modalShow : null}`}
      onClick={props.onClose}
    >
      <div
        className={classes.modalContent}
        onClick={(e) => e.stopPropagation()}
      >
        {props.children}
        <div className={classes.bttContainer}>
          {props.buttonList.map((elem) => {
            return (
              <Button
                key={elem.text}
                onClick={elem.onClick}
                disabled={elem.disabled}
              >
                {elem.text}
              </Button>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Modal;
