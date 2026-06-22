import { useState, useCallback, useMemo, useEffect } from 'react';
import { format } from 'date-fns';
import { useAppNavigation } from '@/navigation/useAppNavigation';
import { UserData, FilterOption } from './types.d';
import { useTheme } from 'styled-components/native';
import { ThemeType } from '@/theme/theme';
import { useUserStore } from '@/stores/useUserStore';
import { useApi } from '@/hooks/useApi';
import { UserService } from '@/serviceManager/UserService';

export const useManageUsersAdmin = () => {
  const navigation = useAppNavigation();
  const theme = useTheme() as ThemeType;
  
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilter, setActiveFilter] = useState<FilterOption>('Alphabetical');

  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [customerToDelete, setCustomerToDelete] = useState<string | null>(null);

  const customers = useUserStore(state => state.customers);
  const isFetching = useUserStore(state => state.isFetching);
  const fetchCustomers = useUserStore(state => state.fetchCustomers);
  const removeCustomerLocally = useUserStore(state => state.removeCustomerLocally);
  const fetchNextPageCustomers = useUserStore(state => state.fetchNextPageCustomers);
  const isFetchingNextPage = useUserStore(state => state.isFetchingNextPage);
  const hasMore = useUserStore(state => state.hasMore);
  const totalElements = useUserStore(state => state.totalElements);

  const { execute: deleteCustomer, isLoading: isDeleting } = useApi(UserService.deleteCustomer);

  useEffect(() => {
    fetchCustomers(true);
  }, [fetchCustomers]);

  const handleLoadMore = useCallback(() => {
    fetchNextPageCustomers();
  }, [fetchNextPageCustomers]);

  const allUsers: UserData[] = useMemo(() => {
    return (customers || []).map((c) => ({
      id: c.phoneNumber, // Using phone as unique ID
      initials: c.name ? c.name.substring(0, 2).toUpperCase() : 'CU',
      name: c.name,
      phone: c.phoneNumber,
      status: (c.status === 'Premium' ? 'Premium' : 'Regular') as 'Premium' | 'Regular',
      lastVisit: c.createdAt ? format(new Date(c.createdAt), 'dd MMM yyyy') : 'Just now',
      avatarColorHex: theme.colors.primary_fixed as string,
    }));
  }, [customers, theme]);

  // Handlers
  const handleSearchChange = useCallback((query: string) => {
    setSearchQuery(query);
  }, []);

  const handleFilterPress = useCallback((filter: FilterOption) => {
    setActiveFilter(filter);
  }, []);

  const handleAddCustomer = useCallback(() => {
    navigation.navigate('AddNewCustomerAdmin');
  }, [navigation]);

  const handleEditCustomer = useCallback((id: string) => {
    console.log('Edit customer', id);
  }, []);

  const handleDeleteCustomer = useCallback((id: string) => {
    setCustomerToDelete(id);
    setShowDeleteModal(true);
  }, []);

  const confirmDeleteCustomer = useCallback(async () => {
    if (!customerToDelete) return;
    const phone = customerToDelete;
    
    // Optimistic delete
    removeCustomerLocally(phone);
    setShowDeleteModal(false);
    setCustomerToDelete(null);

    const res = await deleteCustomer(phone);
    if (!res.success) {
      // Refresh on fail
      fetchCustomers();
    }
  }, [customerToDelete, removeCustomerLocally, deleteCustomer, fetchCustomers]);

  const cancelDeleteCustomer = useCallback(() => {
    setShowDeleteModal(false);
    setCustomerToDelete(null);
  }, []);

  const handleMenuPress = useCallback(() => {
    console.log('Open menu');
  }, []);

  const handleUserPress = useCallback((id: string) => {
    console.log('View user', id);
  }, []);

  // Filtered List
  const filteredUsers = useMemo(() => {
    let result = allUsers;
    
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      result = result.filter(u => 
        u.name.toLowerCase().includes(q) || 
        u.phone.includes(q)
      );
    }

    if (activeFilter === 'Premium Only') {
      result = result.filter(u => u.status === 'Premium');
    } else if (activeFilter === 'Regular Only') {
      result = result.filter(u => u.status === 'Regular');
    }

    if (activeFilter === 'Alphabetical') {
      result = [...result].sort((a, b) => a.name.localeCompare(b.name));
    }

    return result;
  }, [allUsers, searchQuery, activeFilter]);

  return {
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
    isLoading: isFetching,
    handleLoadMore,
    isFetchingMore: isFetchingNextPage,
    hasMore,
    totalElements,
  };
};
