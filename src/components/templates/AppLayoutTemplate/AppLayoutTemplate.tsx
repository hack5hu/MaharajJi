import React from 'react';
import { Platform } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { AdminHeader } from '@/components/organisms/AdminHeader';
import { CustomerBottomNav } from '@/components/organisms/CustomerBottomNav';
import { AdminBottomNav } from '@/components/organisms/AdminBottomNav';
import { verticalScale } from '@/styles/scaling';
import {
  TemplateContainer,
  HeaderWrapper,
  ContentContainer,
  StyledScrollView,
} from './AppLayoutTemplate.styles';
import { AppLayoutTemplateProps } from './types.d';

export const AppLayoutTemplate = React.memo(
  ({
    headerTitle,
    role,
    activeTab,
    onTabChange,
    children,
    scrollable = true,
    showBackButton = false,
    onBackPress,
    hideHeader = false,
  }: AppLayoutTemplateProps) => {
    const insets = useSafeAreaInsets();

    const renderContent = () => {
      return (
        <ContentContainer>
          {children}
        </ContentContainer>
      );
    };

    return (
      <TemplateContainer paddingTop={insets.top + verticalScale(16)}>
        {!hideHeader && (
          <HeaderWrapper>
            <AdminHeader
              title={headerTitle}
              showBackButton={showBackButton}
              onBackPress={onBackPress}
            />
          </HeaderWrapper>
        )}

        {scrollable ? (
          <StyledScrollView
            showsVerticalScrollIndicator={false}
            keyboardShouldPersistTaps="handled"
            contentContainerStyle={{
              paddingBottom:
                Platform.OS === 'ios' ? verticalScale(120) : verticalScale(100),
            }}
          >
            {renderContent()}
          </StyledScrollView>
        ) : (
          renderContent()
        )}

        {role === 'user' ? (
          <CustomerBottomNav
            activeTab={activeTab as any}
            onTabChange={onTabChange}
          />
        ) : (
          <AdminBottomNav
            activeTab={activeTab as any}
            onTabChange={onTabChange}
          />
        )}
      </TemplateContainer>
    );
  },
);

AppLayoutTemplate.displayName = 'AppLayoutTemplate';
