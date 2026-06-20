import { useState, useCallback, useMemo } from 'react';
import { useAppNavigation } from '@/navigation/useAppNavigation';
import { UserData, FilterOption } from './types.d';
import { useTheme } from 'styled-components/native';
import { ThemeType } from '@/theme/theme';

export const useManageUsersAdmin = () => {
  const navigation = useAppNavigation();
  const theme = useTheme() as ThemeType;
  
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilter, setActiveFilter] = useState<FilterOption>('Alphabetical');

  // Mock data based on the HTML design
  const allUsers: UserData[] = useMemo(() => [
    {
      id: '1',
      initials: 'AS',
      name: 'Aditi Sharma',
      phone: '+91 98765 43210',
      status: 'Premium',
      lastVisit: '2 days ago',
      avatarColorHex: theme.colors.primary_fixed as string,
    },
    {
      id: '2',
      initials: 'RK',
      name: 'Rahul Kapoor',
      phone: '+91 87654 32109',
      status: 'Regular',
      lastVisit: '1 week ago',
      avatarColorHex: theme.colors.tertiary_container as string,
    },
    {
      id: '3',
      initials: 'PM',
      name: 'Priya Mehta',
      phone: '+91 76543 21098',
      status: 'Premium',
      lastVisit: 'Today',
      avatarColorHex: theme.colors.primary_fixed_dim as string,
    },
    {
      id: '4',
      initials: 'VN',
      name: 'Vikram Nair',
      phone: '+91 91234 56789',
      status: 'Regular',
      lastVisit: '3 weeks ago',
      avatarColorHex: theme.colors.secondary_fixed as string,
    },
  ], [theme]);

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
    console.log('Delete customer', id);
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
    
    // Simple search filtering
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      result = result.filter(u => 
        u.name.toLowerCase().includes(q) || 
        u.phone.includes(q)
      );
    }

    // Filter toggles
    if (activeFilter === 'Premium Only') {
      result = result.filter(u => u.status === 'Premium');
    } else if (activeFilter === 'Regular Only') {
      result = result.filter(u => u.status === 'Regular');
    }

    // Sorting (alphabetical is default in our mock list, but let's implement it for completeness)
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
  };
};
