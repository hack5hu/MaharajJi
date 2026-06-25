import React, { useState } from 'react';
import { useTheme } from 'styled-components/native';
import { ThemeType } from '@/theme/theme';
import { useLocale } from '@/hooks/useLocale';
import { Typography } from '@/components/atoms/Typography';
import { Button } from '@/components/atoms/Button';
import { AdminSettingsTemplate } from '@/components/templates/AdminSettingsTemplate';
import { ConfirmationModal } from '@/components/organisms/ConfirmationModal';
import { useAdminSettings } from './useAdminSettings';
import { verticalScale } from '@/styles/scaling';
import {
  ScreenContainer,
  ProfileHeaderContainer,
  AvatarWrapper,
  ProfileAvatar,
  ProfileCard,
  InfoItem,
  Divider,
  ButtonWrapper,
} from './AdminSettings.styles';

export const AdminSettings = React.memo(() => {
  const theme = useTheme() as ThemeType;
  const { t } = useLocale();
  const [showLogoutModal, setShowLogoutModal] = useState(false);

  const {
    profile,
    handleLogout,
    handleTabChange,
    handleMenuPress,
  } = useAdminSettings();

  const avatarUrl = 'https://lh3.googleusercontent.com/aida-public/AB6AXuAvrKMK8ktzwlTbPhF8JxOFOUmTEOBpVoIt3kRKpL13cQqEYQHqgxx4Pf28iqQtNf6naYI3E_Vp5f0f0cpXeAKkgSaOh5JDFrJbCb1_rj7M8M-e9sCNrDFcjCGtUWugoaWKFVl4qztRbHKm9DnZD8cdfQ-8mTXllDQRO9uZQP5Dgxp48KiXXHH54fRW-xWVRSwzqMhgJzE7yFkHD9pPKJlpR8O2GiHSZqoLzxxYzby7iHSiThVn1T2hbP3MghyY3bh80oEmekBZ0lk';

  return (
    <ScreenContainer>
      <AdminSettingsTemplate
        headerTitle={t('user.profile.title')}
        
        onMenuPress={handleMenuPress}
        activeTab="settings"
        onTabChange={handleTabChange}
      >
        <ProfileHeaderContainer>
          <AvatarWrapper>
            <ProfileAvatar source={{ uri: avatarUrl }} />
          </AvatarWrapper>
          <Typography variant="headline_md" color="on_surface" style={{ fontWeight: '700', textAlign: 'center' }}>
            {profile.name}
          </Typography>
          <Typography variant="body_sm" color="on_surface_variant" style={{ textAlign: 'center' }}>
            {profile.role === 'SUPER_ADMIN' ? 'Super Administrator' : 'Administrator'}
          </Typography>
        </ProfileHeaderContainer>

        <ProfileCard>
          <InfoItem>
            <Typography variant="label_caps" color="on_surface_variant" style={{ fontWeight: '700' }}>
              {t('user.profile.name_label')}
            </Typography>
            <Typography variant="body_lg" color="on_surface" style={{ fontWeight: '600' }}>
              {profile.name}
            </Typography>
          </InfoItem>

          <Divider />

          <InfoItem>
            <Typography variant="label_caps" color="on_surface_variant" style={{ fontWeight: '700' }}>
              {t('user.login.phone_label')}
            </Typography>
            <Typography variant="body_lg" color="on_surface" style={{ fontWeight: '600' }}>
              {profile.phone ? `+91 ${profile.phone}` : '-'}
            </Typography>
          </InfoItem>

          <Divider />

          <InfoItem>
            <Typography variant="label_caps" color="on_surface_variant" style={{ fontWeight: '700' }}>
              Role
            </Typography>
            <Typography variant="body_lg" color="primary" style={{ fontWeight: '700' }}>
              {profile.role}
            </Typography>
          </InfoItem>
        </ProfileCard>

        <ButtonWrapper>
          <Button
            label={t('user.profile.logout_btn')}
            onPress={() => setShowLogoutModal(true)}
            variant="primary"
            fullWidth
            style={{
              backgroundColor: theme.colors.error,
              borderRadius: theme.rounded.lg,
              paddingVertical: verticalScale(14),
            }}
          />
        </ButtonWrapper>
        
        <ConfirmationModal
          visible={showLogoutModal}
          title="Logout"
          message="Are you sure you want to log out?"
          confirmLabel={t('user.profile.logout_btn')}
          cancelLabel={t('common.cancel')}
          onConfirm={() => {
            setShowLogoutModal(false);
            handleLogout();
          }}
          onDismiss={() => setShowLogoutModal(false)}
        />
      </AdminSettingsTemplate>
    </ScreenContainer>
  );
});

AdminSettings.displayName = 'AdminSettings';
