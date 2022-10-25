export default function showErrors(requestErrors) {
  let errors = "";
  requestErrors.forEach((err, index) => {
    errors += err;
    index !== requestErrors.length - 1 && (errors += ", ");
  });
  alert(errors);
}
