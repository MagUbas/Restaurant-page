import classes from "./MenuItem.module.css";
import Button from "../../UI/Button/Button";

const MenuItem = (props) => {
  const tempItem = {
    id: props.item.name,
    name: props.item.name,
    price: parseFloat(props.item.price.replace(/,/g, ".")),
    amount: 1,
  };

  return (
    <li className={classes.menuItem}>
      <div className={classes.menuItemText}>
        <h2>{props.item.name.replaceAll("_", " ")}</h2>
        <p>{props.item.description}</p>
      </div>

      <Button
        buttonStyle={{ width: "60px" }}
        onClick={() => props.onAddToCart(tempItem)}
      >
        {props.item.price}
      </Button>
    </li>
  );
};

export default MenuItem;
