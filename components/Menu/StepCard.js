import Image from "next/image";

const StepCard = (props) => {
  return (
    <div className={props.className} onClick={props.onClick}>
      <Image
        src={props.img.src}
        alt={props.img.alt}
        layout="fill"
        objectFit="cover"
      />
      <h2>{props.step}</h2>
      <p>{props.description}</p>
      <h3>{props.step}</h3>
    </div>
  );
};

export default StepCard;
