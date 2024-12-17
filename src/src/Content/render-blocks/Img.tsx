import Image from "next/image";

export const Img = (props: any) => {
  return (
    <p>
      <figure>
        <Image
          {...props}
          alt={props.alt ? props.alt : ""}
          width={500}
          height={500}
          className="w-full mb-4 inline-block"
        />
        {props.alt && <figcaption>{props.alt}?</figcaption>}
      </figure>
    </p>
  );
};
