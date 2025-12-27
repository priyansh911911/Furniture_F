import { Cloudinary } from '@cloudinary/url-gen';
import { auto } from '@cloudinary/url-gen/actions/resize';
import { autoGravity } from '@cloudinary/url-gen/qualifiers/gravity';
import { AdvancedImage } from '@cloudinary/react';

const cld = new Cloudinary({ cloud: { cloudName: 'da9hvlrl8' } });

const CloudinaryImage = ({ src, alt, width = 300, height = 300, className, style, onClick }) => {
  // Extract public ID from Cloudinary URL
  const getPublicId = (url) => {
    if (!url) return null;
    const match = url.match(/\/v\d+\/(.+)\./);
    return match ? match[1] : url.split('/').pop().split('.')[0];
  };

  const publicId = getPublicId(src);
  
  if (!publicId) {
    return <img src={src} alt={alt} className={className} style={style} onClick={onClick} />;
  }

  const img = cld
    .image(publicId)
    .format('auto')
    .quality('auto')
    .resize(auto().gravity(autoGravity()).width(width).height(height));

  return (
    <AdvancedImage 
      cldImg={img} 
      alt={alt}
      className={className}
      style={style}
      onClick={onClick}
    />
  );
};

export default CloudinaryImage;