const StepCard = (props) => {
  return (
    <div
      className={props.className}
      onClick={props.onClick} // TODO: change to 1
    >
      <h2>{props.step}</h2>
      <p>{props.description}</p>
      <h3>{props.step}</h3>
    </div>
  );
};

export default StepCard;
