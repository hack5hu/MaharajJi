import React, { useState, useCallback } from 'react';
import { Terminal, Bug, ChevronDown, ChevronUp, Trash2, X } from 'lucide-react-native';
import { useTheme } from 'styled-components/native';
import { ThemeType } from '@/theme/theme';
import { scale } from '@/styles/scaling';
import { useLocale } from '@/hooks/useLocale';
import { Typography } from '@/components/atoms/Typography';
import { Box } from '@/components/atoms/Box';
import { useDebugLogStore, ApiLog } from '@/store/useDebugLogStore';
import {
  DebuggerWrapper,
  FloatingTrigger,
  FullscreenOverlay,
  PanelContent,
  PanelHeader,
  HeaderActions,
  ClearButton,
  CloseButton,
  LogsScrollView,
  LogCard,
  LogRow,
  LogInfo,
  BadgesContainer,
  MethodBadge,
  StatusBadge,
  LogExpandedArea,
  JSONBlock,
  JSONScroll,
  EmptyStateWrapper,
} from './ApiDebugger.styles';

export const ApiDebugger = React.memo(() => {
  const theme = useTheme() as ThemeType;
  const { t } = useLocale();
  const logs = useDebugLogStore((state) => state.logs);
  const clearLogs = useDebugLogStore((state) => state.clearLogs);

  const [isOpen, setIsOpen] = useState(false);
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const handleToggleOpen = useCallback(() => {
    setIsOpen((prev) => !prev);
  }, []);

  const handleToggleExpand = useCallback((id: string) => {
    setExpandedId((prev) => (prev === id ? null : id));
  }, []);

  const getStatusColor = (status?: number) => {
    if (!status) return theme.colors.on_surface_variant;
    if (status >= 200 && status < 300) return '#2e7d32'; // Green
    if (status >= 400) return '#c62828'; // Red
    return '#f57f17'; // Orange
  };

  const formatJSON = (data: any) => {
    if (!data) return 'null';
    try {
      return JSON.stringify(data, null, 2);
    } catch {
      return String(data);
    }
  };

  const renderLogItem = useCallback((log: ApiLog) => {
    const isExpanded = expandedId === log.id;
    const statusText = log.status ? String(log.status) : 'PENDING';

    return (
      <LogCard key={log.id}>
        <LogRow onPress={() => handleToggleExpand(log.id)}>
          <BadgesContainer>
            <MethodBadge method={log.method}>
              <Typography variant="label_caps" color="on_surface" style={{ fontSize: 9, fontWeight: '800' }}>
                {log.method}
              </Typography>
            </MethodBadge>
            <StatusBadge status={log.status}>
              <Typography
                variant="label_caps"
                style={{ fontSize: 9, fontWeight: '800', color: getStatusColor(log.status) }}
              >
                {statusText}
              </Typography>
            </StatusBadge>
          </BadgesContainer>

          <LogInfo>
            <Typography variant="body_sm" color="on_surface" numberOfLines={1} style={{ fontWeight: '600' }}>
              {log.url}
            </Typography>
            <Typography variant="body_sm" color="on_surface_variant" style={{ fontSize: 10 }}>
              {log.timestamp} {log.duration !== undefined ? `• ${log.duration}ms` : ''}
            </Typography>
          </LogInfo>

          {isExpanded ? (
            <ChevronUp color={theme.colors.on_surface_variant as string} size={scale(20)} />
          ) : (
            <ChevronDown color={theme.colors.on_surface_variant as string} size={scale(20)} />
          )}
        </LogRow>

        {isExpanded && (
          <LogExpandedArea>
            <Typography variant="body_sm" color="on_surface_variant" style={{ fontWeight: '700' }}>
              {t('user.debugger.req_payload')}
            </Typography>
            <JSONBlock>
              <JSONScroll nestedScrollEnabled showsVerticalScrollIndicator>
                <Typography variant="body_sm" color="on_primary" style={{ fontFamily: 'Courier', fontSize: 11 }}>
                  {formatJSON(log.requestData)}
                </Typography>
              </JSONScroll>
            </JSONBlock>

            <Typography variant="body_sm" color="on_surface_variant" style={{ fontWeight: '700', marginTop: scale(4) }}>
              {t('user.debugger.res_payload')}
            </Typography>
            <JSONBlock>
              <JSONScroll nestedScrollEnabled showsVerticalScrollIndicator>
                <Typography variant="body_sm" color="on_primary" style={{ fontFamily: 'Courier', fontSize: 11 }}>
                  {formatJSON(log.responseData || log.error)}
                </Typography>
              </JSONScroll>
            </JSONBlock>
          </LogExpandedArea>
        )}
      </LogCard>
    );
  }, [expandedId, handleToggleExpand, theme, t]);

  return (
    <DebuggerWrapper>
      {/* Floating Trigger Button */}
      <FloatingTrigger onPress={handleToggleOpen}>
        <Bug color={theme.colors.on_primary as string} size={scale(24)} />
      </FloatingTrigger>

      {/* Slide-up Logs Overlay Panel */}
      {isOpen && (
        <FullscreenOverlay>
          <PanelContent>
            {/* Header */}
            <PanelHeader>
              <Box style={{ flexDirection: 'row', alignItems: 'center', gap: scale(6) }}>
                <Terminal color={theme.colors.primary as string} size={scale(20)} />
                <Typography variant="headline_md" color="on_surface" style={{ fontWeight: '700' }}>
                  {t('user.debugger.title')}
                </Typography>
              </Box>

              <HeaderActions>
                <ClearButton onPress={clearLogs}>
                  <Box style={{ flexDirection: 'row', alignItems: 'center', gap: scale(4) }}>
                    <Trash2 color={theme.colors.on_surface as string} size={scale(14)} />
                    <Typography variant="body_sm" color="on_surface" style={{ fontWeight: '600' }}>
                      {t('user.debugger.clear')}
                    </Typography>
                  </Box>
                </ClearButton>

                <CloseButton onPress={handleToggleOpen}>
                  <Box style={{ flexDirection: 'row', alignItems: 'center', gap: scale(4) }}>
                    <X color={theme.colors.on_error as string} size={scale(14)} />
                    <Typography variant="body_sm" color="on_error" style={{ fontWeight: '600' }}>
                      {t('user.debugger.close')}
                    </Typography>
                  </Box>
                </CloseButton>
              </HeaderActions>
            </PanelHeader>

            {/* List Content */}
            {logs.length === 0 ? (
              <EmptyStateWrapper>
                <Terminal color={theme.colors.outline as string} size={scale(48)} />
                <Typography variant="body_lg" color="on_surface_variant" style={{ textAlign: 'center' }}>
                  {t('user.debugger.no_logs')}
                </Typography>
              </EmptyStateWrapper>
            ) : (
              <LogsScrollView showsVerticalScrollIndicator={false}>
                {logs.map(renderLogItem)}
              </LogsScrollView>
            )}
          </PanelContent>
        </FullscreenOverlay>
      )}
    </DebuggerWrapper>
  );
});

ApiDebugger.displayName = 'ApiDebugger';
