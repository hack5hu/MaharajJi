import React from 'react';
import { useTheme } from 'styled-components/native';
import { Sparkles, Music, Flame, BookOpen, Filter, History as HistoryIcon } from 'lucide-react-native';
import { ThemeType } from '@/theme/theme';
import { scale } from '@/styles/scaling';
import { useLocale } from '@/hooks/useLocale';
import { Typography } from '@/components/atoms/Typography';
import { HistoryTemplate } from '@/components/templates/HistoryTemplate';
import { useHistory } from './useHistory';
import { BookingStatus } from '@/constants/enums';
import {
  ScreenContainer,
  SectionContainer,
  HeaderLabelContainer,
  FilterButton,
  HistoryList,
  HistoryCard,
  HistoryLeft,
  HistoryIconContainer,
  HistoryTextInfo,
  HistoryBadge,
  LoadMoreBtn,
} from './History.styles';

export const History = React.memo(() => {
  const theme = useTheme() as ThemeType;
  const { t } = useLocale();

  const {
    pastBookings,
    handleFilterPress,
    handleLoadMore,
    handleMenuPress,
    handleTabChange,
  } = useHistory();

  const getCategoryIcon = (category: string, color: string, size: number) => {
    switch (category) {
      case 'self_improvement': return <Sparkles color={color} size={size} />;
      case 'spa': return <Music color={color} size={size} />;
      case 'church': return <Flame color={color} size={size} />;
      case 'temple_hindu': return <BookOpen color={color} size={size} />;
      default: return <Sparkles color={color} size={size} />;
    }
  };

  return (
    <ScreenContainer>
      <HistoryTemplate
        headerTitle="Sacred Spaces"
        avatarUrl="https://lh3.googleusercontent.com/aida-public/AB6AXuB3Zgwf2YtZKTGT-ftE3Y8GCAzU-nxvKaWAyEqKxcIzAxcdA-qebz1eIqbuscjt-SeC5H5vKCmNnQtdFdTorLCQpEq-ygKuOFSsIPc7UYRUCeXUVvyd2DRRZLn-w5nyM9tCZqX5d4Y0ooDR6bM4jkHn4uzL6XCp_Utggmb1YR4nhKna8ckn5hukC46LjZgGZkkRmuPmqXSaRP1ri7DTcURSLXHlRlDMzz1YGGcCF2yWUSwhegWo8xgBUgprZf-yE16mzQ72aNF5B6g"
        onMenuPress={handleMenuPress}
        activeTab="history"
        onTabChange={handleTabChange}
      >
        <SectionContainer>
          <HeaderLabelContainer>
            <Typography variant="headline_md" color="on_surface" style={{ fontWeight: '700' }}>
              {t('user.my_bookings.past_bookings')}
            </Typography>
            <FilterButton onPress={handleFilterPress}>
              <Typography variant="body_sm" color="primary" style={{ fontWeight: '600' }}>
                {t('user.my_bookings.filter')}
              </Typography>
              <Filter color={theme.colors.primary as string} size={scale(16)} />
            </FilterButton>
          </HeaderLabelContainer>

          <HistoryList>
            {pastBookings.map((item) => {
              const isCompleted = item.status === BookingStatus.COMPLETED;
              const statusColor = isCompleted ? theme.colors.on_surface_variant : theme.colors.error;
              const badgeLabel = isCompleted
                ? t('user.my_bookings.status_completed')
                : t('user.my_bookings.status_cancelled');

              return (
                <HistoryCard key={item.id}>
                  <HistoryLeft>
                    <HistoryIconContainer>
                      {getCategoryIcon(item.category, theme.colors.primary as string, scale(20))}
                    </HistoryIconContainer>
                    <HistoryTextInfo>
                      <Typography variant="body_lg" color="on_surface" style={{ fontWeight: '600' }}>
                        {item.title}
                      </Typography>
                      <Typography variant="body_sm" color="on_surface_variant">
                        {item.date}
                      </Typography>
                    </HistoryTextInfo>
                  </HistoryLeft>
                  <HistoryBadge isCompleted={isCompleted}>
                    <Typography variant="label_caps" style={{ color: statusColor, fontWeight: '700', textTransform: 'none' }}>
                      {badgeLabel}
                    </Typography>
                  </HistoryBadge>
                </HistoryCard>
              );
            })}
          </HistoryList>

          <LoadMoreBtn onPress={handleLoadMore}>
            <HistoryIcon color={theme.colors.outline as string} size={scale(18)} />
            <Typography variant="label_caps" color="outline" style={{ fontWeight: '700' }}>
              {t('user.my_bookings.load_more')}
            </Typography>
          </LoadMoreBtn>
        </SectionContainer>
      </HistoryTemplate>
    </ScreenContainer>
  );
});

History.displayName = 'History';
