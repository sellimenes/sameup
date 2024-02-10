import { useTranslation } from 'react-i18next';

const Footer = () => {
    const { i18n: {t, language} } = useTranslation();
  return (
    <footer className='w-full text-center p-2 border-t bg-white'>
        {language === 'tr' &&  <a href="https://linkedin.com/in/selim-enes-erdogan" target='_blank' className='italic hover:underline'>{t('author')} </a>}
        {t('footerText')}
        {language === 'en' &&  <a href="https://linkedin.com/in/selim-enes-erdogan" target='_blank' className='italic hover:underline'> {t('author')}</a>}
    </footer>
  )
}

export default Footer