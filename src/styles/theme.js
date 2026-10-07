import { useColorScheme } from 'react-native';

export const lightTheme = {
  mode: 'light',
  background: '#F4F6FB',
  card: '#FFFFFF',
  text: '#1F2937',
  textMuted: '#6B7280',
  primary: '#4F46E5',
  onPrimary: '#FFFFFF',
  border: '#E5E7EB',
  danger: '#DC2626',
  success: '#16A34A',
  inputBackground: '#FFFFFF',
};

export const darkTheme = {
  mode: 'dark',
  background: '#0F172A',
  card: '#1E293B',
  text: '#F1F5F9',
  textMuted: '#94A3B8',
  primary: '#818CF8',
  onPrimary: '#0F172A',
  border: '#334155',
  danger: '#F87171',
  success: '#4ADE80',
  inputBackground: '#1E293B',
};

// Segue automaticamente o tema do celular (claro ou escuro)
export function useTheme() {
  const scheme = useColorScheme();
  return scheme === 'dark' ? darkTheme : lightTheme;
}