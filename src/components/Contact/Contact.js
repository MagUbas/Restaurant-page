import classes from "./Contact.module.css";

const Contact = () => {
  return (
    <div className={classes.contactBody}>
      <div className={classes.welcomeBlock}>
        <h1>Contact us</h1>
      </div>
      <div className={classes.contentBlock}>
        <div className={classes.text}>
          <p>Do you have any questions?</p>
          <p>Contact us.</p>
          <p>Write or call us!</p>
        </div>
        <div className={classes.mail}>
          <p>E-mail:</p>
          <p>smakosze@gmail.com</p>
        </div>
        <div className={classes.adres}>
          <p>Ardes:</p>
          <p>Krupnicza 52/6c</p>
          <p>43-245 Pniówek</p>
        </div>
        <div className={classes.tel}>
          <p>Telefon:</p>
          <p>606 76 23 45</p>
        </div>
      </div>
    </div>
  );
};

export default Contact;
