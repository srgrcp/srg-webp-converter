import NextImage, { ImageProps } from "next/image";

const customLoader = ({ src }) => {
  return src
}

/**
 * @todo Fix the issue with the image not being properly displayed
 */
export default function Image(props: ImageProps) {
  return (
    <NextImage
      {...props}
      loader={customLoader}
      layout="fill"
    />
  );
}
