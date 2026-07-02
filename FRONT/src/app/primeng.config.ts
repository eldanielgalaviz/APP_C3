import { providePrimeNG } from 'primeng/config';
import AppTheme from './theme/app.theme';

export const primeNGConfig = providePrimeNG({
  theme: {
    preset: AppTheme,
    options: {
      darkModeSelector: 'none'
    }
  }
});