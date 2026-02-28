'use client';

import React from 'react';
import { useTranslation } from '@/lib/translations';

export const Footer = () => {
  const currentYear = new Date().getFullYear();
  const t = useTranslation();
  
  return (
    <footer className="w-full py-4 text-center text-sm text-gray-600">
      <div className="container mx-auto px-4">
        <p>© {currentYear} {t('copyright')} <a 
          href="https://www.instagram.com/digitiva.co?igsh=MXNteGgyZjIzenQwaQ==" 
          target="_blank" 
          rel="noopener noreferrer"
          className="text-blue-600 hover:underline"
        >
          Digitiva
        </a></p>
      </div>
    </footer>
  );
};
