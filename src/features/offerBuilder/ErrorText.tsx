import { AppText } from '@/components/ui';
import { useTheme } from '@/theme';

/** Inline error under a field or button; announced by screen readers. */
export function ErrorText({ children }: { children: string }) {
  const { colors } = useTheme();
  return (
    <AppText variant="caption" accessibilityRole="alert" style={{ color: colors.danger }}>
      {children}
    </AppText>
  );
}
