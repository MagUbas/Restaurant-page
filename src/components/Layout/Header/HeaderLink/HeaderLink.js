const HeaderLink = (props) => {
  return (
    <li
      style={
        (window.location.pathname + window.location.search).split("=")[0] ===
        props.path
          ? { color: "white" }
          : null
      }
      onClick={props.onClick}
    >
      {props.text}
    </li>
  );
};

export default HeaderLink;
