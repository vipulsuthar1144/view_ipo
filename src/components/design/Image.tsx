import { Box, SxProps, Theme } from "@mui/material";
import { useState } from "react";

export interface IGlobalImageProps {
  img?: string;
  alt: string;
  errorImage?: string;
  style?: SxProps<Theme>;
  isPreventClickEffect?: boolean;
  onClick?: (e: any) => void;
}

const ImageComp = ({
  img,
  alt,
  style,
  onClick,
  isPreventClickEffect = false,
}: IGlobalImageProps) => {
  return (
    <>
      <Box
        onClick={onClick}
        onMouseDown={(event) => isPreventClickEffect && event.stopPropagation()}
        component="img"
        src={img}
        alt={alt}
        // loading="lazy"
        sx={{
          width: "30%",
          maxWidth: "100%",
          height: "auto",
          boxSizing: "border-box",
          objectFit: "fill",
          userSelect: "none",
          ...style,
        }}
      />
    </>
  );
};

export default ImageComp;

const ImageCompWithLoader = ({
  img,
  alt,
  style,
  onClick,
  errorImage,
  isPreventClickEffect = false,
}: IGlobalImageProps) => {
  const [imgSrc, setImgSrc] = useState(img ? img : errorImage);
  const [isLoading, setIsLoading] = useState(img ? true : false);
  return (
    <Box
      sx={{
        width: "30%",
        height: "auto",
        overflow: "hidden",
        boxSizing: "border-box",
        ...style,
        // backgroundColor: "#ffffff",
        // backgroundColor: "red",
      }}
    >
      <Box
        onClick={onClick}
        onMouseDown={(event) => isPreventClickEffect && event.stopPropagation()}
        component="img"
        src={imgSrc}
        alt={alt}
        onLoad={() => {
          setIsLoading(false);
        }}
        onError={() => {
          setImgSrc(errorImage);
          setIsLoading(false);
        }}
        loading="lazy"
        sx={{
          width: "100%",
          height: "100%",
          objectFit: "contain",
          cursor: "pointer",
          opacity: isLoading ? 0 : 1,
          userSelect: "none",
          // ...style,
        }}
      />
    </Box>
  );
};

export { ImageCompWithLoader };
