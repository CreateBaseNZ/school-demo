import Image from "next/image";

const WhiteLogo = (props) => {
  return (
    <a
      target="_blank"
      href="https://createbase.co.nz/"
      className={props.className}
    >
      <Image
        src="/header-logo.png"
        width={props.width}
        height={props.height}
        alt="CreateBase"
      />
    </a>
  );
};

export default WhiteLogo;
