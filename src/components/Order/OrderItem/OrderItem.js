import classes from "./OrderItem.module.css";

const OrderItem = (props) => {
  return (
    <div className={classes.containerOrderItem} style={props.style}>
      <p>{props.name}</p>
      <p>{props.amount}</p>
      <p>{props.price}</p>
    </div>
  );
};

export default OrderItem;
