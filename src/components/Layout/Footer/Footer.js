import classes from "./Footer.module.css";

const Footer = (props) => {
  return (
    <div className={classes.footer}>
      <div className={classes.mail}>
        <p>E-mail:</p>
        <p>smakosze@gmail.com</p>
      </div>
      <div className={classes.address}>
        <p>Address:</p>
        <p>Krupnicza 52/6c</p>
        <p>43-245 Pniówek</p>
      </div>
      <div className={classes.tel}>
        <p>Telefon:</p>
        <p>606 76 23 45</p>
      </div>
      <div className={classes.hours}>
        <p className={classes.textH}>Opening hours:</p>
        <div className={classes.MW}>
          <p>Monday - Wednesday:</p>
          <p>14:00-20:00</p>
        </div>
        <div className={classes.TS}>
          <p>Thursday - Saturday:</p>
          <p>14:00-22:00</p>
        </div>
      </div>
    </div>
  );
};

export default Footer;
