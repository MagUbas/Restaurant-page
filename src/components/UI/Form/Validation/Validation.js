const Validation = (type, value) => {
  let error = "";

  switch (type) {
    case "name":
    case "surname":
    case "street":
      if (!/^[A-z,\s ]+$/.test(value)) {
        error =
          type.charAt(0).toUpperCase() +
          type.slice(1) +
          " should have only letters";
      }
      if (value.length < 3) {
        error =
          type.charAt(0).toUpperCase() +
          type.slice(1) +
          " should have atleast 3 letters";
      }
      if (value.length === 0) {
        error =
          type.charAt(0).toUpperCase() + type.slice(1) + " can't be empty";
      }
      break;

    case "email":
      if (
        !new RegExp(
          /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        ).test(value)
      ) {
        error = "Enter a valid email address";
      }
      if (value.length === 0) {
        error =
          type.charAt(0).toUpperCase() + type.slice(1) + " can't be empty";
      }

      break;

    case "phoneNumber":
      if (!/^[0-9]+$/.test(value)) {
        error = "Phone number should have only numbers";
      }
      if (value.length !== 9) {
        error = "Enter a valid phone number ";
      }

      break;

    case "apNumber":
      if (!new RegExp(/^\d+[A-z]{0,3}$/).test(value)) {
        error = "Enter a valid apartament number";
      }
      if (value.length === 0) {
        error = "Apartament number can't be empty";
      }

      break;

    default:
      if (value.length === 0) {
        error =
          (type.charAt(0).toUpperCase() + type.slice(1)).replace(
            /[^a-zA-Z]+/g,
            ""
          ) + " can't be empty";
      }
      break;
  }
  return error;
};

export default Validation;
