import React, { memo } from 'react';
import { Typography } from 'atoms/Typography';
import { useTheme } from 'styled-components/native';
import {
  NotificationContainer,
  IconContainer,
  ContentContainer,
  CloseButton,
} from './Notification.styles';
import { NotificationProps } from './types.d';
import { moderateScale } from '@/styles/scaling';
import { NotificationType } from '@/constants/enums';
import { ThemeType } from '@/theme/theme';

// Inline SVG-safe icon rendering via Unicode / text fallback
const getIconMeta = (
  type: NotificationType,
  theme: ThemeType,
): { symbol: string; color: string } => {
  switch (type) {
    case NotificationType.SUCCESS:
      return { symbol: '✓', color: theme.colors.primary };
    case NotificationType.ERROR:
      return { symbol: '✕', color: theme.colors.error };
    case NotificationType.WARNING:
      return { symbol: '⚠', color: '#FFAB00' };
    case NotificationType.INFO:
    default:
      return { symbol: 'ℹ', color: theme.colors.secondary };
  }
};

export const Notification: React.FC<NotificationProps> = memo(
  ({ type = NotificationType.INFO, text1, text2, onHide }) => {
    const theme = useTheme() as ThemeType;
    const iconMeta = getIconMeta(type, theme);

    return (
      <NotificationContainer type={type}>
        <IconContainer>
          <Typography
            variant="headline_md"
            style={{ color: iconMeta.color, fontSize: moderateScale(20) }}
          >
            {iconMeta.symbol}
          </Typography>
        </IconContainer>
        <ContentContainer>
          {text1 && (
            <Typography variant="body_lg" color="on_surface">
              {text1}
            </Typography>
          )}
          {text2 && (
            <Typography variant="body_sm" color="on_surface_variant">
              {text2}
            </Typography>
          )}
        </ContentContainer>
        {onHide && (
          <CloseButton onPress={onHide} hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}>
            <Typography
              variant="body_lg"
              style={{ color: theme.colors.on_surface_variant, fontSize: moderateScale(16) }}
            >
              ✕
            </Typography>
          </CloseButton>
        )}
      </NotificationContainer>
    );
  },
);

Notification.displayName = 'Notification';
