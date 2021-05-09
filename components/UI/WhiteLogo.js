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
        alt="CreateBase"
        layout={props.layout}
        objectFit={props.objectFit}
        width={props.width}
        height={props.height}
        quality={props.quality}
      />
    </a>
  );
};

export default WhiteLogo;
