import classes from "./OrderItemList.module.css";
import OrderItem from "../OrderItem/OrderItem";

const OrderItemList = (props) => {
  return (
    <div className={classes.orderList}>
      <OrderItem name="Name" amount="Amount" price="Price" />
      {props.items.map((item) => {
        return (
          <OrderItem
            key={item.name}
            name={item.name.replaceAll("_", " ")}
            amount={item.amount}
            price={item.price * item.amount}
          />
        );
      })}
      <OrderItem
        name="Total"
        price={props.totalAmount}
        style={{ border: "hidden", fontWeight: "bold" }}
      />
    </div>
  );
};

export default OrderItemList;
