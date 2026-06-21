import React, { useCallback, useState } from 'react';
import { ActivityIndicator } from 'react-native';
import { Users } from 'lucide-react-native';
import { EmptyIconWrapper } from '../ManageBookings/ManageBookings.styles';
import { ManageUsersTemplate } from '@/components/templates/ManageUsersTemplate';
import { CustomerCard } from '@/components/molecules/CustomerCard';
import { Chip } from '@/components/atoms/Chip';
import { useManageUsersAdmin } from './useManageUsersAdmin';
import { FlashList, ListRenderItem } from '@shopify/flash-list';
import { UserData } from './types.d';
import { SortAsc, Clock, Filter } from 'lucide-react-native';
import { scale } from '@/styles/scaling';
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
} from './ManageUsersAdmin.styles';

export const ManageUsersAdmin = React.memo(() => {
  const theme = useTheme() as ThemeType;
  const navigation = useAppNavigation();
  const { t } = useLocale();
  const [activeTab, setActiveTab] = useState<'dashboard' | 'bookings' | 'customers' | 'settings'>('customers');

  const {
    searchQuery,
    handleSearchChange,
    activeFilter,
    handleFilterPress,
    filteredUsers,
    handleAddCustomer,
    handleEditCustomer,
    handleDeleteCustomer,
    handleMenuPress,
    handleUserPress,
    showDeleteModal,
    confirmDeleteCustomer,
    cancelDeleteCustomer,
    isDeleting,
    handleLoadMore,
    isFetchingMore,
    isLoading,
  } = useManageUsersAdmin();

  const handleTabChange = useCallback((tab: any) => {
    setActiveTab(tab);
    if (tab === 'dashboard') {
      navigation.navigate('AdminDashboardHome');
    } else if (tab === 'bookings') {
      navigation.navigate('ManageBookings');
    } else if (tab === 'settings') {
      navigation.navigate('AdminSettings');
    }
  }, [navigation]);

  const renderFilterChips = () => {
    return (
      <>
        <Chip
          label={t('admin.manage_users.alphabetical')}
          icon={<SortAsc color={activeFilter === 'Alphabetical' ? theme.colors.on_primary as string : theme.colors.on_surface_variant as string} size={scale(18)} />}
          isActive={activeFilter === 'Alphabetical'}
          onPress={() => handleFilterPress('Alphabetical')}
        />
        <Chip
          label={t('admin.manage_users.recently_added')}
          icon={<Clock color={activeFilter === 'Recently Added' ? theme.colors.on_primary as string : theme.colors.on_surface_variant as string} size={scale(18)} />}
          isActive={activeFilter === 'Recently Added'}
          onPress={() => handleFilterPress('Recently Added')}
        />
        <Chip
          label={t('admin.manage_users.more_filters')}
          icon={<Filter color={theme.colors.on_surface_variant as string} size={scale(18)} />}
          isActive={false}
          onPress={() => console.log('Open more filters modal')}
        />
      </>
    );
  };

  const renderItem: ListRenderItem<UserData> = useCallback(({ item }) => (
    <CustomerCard
      initials={item.initials}
      name={item.name}
      phone={item.phone}
      status={item.status}
      lastVisit={item.lastVisit}
      avatarColorHex={item.avatarColorHex}
      onPress={() => handleUserPress(item.id)}
      onEditPress={() => handleEditCustomer(item.id)}
      onDeletePress={() => handleDeleteCustomer(item.id)}
    />
  ), [handleUserPress, handleEditCustomer, handleDeleteCustomer]);

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
    <>
      <ManageUsersTemplate
        headerTitle="Sacred Spaces"
        avatarUrl="https://lh3.googleusercontent.com/aida-public/AB6AXuAvrKMK8ktzwlTbPhF8JxOFOUmTEOBpVoIt3kRKpL13cQqEYQHqgxx4Pf28iqQtNf6naYI3E_Vp5f0f0cpXeAKkgSaOh5JDFrJbCb1_rj7M8M-e9sCNrDFcjCGtUWugoaWKFVl4qztRbHKm9DnZD8cdfQ-8mTXllDQRO9uZQP5Dgxp48KiXXHH54fRW-xWVRSwzqMhgJzE7yFkHD9pPKJlpR8O2GiHSZqoLzxxYzby7iHSiThVn1T2hbP3MghyY3bh80oEmekBZ0lk"
        onMenuPress={handleMenuPress}
        searchQuery={searchQuery}
        onSearchChange={handleSearchChange}
        filtersContent={renderFilterChips()}
        onAddPress={handleAddCustomer}
        activeTab={activeTab}
        onTabChange={handleTabChange}
        listContent={
          <ListContainer>
            <FlashList
              data={filteredUsers}
              renderItem={renderItem}
              // @ts-expect-error estimatedItemSize is required but TS definition fails
              estimatedItemSize={120}
              showsVerticalScrollIndicator={false}
              onEndReached={handleLoadMore}
              onEndReachedThreshold={0.5}
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
        }
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
    </>
  );
});

ManageUsersAdmin.displayName = 'ManageUsersAdmin';
