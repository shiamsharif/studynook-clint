import Image, { type ImageProps } from "next/image";

export function SafeImage(props: Omit<ImageProps, "loader" | "unoptimized" | "alt"> & { alt: string }) {
  // eslint-disable-next-line jsx-a11y/alt-text -- alt is required by this component's public type and forwarded.
  return <Image {...props} unoptimized />;
}
