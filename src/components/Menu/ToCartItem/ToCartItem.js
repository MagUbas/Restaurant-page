import Button from "../../UI/Button/Button";
import classes from "./ToCartItem.module.css";

const ToCartItem = (props) => {
  return (
    <fieldset className={classes.toCartItem}>
      <legend>{props.item.name.replaceAll("_", " ")}</legend>
      <p className={classes.amount}>Amount: {props.item.amount}</p>
      <p className={classes.cost}>
        Cost: {props.item.amount * props.item.price}
      </p>

      <Button
        className={classes.add}
        onClick={() => props.onAddItem(props.item)}
        buttonStyle={{ width: "40px" }}
      >
        +
      </Button>
      <Button
        className={classes.remove}
        onClick={() => props.onRemoveItem(props.item)}
        buttonStyle={{ width: "40px" }}
      >
        -
      </Button>
    </fieldset>
  );
};

export default ToCartItem;
