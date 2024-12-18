import IMAGES from "src/constants/images";

interface ImageFallbackProps extends React.AllHTMLAttributes<HTMLImageElement> {
  fallbackSrc?: string;
}

const ImageFallback: React.FC<ImageFallbackProps> = (props) => {
  const { fallbackSrc, onError, ...restProps } = props;
  const handleError = (e: React.SyntheticEvent<HTMLImageElement>) => {
    onError && onError(e);
    e.currentTarget.onerror = null;
    e.currentTarget.src = fallbackSrc || IMAGES.default_thumbnail;
  };

  return <img onError={handleError} {...restProps} />;
};

export default ImageFallback;
