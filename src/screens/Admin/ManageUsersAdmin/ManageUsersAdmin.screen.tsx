import React, { useCallback, useState } from 'react';
import { ActivityIndicator, ScrollView } from 'react-native';
import { Users } from 'lucide-react-native';
import { EmptyIconWrapper } from '../ManageBookings/ManageBookings.styles';
import { AppLayoutTemplate } from '@/components/templates/AppLayoutTemplate';
import { Input } from '@/components/atoms/Input';
import { FAB } from '@/components/atoms/FAB';
import { Search } from 'lucide-react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { CustomerCard } from '@/components/molecules/CustomerCard';
import { useManageUsersAdmin } from './useManageUsersAdmin';
import { FlashList, ListRenderItem } from '@shopify/flash-list';
import { UserData } from './types.d';
import { Plus } from 'lucide-react-native';
import { scale, verticalScale } from '@/styles/scaling';
import { useTheme } from 'styled-components/native';
import { ThemeType } from '@/theme/theme';
import { useAppNavigation } from '@/navigation/useAppNavigation';
import { ConfirmationModal } from '@/components/organisms/ConfirmationModal';
import { useLocale } from '@/hooks/useLocale';
import {
  StyledEmptyStateContainer,
  EmptyStateTitle,
  EmptyStateDesc,
  ListContainer,
  FooterContainer,
  SearchAndFilterWrapper,
  ScreenTitleWrapper,
  ScreenWrapper,
} from './ManageUsersAdmin.styles';
import { Typography } from '@/components/atoms/Typography';

export const ManageUsersAdmin = React.memo(() => {
  const theme = useTheme() as ThemeType;
  const navigation = useAppNavigation();
  const { t } = useLocale();
  const [activeTab, setActiveTab] = useState<'dashboard' | 'bookings' | 'customers' | 'settings'>('customers');

  const {
    searchQuery,
    handleSearchChange,
    filteredUsers,
    handleAddCustomer,
    handleDeleteCustomer,
    handleUserPress,
    showDeleteModal,
    confirmDeleteCustomer,
    cancelDeleteCustomer,
    isDeleting,
    handleLoadMore,
    isFetchingMore,
    isLoading,
    totalElements,
  } = useManageUsersAdmin();

  console.log('[ManageUsersAdmin] render, showDeleteModal:', showDeleteModal, 'isDeleting:', isDeleting);

  const handleTabChange = useCallback((tab: any) => {
    if (tab === 'dashboard') {
      navigation.navigate('AdminDashboardHome');
    } else if (tab === 'bookings') {
      navigation.navigate('ManageBookings');
    } else if (tab === 'settings') {
      navigation.navigate('AdminSettings');
    }
  }, [navigation]);

  const renderItem: ListRenderItem<UserData> = useCallback(({ item }) => (
    <CustomerCard
      initials={item.initials}
      name={item.name}
      phone={item.phone}
      status={item.status}
      lastVisit={item.lastVisit}
      avatarColorHex={item.avatarColorHex}
      onPress={() => handleUserPress(item.id)}
      onDeletePress={() => handleDeleteCustomer(item.id)}
    />
  ), [handleUserPress, handleDeleteCustomer]);

  const renderEmpty = () => {
    if (isFetchingMore || isLoading) return null;
    return (
      <StyledEmptyStateContainer>
        <EmptyIconWrapper>
          <Users color={theme.colors.primary as string} size={scale(24)} />
        </EmptyIconWrapper>
        <EmptyStateTitle variant="headline_md" color="on_surface_variant">
          {t('admin.manage_users.empty_title')}
        </EmptyStateTitle>
        <EmptyStateDesc variant="body_sm" color="on_surface_variant">
          {t('admin.manage_users.empty_desc')}
        </EmptyStateDesc>
      </StyledEmptyStateContainer>
    );
  };

  return (
    <ScreenWrapper>
      <AppLayoutTemplate
        headerTitle=""
        role="admin"
        activeTab={activeTab}
        onTabChange={handleTabChange}
        scrollable={false}
        hideHeader={true}
      >
        <ScreenTitleWrapper style={{ paddingTop: useSafeAreaInsets().top }}>
          <Typography variant="headline_lg_mobile" color="on_surface" style={{ fontWeight: '700' }}>
            Community Members
          </Typography>
          <Typography variant="body_sm" color="on_surface_variant" style={{ marginTop: verticalScale(4), marginBottom: verticalScale(4) }}>
            Manage and connect with your spiritual circle.
          </Typography>
          {totalElements > 0 && (
            <Typography variant="body_sm" color="on_surface" style={{ fontWeight: '700' }}>
              {t('admin.manage_users.total_members') || 'Total Members'}: {totalElements}
            </Typography>
          )}
        </ScreenTitleWrapper>

        <SearchAndFilterWrapper>
          <Input 
            value={searchQuery}
            onChangeText={handleSearchChange}
            placeholder="Search members..."
            leftIcon={<Search color={theme.colors.outline as string} size={scale(20)} />}
          />
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{ flexDirection: 'row', gap: scale(8) }}
          >
          </ScrollView>
        </SearchAndFilterWrapper>



        <ListContainer>
          <FlashList
            data={filteredUsers}
            renderItem={renderItem}
            // @ts-expect-error estimatedItemSize is required but TS definition fails
            estimatedItemSize={120}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{ paddingBottom: verticalScale(120) }}
            onEndReached={handleLoadMore}
            onEndReachedThreshold={0.5}
            keyboardShouldPersistTaps="handled"
            ListEmptyComponent={renderEmpty}
            ListFooterComponent={
              isFetchingMore ? (
                <FooterContainer>
                  <ActivityIndicator size="small" color={theme.colors.primary as string} />
                </FooterContainer>
              ) : null
            }
          />
        </ListContainer>
      </AppLayoutTemplate>
      <FAB 
        icon={<Plus color={theme.colors.on_primary_container as string} size={scale(24)} />}
        onPress={handleAddCustomer}
        bottom={scale(96) + useSafeAreaInsets().bottom}
      />
      <ConfirmationModal
        visible={showDeleteModal}
        title={t('admin.manage_users.delete_title')}
        message={t('admin.manage_users.delete_confirm')}
        confirmLabel={t('common.delete')}
        cancelLabel={t('common.cancel')}
        onConfirm={confirmDeleteCustomer}
        onDismiss={cancelDeleteCustomer}
        loading={isDeleting}
      />
    </ScreenWrapper>
  );
});

ManageUsersAdmin.displayName = 'ManageUsersAdmin';
