import React from 'react';
import { Calendar as CalendarIcon, Clock as ClockIcon, Pencil, Trash2, Eye, User, MoreVertical } from 'lucide-react-native';
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
  Divider,
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
  date,
  time,
  publishedBy,
  onEditPress,
  onDeletePress,
  onViewPress,
}: SessionCardProps) => {
  const theme = useTheme() as ThemeType;
  const { t } = useLocale();

  const isPast = status === 'past';

  return (
    <CardContainer isPast={isPast}>
      <CardHeader>
        <StatusTag status={status}>
          <TagText status={status}>{status}</TagText>
        </StatusTag>
        <ActionButton style={{ borderWidth: 0, width: scale(24), height: scale(24) }}>
          <MoreVertical color={theme.colors.on_surface_variant as string} size={scale(18)} />
        </ActionButton>
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
        <Box style={{ flexDirection: 'row', alignItems: 'center', gap: scale(4) }}>
          <CalendarIcon color={theme.colors.on_surface_variant as string} size={scale(16)} />
          <Typography variant="body_sm" color="on_surface_variant">
            {date}
          </Typography>
        </Box>
        <Divider />
        <Box style={{ flexDirection: 'row', alignItems: 'center', gap: scale(4) }}>
          <ClockIcon color={theme.colors.on_surface_variant as string} size={scale(16)} />
          <Typography variant="body_sm" color="on_surface_variant">
            {time}
          </Typography>
        </Box>
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
          {status === 'past' ? (
            onViewPress && (
              <ActionButton onPress={onViewPress}>
                <Eye color={theme.colors.on_surface_variant as string} size={scale(18)} />
              </ActionButton>
            )
          ) : (
            <>
              {onEditPress && (
                <ActionButton onPress={onEditPress}>
                  <Pencil color={theme.colors.on_surface_variant as string} size={scale(18)} />
                </ActionButton>
              )}
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
