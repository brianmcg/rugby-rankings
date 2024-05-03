import { useTranslation } from 'react-i18next';

function Translate({ text }) {

  const { t } = useTranslation();
  return <>{t(text)}</>;
}

export default Translate;
