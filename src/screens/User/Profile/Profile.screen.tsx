import React from 'react';
import { useTheme } from 'styled-components/native';
import { ThemeType } from '@/theme/theme';
import { useLocale } from '@/hooks/useLocale';
import { Typography } from '@/components/atoms/Typography';
import { Button } from '@/components/atoms/Button';
import { Box } from '@/components/atoms/Box';
import { AppLayoutTemplate } from '@/components/templates/AppLayoutTemplate';
import { ConfirmationModal } from '@/components/organisms/ConfirmationModal';
import { useProfile } from './useProfile';
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
} from './Profile.styles';

export const Profile = React.memo(() => {
  const theme = useTheme() as ThemeType;
  const { t } = useLocale();

  const {
    profile,
    handleLogout,
    handleDeleteAccount,
    showDeleteModal,
    setShowDeleteModal,
    isDeleting,
    apiError,
    handleTabChange,
  } = useProfile();

  const avatarUrl = 'https://lh3.googleusercontent.com/aida-public/AB6AXuB3Zgwf2YtZKTGT-ftE3Y8GCAzU-nxvKaWAyEqKxcIzAxcdA-qebz1eIqbuscjt-SeC5H5vKCmNnQtdFdTorLCQpEq-ygKuOFSsIPc7UYRUCeXUVvyd2DRRZLn-w5nyM9tCZqX5d4Y0ooDR6bM4jkHn4uzL6XCp_Utggmb1YR4nhKna8ckn5hukC46LjZgGZkkRmuPmqXSaRP1ri7DTcURSLXHlRlDMzz1YGGcCF2yWUSwhegWo8xgBUgprZf-yE16mzQ72aNF5B6g';

  return (
    <ScreenContainer>
      <AppLayoutTemplate
        headerTitle={t('common.app_name')}
        role="user"
        activeTab="profile"
        onTabChange={handleTabChange}
      >
        {apiError && (
          <Box style={{ backgroundColor: '#FEE2E2', padding: 12, borderRadius: 8, marginBottom: 16 }}>
            <Typography variant="body_sm" style={{ color: '#DC2626', fontWeight: '600' }}>
              {apiError}
            </Typography>
          </Box>
        )}

        <ProfileHeaderContainer>
          <AvatarWrapper>
            <ProfileAvatar source={{ uri: avatarUrl }} />
          </AvatarWrapper>
          <Typography variant="headline_md" color="on_surface" style={{ fontWeight: '700', textAlign: 'center' }}>
            {profile.name}
          </Typography>
          <Typography variant="body_sm" color="on_surface_variant" style={{ textAlign: 'center' }}>
            {t('user.profile.member_since')}
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
              {t('user.profile.phone_label')}
            </Typography>
            <Typography variant="body_lg" color="on_surface" style={{ fontWeight: '600' }}>
              {profile.phone}
            </Typography>
          </InfoItem>

          <Divider />

          <InfoItem>
            <Typography variant="label_caps" color="on_surface_variant" style={{ fontWeight: '700' }}>
              {t('user.profile.status_label')}
            </Typography>
            <Typography variant="body_lg" color="primary" style={{ fontWeight: '700' }}>
              {t('user.profile.status_value')}
            </Typography>
          </InfoItem>
        </ProfileCard>

        <ButtonWrapper style={{ gap: 12 }}>
          <Button
            label={t('user.profile.logout_btn')}
            onPress={handleLogout}
            variant="primary"
            fullWidth
            style={{
              backgroundColor: theme.colors.error,
              borderRadius: theme.rounded.lg,
              paddingVertical: verticalScale(14),
            }}
          />
          <Button
            label={t('user.profile.delete_account_btn')}
            onPress={() => setShowDeleteModal(true)}
            variant="outline"
            fullWidth
            style={{
              borderColor: theme.colors.error,
              borderRadius: theme.rounded.lg,
              paddingVertical: verticalScale(14),
            }}
            textColor="error"
          />
        </ButtonWrapper>
      </AppLayoutTemplate>

      <ConfirmationModal
        visible={showDeleteModal}
        title={t('user.profile.delete_confirm_title')}
        message={t('user.profile.delete_confirm_msg')}
        confirmLabel={t('user.profile.delete_confirm_ok')}
        cancelLabel={t('user.profile.delete_confirm_cancel')}
        onConfirm={handleDeleteAccount}
        onDismiss={() => setShowDeleteModal(false)}
        loading={isDeleting}
      />
    </ScreenContainer>
  );
});

Profile.displayName = 'Profile';
