import React from 'react';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { AdminHeader } from '@/components/organisms/AdminHeader';
import { Typography } from '@/components/atoms/Typography';
import { 
  Container, HeaderWrapper, MainContent, 
  TitleContainer, FormContainer, 
  ActionsContainer 
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
        bottomOffset={120}
        contentContainerStyle={{ 
          flexGrow: 1,
        }}
      >
        <MainContent>
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
      <ActionsContainer style={{ paddingBottom: Math.max(insets.bottom, 20) }}>
        {actions}
      </ActionsContainer>
    </Container>
  );
});

CreateNewSessionTemplate.displayName = 'CreateNewSessionTemplate';
