'use client';

import { Button } from '@/components/ui/button';
import { useLanguage } from '@/contexts/LanguageContext';

export function LanguageToggle() {
  const { language, toggleLanguage } = useLanguage();

  return (
    <Button
      variant="ghost"
      size="sm"
      onClick={toggleLanguage}
      className="fixed top-4 right-4 z-50 rounded-full w-12 h-12 bg-accent hover:bg-muted text-accent-foreground shadow-md transition-all duration-200 flex items-center justify-center"
      aria-label={language === 'en' ? 'Switch to Arabic' : 'التبديل إلى الإنجليزية'}
    >
      {language === 'en' ? 'عربي' : 'EN'}
    </Button>
  );
}
