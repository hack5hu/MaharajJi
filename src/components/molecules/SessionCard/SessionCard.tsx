import React from 'react';
import { Calendar as CalendarIcon, Clock as ClockIcon, Trash2, Eye, User } from 'lucide-react-native';
import { useTheme } from 'styled-components/native';
import { ThemeType } from '@/theme/theme';
import { Typography } from '@/components/atoms/Typography';
import { Box } from '@/components/atoms/Box';
import { scale } from '@/styles/scaling';
import { useLocale } from '@/hooks/useLocale';
import {
  CardContainer,
  CardHeader,
  StatusTag,
  TagText,
  SessionTitle,
  DetailsContainer,
  DetailsRow,
  DetailsLeft,
  DetailsValue,
  CardFooter,
  AuthorContainer,
  AvatarImage,
  AvatarFallback,
  ActionButtons,
  ActionButton,
} from './SessionCard.styles';
import { SessionCardProps } from './types.d';

export const SessionCard = React.memo(({
  title,
  status,
  sessionDate,
  bookingDate,
  bookingStartTime,
  bookingEndTime,
  publishedBy,
  onDeletePress,
  onViewPress,
  onPress,
}: SessionCardProps) => {
  const theme = useTheme() as ThemeType;
  const { t } = useLocale();

  const isPast = status === 'COMPLETED' || status === 'CANCELLED';

  return (
    <CardContainer isPast={isPast} onPress={onPress}>
      <CardHeader>
        <StatusTag status={status}>
          <TagText status={status}>{status}</TagText>
        </StatusTag>
      </CardHeader>

      <SessionTitle>
        <Typography 
          variant="headline_md" 
          color="on_surface" 
          style={{ fontSize: 18, fontWeight: '700', lineHeight: 22 }}
          numberOfLines={2}
        >
          {title}
        </Typography>
      </SessionTitle>

      <DetailsContainer>
        <DetailsRow>
          <DetailsLeft>
            <CalendarIcon color={theme.colors.primary as string} size={scale(16)} />
            <Typography variant="body_sm" color="on_surface_variant" style={{ fontWeight: '500' }}>
              {t('admin.manage_sessions.session_date') || 'Session Date'}:
            </Typography>
          </DetailsLeft>
          <DetailsValue>
            <Typography variant="body_sm" color="on_surface" style={{ fontWeight: '600' }}>
              {sessionDate}
            </Typography>
          </DetailsValue>
        </DetailsRow>
        
        <DetailsRow>
          <DetailsLeft>
            <CalendarIcon color={theme.colors.primary as string} size={scale(16)} />
            <Typography variant="body_sm" color="on_surface_variant" style={{ fontWeight: '500' }}>
              {t('admin.manage_sessions.booking_date') || 'Booking Date'}:
            </Typography>
          </DetailsLeft>
          <DetailsValue>
            <Typography variant="body_sm" color="on_surface" style={{ fontWeight: '600' }}>
              {bookingDate}
            </Typography>
          </DetailsValue>
        </DetailsRow>

        <DetailsRow>
          <DetailsLeft>
            <ClockIcon color={theme.colors.primary as string} size={scale(16)} />
            <Typography variant="body_sm" color="on_surface_variant" style={{ fontWeight: '500' }}>
              {t('admin.manage_sessions.booking_time') || 'Booking Time'}:
            </Typography>
          </DetailsLeft>
          <DetailsValue>
            <Typography variant="body_sm" color="on_surface" style={{ fontWeight: '600' }}>
              {bookingStartTime} - {bookingEndTime}
            </Typography>
          </DetailsValue>
        </DetailsRow>
      </DetailsContainer>

      <CardFooter>
        <AuthorContainer>
          {publishedBy.avatarUrl ? (
            <AvatarImage source={{ uri: publishedBy.avatarUrl }} />
          ) : (
            <AvatarFallback>
              <User color={theme.colors.on_surface_variant as string} size={scale(14)} />
            </AvatarFallback>
          )}
          <Box>
            <Typography variant="label_caps" color="on_surface_variant" style={{ fontSize: 9, lineHeight: 10 }}>
              {t('admin.manage_sessions.published_by')}
            </Typography>
            <Typography variant="body_sm" color="on_surface" style={{ fontWeight: '600', fontSize: 12 }}>
              {publishedBy.name}
            </Typography>
          </Box>
        </AuthorContainer>

        <ActionButtons>
          {status === 'COMPLETED' || status === 'CANCELLED' ? (
            onViewPress && (
              <ActionButton onPress={onViewPress}>
                <Eye color={theme.colors.on_surface_variant as string} size={scale(18)} />
              </ActionButton>
            )
          ) : (
            <>
              {onDeletePress && (
                <ActionButton onPress={onDeletePress} isDestructive>
                  <Trash2 color={theme.colors.error as string} size={scale(18)} />
                </ActionButton>
              )}
            </>
          )}
        </ActionButtons>
      </CardFooter>
    </CardContainer>
  );
});

SessionCard.displayName = 'SessionCard';
