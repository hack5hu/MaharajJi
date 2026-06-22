import React from 'react';
import { ScrollView } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { AdminHeader } from '@/components/organisms/AdminHeader';
import { CustomerBottomNav } from '@/components/organisms/CustomerBottomNav';
import { AdminBottomNav } from '@/components/organisms/AdminBottomNav';
import { scale, verticalScale } from '@/styles/scaling';
import {
  TemplateContainer,
  HeaderWrapper,
  ContentContainer,
  StyledScrollView,
  FiltersWrapper,
} from './AppLayoutTemplate.styles';
import { AppLayoutTemplateProps } from './types.d';

export const AppLayoutTemplate = React.memo(({
  headerTitle,
  role,
  activeTab,
  onTabChange,
  children,
  scrollable = true,
  showBackButton = false,
  onBackPress,
  filtersContent,
}: AppLayoutTemplateProps) => {
  const insets = useSafeAreaInsets();

  const renderContent = () => {
    return (
      <ContentContainer>
        {filtersContent && (
          <FiltersWrapper>
            <ScrollView 
              horizontal 
              showsHorizontalScrollIndicator={false} 
              contentContainerStyle={{ gap: scale(8), paddingBottom: scale(4) }} 
              keyboardShouldPersistTaps="handled"
            >
              {filtersContent}
            </ScrollView>
          </FiltersWrapper>
        )}
        {children}
      </ContentContainer>
    );
  };

  return (
    <TemplateContainer>
      <HeaderWrapper paddingTop={insets.top}>
        <AdminHeader 
          title={headerTitle} 
          showBackButton={showBackButton}
          onBackPress={onBackPress}
        />
      </HeaderWrapper>

      {scrollable ? (
        <StyledScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{
            paddingBottom: Math.max(insets.bottom, verticalScale(20)) + verticalScale(100),
          }}
          keyboardShouldPersistTaps="handled"
        >
          {renderContent()}
        </StyledScrollView>
      ) : (
        renderContent()
      )}

      {role === 'user' ? (
        <CustomerBottomNav activeTab={activeTab as any} onTabChange={onTabChange} />
      ) : (
        <AdminBottomNav activeTab={activeTab as any} onTabChange={onTabChange} />
      )}
    </TemplateContainer>
  );
});

AppLayoutTemplate.displayName = 'AppLayoutTemplate';
