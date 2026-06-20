import React from 'react';
import { UploadCloud } from 'lucide-react-native';
import { useTheme } from 'styled-components/native';
import { Typography } from '@/components/atoms/Typography';
import { ThemeType } from '@/theme/theme';
import { moderateScale } from '@/styles/scaling';
import { UploadContainer, IconWrapper, ImagePreview, EditOverlay } from './ImageUploaderPlaceholder.styles';

export interface ImageUploaderPlaceholderProps {
  onPress?: () => void;
  imageUri?: string;
}

export const ImageUploaderPlaceholder = React.memo(({ onPress, imageUri }: ImageUploaderPlaceholderProps) => {
  const theme = useTheme() as ThemeType;

  return (
    <UploadContainer onPress={onPress} activeOpacity={0.7}>
      {imageUri ? (
        <>
          <ImagePreview source={{ uri: imageUri }} resizeMode="cover" />
          <EditOverlay>
            <UploadCloud color="#ffffff" size={moderateScale(16)} />
          </EditOverlay>
        </>
      ) : (
        <>
          <IconWrapper>
            <UploadCloud color={theme.colors.on_primary_container as string} size={moderateScale(24)} />
          </IconWrapper>
          <Typography variant="body_lg" color="on_surface" style={{ fontWeight: '600' }}>
            Upload Cover Image
          </Typography>
          <Typography variant="body_sm" color="on_surface_variant" style={{ marginTop: 4 }}>
            PNG, JPG up to 2MB
          </Typography>
        </>
      )}
    </UploadContainer>
  );
});

ImageUploaderPlaceholder.displayName = 'ImageUploaderPlaceholder';
