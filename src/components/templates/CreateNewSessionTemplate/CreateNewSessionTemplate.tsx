import React from 'react';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { AdminHeader } from '@/components/organisms/AdminHeader';
import { Typography } from '@/components/atoms/Typography';
import { 
  Container, HeaderWrapper, MainContent, 
  ProgressWrapper, ProgressBarFill, TitleContainer, FormContainer, 
  StickyActionsContainer 
} from './CreateNewSessionTemplate.styles';
import { KeyboardAwareScrollView } from 'react-native-keyboard-controller';

export interface CreateNewSessionTemplateProps {
  headerTitle: string;
  avatarUrl?: string;
  onMenuPress: () => void;
  title: string;
  subtitle: string;
  children: React.ReactNode;
  actions: React.ReactNode;
}

export const CreateNewSessionTemplate = React.memo(({
  headerTitle,
  avatarUrl,
  onMenuPress,
  title,
  subtitle,
  children,
  actions
}: CreateNewSessionTemplateProps) => {
  const insets = useSafeAreaInsets();

  return (
    <Container>
      <HeaderWrapper paddingTop={insets.top}>
        <AdminHeader title={headerTitle} avatarUrl={avatarUrl as string} onMenuPress={onMenuPress} />
      </HeaderWrapper>
      
      <KeyboardAwareScrollView 
        style={{ flex: 1 }}
        showsVerticalScrollIndicator={false}
        bottomOffset={40}
        contentContainerStyle={{ 
          flexGrow: 1, 
          paddingBottom: Math.max(insets.bottom, 20) + 40 
        }}
      >
        <MainContent>
          <ProgressWrapper>
            <ProgressBarFill />
          </ProgressWrapper>

          <TitleContainer>
            <Typography variant="headline_lg" color="on_surface" style={{ fontWeight: '700' }}>
              {title}
            </Typography>
            <Typography variant="body_sm" color="on_surface_variant" style={{ marginTop: 4 }}>
              {subtitle}
            </Typography>
          </TitleContainer>

          <FormContainer>
            {children}
          </FormContainer>
        </MainContent>
      </KeyboardAwareScrollView>

      <StickyActionsContainer style={{ paddingBottom: Math.max(insets.bottom, 20) }}>
        {actions}
      </StickyActionsContainer>
    </Container>
  );
});

CreateNewSessionTemplate.displayName = 'CreateNewSessionTemplate';
