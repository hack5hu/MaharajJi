import React, { useMemo, useCallback } from 'react';
import { ActivityIndicator } from 'react-native';
import { FlashList, ListRenderItem } from '@shopify/flash-list';
import { Calendar, Search } from 'lucide-react-native';
import { useTheme } from 'styled-components/native';
import { ThemeType } from '@/theme/theme';
import { scale, verticalScale } from '@/styles/scaling';
import { useLocale } from '@/hooks/useLocale';
import { Typography } from '@/components/atoms/Typography';
import { AdminHeader } from '@/components/organisms/AdminHeader';
import { CustomerBooking } from '@/serviceManager/types.d';
import { SessionAttendeesListTemplateProps } from './types.d';
import { AttendeeCard } from '@/components/molecules/AttendeeCard';
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
  SearchInput,
  ListHeader,
  ListContainer,
  EmptyContainer,
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

  const renderItem: ListRenderItem<CustomerBooking> = useCallback(({ item }) => {
    return (
      <AttendeeCard
        customerName={item.customerName}
        customerPhone={item.customerPhone}
        status={item.status}
        numberOfPeople={item.numberOfPeople}
        bookingId={item.id}
        onPress={onAttendeePress ? () => onAttendeePress(item) : undefined}
      />
    );
  }, [onAttendeePress]);

  return (
    <ScreenContainer>
      <AdminHeader
        title={t('admin.session_attendees.title')}
        avatarUrl=""
        onMenuPress={() => {}}
        onBackPress={onBackPress}
        showBackButton
      />

      <MainContent>
        <SummaryCard>
          <SummaryHeader>
            <SessionInfo>
              <Typography variant="headline_md" color="on_surface">
                {sessionTitle}
              </Typography>
              <DateRow>
                <Calendar color={theme.colors.on_surface_variant as string} size={scale(18)} />
                <Typography variant="body_sm" color="on_surface_variant">
                  {sessionDate || t('common.all_day')} • {location}
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
          <SearchInput
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
          <ListContainer>
            <FlashList
              data={attendees}
              renderItem={renderItem}
              // @ts-expect-error estimatedItemSize is required but TS definition fails
              estimatedItemSize={scale(80)}
              showsVerticalScrollIndicator={false}
              contentContainerStyle={{ paddingBottom: verticalScale(40) }}
              ListEmptyComponent={
                <EmptyContainer>
                  <Typography variant="body_lg" color="on_surface_variant">
                    {t('admin.session_attendees.no_results')}
                  </Typography>
                </EmptyContainer>
              }
            />
          </ListContainer>
        )}
      </MainContent>
    </ScreenContainer>
  );
});

SessionAttendeesListTemplate.displayName = 'SessionAttendeesListTemplate';
