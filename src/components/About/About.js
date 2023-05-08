import classes from "./About.module.css";

const About = () => {
  return (
    <div>
      <div className={classes.welcomeBlock}>
        <h1>About us</h1>
      </div>
      <div className={classes.contentBlockAbout}>
        <p>
          Craving some delicious food? Maybe you’re in the mood for a juicy
          steak? No matter what kind of meal you have in mind, Our Restaurant is
          ready to prepare it for you.
        </p>
        <p>
          Our diner serves breakfast all day, in addition to wholesome and
          flavorful dining options for lunch and dinner. From burgers to salads,
          seafood to pastas, you’ll find all kinds of hearty meals prepared
          fresh. Our diner also has a full bakery with delicious baked goods and
          other treats, including our famous cheesecake.
        </p>
        <p>Sounds delicious, right?</p>
      </div>
    </div>
  );
};

export default About;
