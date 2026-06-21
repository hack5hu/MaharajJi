import React, { useMemo } from 'react';
import { ActivityIndicator, TextInput } from 'react-native';
import { FlashList, ListRenderItem } from '@shopify/flash-list';
import { Calendar, Search } from 'lucide-react-native';
import { useTheme } from 'styled-components/native';
import { ThemeType } from '@/theme/theme';
import { scale, verticalScale } from '@/styles/scaling';
import { useLocale } from '@/hooks/useLocale';
import { Typography } from '@/components/atoms/Typography';
import { Box } from '@/components/atoms/Box';
import { AdminHeader } from '@/components/organisms/AdminHeader';
import { CustomerBooking } from '@/serviceManager/types.d';
import { SessionAttendeesListTemplateProps } from './types.d';
import {
  ScreenContainer,
  MainContent,
  SummaryCard,
  SummaryHeader,
  SessionInfo,
  DateRow,
  FilledBadge,
  ProgressBarContainer,
  ProgressFill,
  SearchContainer,
  ListHeader,
  AttendeeCardContainer,
  AttendeeInfo,
  AvatarInitials,
  AttendeeDetails,
  AttendeeStatus,
  LoaderContainer,
} from './SessionAttendeesListTemplate.styles';

export const SessionAttendeesListTemplate = React.memo(({
  sessionTitle,
  sessionDate,
  location,
  filledCount,
  totalTokens,
  searchQuery,
  onSearchChange,
  attendees,
  onBackPress,
  onAttendeePress,
  isLoading,
  totalBookings,
}: SessionAttendeesListTemplateProps) => {
  const theme = useTheme() as ThemeType;
  const { t } = useLocale();

  const progressPercent = useMemo(() => {
    if (totalTokens === 0) return 0;
    return Math.min(100, Math.max(0, (filledCount / totalTokens) * 100));
  }, [filledCount, totalTokens]);

  const renderItem: ListRenderItem<CustomerBooking> = ({ item }) => {
    // Generate initials from name
    const initials = item.customerName
      .split(' ')
      .map(n => n[0])
      .join('')
      .substring(0, 2)
      .toUpperCase() || '?';

    // Pick a consistent color based on char code
    const colors = [
      theme.colors.secondary_container,
      theme.colors.primary_fixed_dim,
      theme.colors.tertiary_container,
      '#e0e0ff',
      '#ffdcc2'
    ];
    const colorIndex = (item.customerName.charCodeAt(0) || 0) % colors.length;
    const bgColor = colors[colorIndex] as string;

    // Use specific colors for initials text based on background to ensure contrast
    // In a real app we might have a map, but using dark colors generally works for these light bgs
    const textColor = theme.colors.on_surface;

    const isWaitlisted = item.status.toUpperCase() === 'WAITLISTED';

    return (
      <AttendeeCardContainer 
        // onPress={() => onAttendeePress?.(item)}
        style={{ opacity: isWaitlisted ? 0.75 : 1 }}
      >
        <AttendeeInfo>
          <AvatarInitials bgColor={bgColor}>
            <Typography variant="headline_md" style={{ color: textColor, fontWeight: '700' }}>
              {initials}
            </Typography>
          </AvatarInitials>
          <AttendeeDetails>
            <Typography variant="headline_md" color="on_surface" style={{ fontSize: scale(18) }}>
              {item.customerName}
            </Typography>
            <Typography variant="body_sm" color="on_surface_variant">
              {item.customerPhone}
            </Typography>
          </AttendeeDetails>
        </AttendeeInfo>
        <AttendeeStatus>
          <Typography 
            variant="status_label" 
            color={isWaitlisted ? 'on_surface_variant' : 'primary'}
          >
            {item.numberOfPeople === 1 
              ? t('admin.session_attendees.person', { count: 1 }) 
              : t('admin.session_attendees.people', { count: item.numberOfPeople })}
          </Typography>
          <Typography variant="label_caps" color="on_surface_variant" style={{ marginTop: verticalScale(4) }}>
            #{item.id.substring(0, 8).toUpperCase()}
          </Typography>
        </AttendeeStatus>
      </AttendeeCardContainer>
    );
  };

  return (
    <ScreenContainer>
      <AdminHeader
        title={t('admin.session_attendees.title')}
        avatarUrl="https://lh3.googleusercontent.com/aida-public/AB6AXuBLzsHx0kKCc1fbYpz-XOKP7MV-AvwrWT8p5doJSqb8EMHe9AWwOCyn_qWL8ZyPCMuHKZtwAbpjcAblGJPsNvrxiOAJi4BLdxFkcfSeK0iph_KDcaUdt6-9U1FQfvHEAPIufQjuRCGq6lQ_9cETsJXS_7m-JuJ7jiFwJXTJ71A7wpzU3Ei5ik-Jeo7cbfvCCfN_pjzs5jBZzyP8aPZ2FJizF7SdVZ6XZUcESFEmZwcPVORD8LKN4l0b_ul1iS_PNxQGCscDyZpWn28"
        onMenuPress={onBackPress}
        showBackButton
      />

      <MainContent>
        <SummaryCard>
          <SummaryHeader>
            <SessionInfo>
              <Typography variant="headline_md" color="on_surface" style={{ marginBottom: verticalScale(4) }}>
                {sessionTitle}
              </Typography>
              <DateRow>
                <Calendar color={theme.colors.on_surface_variant as string} size={scale(18)} />
                <Typography variant="body_sm" color="on_surface_variant">
                  {sessionDate} • {location}
                </Typography>
              </DateRow>
            </SessionInfo>
            <FilledBadge>
              <Typography variant="status_label" color="on_primary_container">
                {t('admin.session_attendees.filled', { filled: filledCount, total: totalTokens })}
              </Typography>
            </FilledBadge>
          </SummaryHeader>

          <ProgressBarContainer>
            <ProgressFill widthPercent={progressPercent} />
          </ProgressBarContainer>
        </SummaryCard>

        <SearchContainer>
          <Search color={theme.colors.on_surface_variant as string} size={scale(20)} />
          <TextInput
            style={{
              flex: 1,
              marginLeft: scale(12),
              fontFamily: 'Inter',
              fontSize: scale(16),
              color: theme.colors.on_surface as string,
              paddingVertical: verticalScale(8),
            }}
            placeholder={t('admin.session_attendees.search_placeholder')}
            placeholderTextColor={theme.colors.on_surface_variant as string}
            value={searchQuery}
            onChangeText={onSearchChange}
          />
        </SearchContainer>

        <ListHeader>
          <Typography variant="label_caps" color="on_surface_variant">
            {t('admin.session_attendees.attendee_list', { count: totalBookings })}
          </Typography>
        </ListHeader>

        {isLoading ? (
          <LoaderContainer>
            <ActivityIndicator size="large" color={theme.colors.primary as string} />
          </LoaderContainer>
        ) : (
          <Box style={{ flex: 1 }}>
            <FlashList
              data={attendees}
              renderItem={renderItem}
              estimatedItemSize={scale(80)}
              showsVerticalScrollIndicator={false}
              contentContainerStyle={{ paddingBottom: verticalScale(40) }}
              ListEmptyComponent={
                <Box style={{ padding: scale(24), alignItems: 'center' }}>
                  <Typography variant="body_lg" color="on_surface_variant">
                    {t('admin.session_attendees.no_results')}
                  </Typography>
                </Box>
              }
            />
          </Box>
        )}
      </MainContent>
    </ScreenContainer>
  );
});

SessionAttendeesListTemplate.displayName = 'SessionAttendeesListTemplate';
