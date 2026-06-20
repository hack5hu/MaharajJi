import React, { useState } from 'react';
import { useLocale } from '@/hooks/useLocale';
import { AdminDashboardHomeTemplate } from '@/components/templates/AdminDashboardHomeTemplate';
import { Typography } from '@/components/atoms/Typography';
import { ProgressBar } from '@/components/atoms/ProgressBar';
import { BentoStatCard } from '@/components/molecules/BentoStatCard';
import { BookingStatusHero } from '@/components/organisms/BookingStatusHero';
import { CapacityVisualCard } from '@/components/organisms/CapacityVisualCard';
import { RecentBookingsTable } from '@/components/organisms/RecentBookingsTable';
import { verticalScale } from '@/styles/scaling';
import { 
  ContentContainer, BentoGridContainer, BentoHalfColumn, 
  BentoFullColumn, ProgressLabelContainer 
} from './AdminDashboardHome.styles';

import { useAppNavigation } from '@/navigation/useAppNavigation';

export const AdminDashboardHome = React.memo(() => {
  const { t } = useLocale();
  const navigation = useAppNavigation();
  const [activeTab, setActiveTab] = useState<'dashboard' | 'bookings' | 'customers' | 'settings'>('dashboard');

  const handleMenuPress = () => {};
  const handleTabChange = (tab: any) => {
    setActiveTab(tab);
    if (tab === 'customers') {
      navigation.navigate('ManageUsersAdmin');
    } else if (tab === 'bookings') {
      navigation.navigate('ManageBookings');
    }
  };

  return (
    <AdminDashboardHomeTemplate
      headerTitle="Sacred Spaces"
      avatarUrl="https://lh3.googleusercontent.com/aida-public/AB6AXuAvrKMK8ktzwlTbPhF8JxOFOUmTEOBpVoIt3kRKpL13cQqEYQHqgxx4Pf28iqQtNf6naYI3E_Vp5f0f0cpXeAKkgSaOh5JDFrJbCb1_rj7M8M-e9sCNrDFcjCGtUWugoaWKFVl4qztRbHKm9DnZD8cdfQ-8mTXllDQRO9uZQP5Dgxp48KiXXHH54fRW-xWVRSwzqMhgJzE7yFkHD9pPKJlpR8O2GiHSZqoLzxxYzby7iHSiThVn1T2hbP3MghyY3bh80oEmekBZ0lk"
      onMenuPress={handleMenuPress}
      activeTab={activeTab}
      onTabChange={handleTabChange}
    >
      <ContentContainer>
        
        {/* Status Toggle & Quick Actions Hero */}
        <BookingStatusHero style={{ marginBottom: verticalScale(24) }} />

        {/* Stats Overview Bento Grid */}
        <BentoGridContainer>
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
        </BentoGridContainer>

        {/* Capacity Analysis Visual */}
        <CapacityVisualCard style={{ marginBottom: verticalScale(32) }} />

        {/* Recent Activity Table */}
        <RecentBookingsTable style={{ marginBottom: verticalScale(32) }} />

      </ContentContainer>
    </AdminDashboardHomeTemplate>
  );
});

AdminDashboardHome.displayName = 'AdminDashboardHome';
