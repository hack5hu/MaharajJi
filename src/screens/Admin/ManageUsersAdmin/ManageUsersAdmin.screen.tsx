import React, { useCallback, useState } from 'react';
import { ActivityIndicator } from 'react-native';
import { Users } from 'lucide-react-native';
import { EmptyStateContainer, EmptyIconWrapper } from '../ManageBookings/ManageBookings.styles';
import { ManageUsersTemplate } from '@/components/templates/ManageUsersTemplate';
import { CustomerCard } from '@/components/molecules/CustomerCard';
import { Chip } from '@/components/atoms/Chip';
import { Typography } from '@/components/atoms/Typography';
import { useManageUsersAdmin } from './useManageUsersAdmin';
import { FlashList, ListRenderItem } from '@shopify/flash-list';
import { UserData, FilterOption } from './types.d';
import { SortAsc, Clock, Filter } from 'lucide-react-native';
import { scale, verticalScale } from '@/styles/scaling';
import { useTheme } from 'styled-components/native';
import { ThemeType } from '@/theme/theme';
import { Box } from '@/components/atoms/Box';
import { useAppNavigation } from '@/navigation/useAppNavigation';
import { ConfirmationModal } from '@/components/organisms/ConfirmationModal';


export const ManageUsersAdmin = React.memo(() => {
  const theme = useTheme() as ThemeType;
  const navigation = useAppNavigation();
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
      hasMore,
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
            label="Alphabetical" 
            icon={<SortAsc color={activeFilter === 'Alphabetical' ? theme.colors.on_primary as string : theme.colors.on_surface_variant as string} size={scale(18)} />}
            isActive={activeFilter === 'Alphabetical'}
            onPress={() => handleFilterPress('Alphabetical')}
          />
          <Chip 
            label="Recently Added" 
            icon={<Clock color={activeFilter === 'Recently Added' ? theme.colors.on_primary as string : theme.colors.on_surface_variant as string} size={scale(18)} />}
            isActive={activeFilter === 'Recently Added'}
            onPress={() => handleFilterPress('Recently Added')}
          />
          <Chip 
            label="More Filters" 
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
        <EmptyStateContainer style={{ marginTop: verticalScale(40) }}>
          <EmptyIconWrapper>
            <Users color={theme.colors.primary as string} size={scale(24)} />
          </EmptyIconWrapper>
          <Typography variant="headline_md" color="on_surface_variant" style={{ fontWeight: '700', marginTop: scale(16) }}>
            No Customers Found
          </Typography>
          <Typography variant="body_sm" color="on_surface_variant" style={{ marginTop: 4, textAlign: 'center' }}>
            Add a customer to see them listed here.
          </Typography>
        </EmptyStateContainer>
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
            <Box style={{ flex: 1, paddingBottom: verticalScale(120) }}>
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
                    <Box style={{ padding: scale(16), alignItems: 'center' }}>
                      <ActivityIndicator size="small" color={theme.colors.primary as string} />
                    </Box>
                  ) : null
                }
              />
            </Box>
          }
        />
        <ConfirmationModal
          visible={showDeleteModal}
          title="Delete Customer"
          message="Are you sure you want to delete this customer? This action cannot be undone."
          confirmLabel="Delete"
          cancelLabel="Cancel"
          onConfirm={confirmDeleteCustomer}
          onDismiss={cancelDeleteCustomer}
          loading={isDeleting}
        />
      </>
    );
  });


ManageUsersAdmin.displayName = 'ManageUsersAdmin';
