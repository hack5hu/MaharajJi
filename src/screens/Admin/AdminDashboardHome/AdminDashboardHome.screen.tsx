import React, { useState } from 'react';
import { useLocale } from '@/hooks/useLocale';
import { AppLayoutTemplate } from '@/components/templates/AppLayoutTemplate';
// import { Button } from '@/components/atoms/Button';
// import { Typography } from '@/components/atoms/Typography';
// import { ProgressBar } from '@/components/atoms/ProgressBar';
// import { BentoStatCard } from '@/components/molecules/BentoStatCard';
import { BookingStatusHero } from '@/components/organisms/BookingStatusHero';
// import { CapacityVisualCard } from '@/components/organisms/CapacityVisualCard';
// import { RecentBookingsTable } from '@/components/organisms/RecentBookingsTable';
import {
  ContentContainer,
  // ButtonSpacer,
  WelcomeContainer,
  WelcomeTitle,
  WelcomeSubtitle,
  InfoCard,
  InfoCardTitle,
  InfoCardBody,
  DevotionalBanner,
  DevotionalText,
  // BentoGridContainer, BentoHalfColumn,
  // BentoFullColumn, ProgressLabelContainer
} from './AdminDashboardHome.styles';

import { useAppNavigation } from '@/navigation/useAppNavigation';
import { verticalScale } from '@/styles/scaling';

export const AdminDashboardHome = React.memo(() => {
  const { t } = useLocale();
  const navigation = useAppNavigation();
  const [activeTab, setActiveTab] = useState<
    'dashboard' | 'bookings' | 'customers' | 'settings'
  >('dashboard');


  const handleTabChange = (tab: any) => {
    setActiveTab(tab);
    if (tab === 'customers') {
      navigation.navigate('ManageUsersAdmin');
    } else if (tab === 'bookings') {
      navigation.navigate('ManageBookings');
    } else if (tab === 'settings') {
      navigation.navigate('AdminSettings');
    }
  };

  return (
    <AppLayoutTemplate
      headerTitle="MaharajJi"
      role="admin"
      activeTab={activeTab}
      onTabChange={handleTabChange}
    >
      <ContentContainer>
        <WelcomeContainer>
          <WelcomeTitle variant="headline_lg" color="on_surface">
            {t('admin.dashboard_home.welcome_admin')}
          </WelcomeTitle>
          <WelcomeSubtitle variant="body_lg">
            {t('admin.dashboard_home.dashboard_desc')}
          </WelcomeSubtitle>
        </WelcomeContainer>

        <BookingStatusHero style={{ marginBottom: verticalScale(24) }} />

        <InfoCard>
          <InfoCardTitle variant="headline_md" color="on_surface">
            {t('admin.dashboard_home.info_card_title')}
          </InfoCardTitle>
          <InfoCardBody variant="body_sm">
            {t('admin.dashboard_home.info_card_body')}
          </InfoCardBody>
        </InfoCard>

        <DevotionalBanner>
          <DevotionalText variant="body_lg" color="on_primary_container">
            {t('admin.dashboard_home.devotional_quote')}
          </DevotionalText>
        </DevotionalBanner>

        {/* Stats Overview Bento Grid */}
        {/* <BentoGridContainer>
          <BentoHalfColumn>
            <BentoStatCard 
              title={t('admin.dashboard_home.total_customers')} 
              value="1,284" 
              subtitle="+12 this week"
              icon="groups" 
            />
          </BentoHalfColumn>
          <BentoHalfColumn>
            <BentoStatCard 
              title={t('admin.dashboard_home.total_bookings')} 
              value="842" 
              subtitle="Last 30 days"
              icon="event_available" 
              iconColor="secondary"
            />
          </BentoHalfColumn>
          <BentoFullColumn>
            <BentoStatCard 
              title={t('admin.dashboard_home.remaining_capacity')} 
              value="150" 
              icon="event_busy" 
              iconColor="error"
            >
              <ProgressLabelContainer>
                <Typography variant="label_caps" color="on_surface_variant">
                  350 {t('admin.dashboard_home.booked_label')}
                </Typography>
                <Typography variant="label_caps" color="on_surface_variant">
                  500 {t('admin.dashboard_home.total_label')}
                </Typography>
              </ProgressLabelContainer>
              <ProgressBar progress={0.7} color="primary_container" trackColor="surface_variant" />
            </BentoStatCard>
          </BentoFullColumn>
        </BentoGridContainer> */}

        {/* Capacity Analysis Visual */}
        {/* <CapacityVisualCard style={{ marginBottom: verticalScale(32) }} /> */}

        {/* Recent Activity Table */}
        {/* <RecentBookingsTable style={{ marginBottom: verticalScale(32) }} /> */}
      </ContentContainer>
    </AppLayoutTemplate>
  );
});

AdminDashboardHome.displayName = 'AdminDashboardHome';
