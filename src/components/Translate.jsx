import { useTranslation } from 'react-i18next';

function Translate({ text, options = {} }) {

  const { t } = useTranslation();
  return <>{t(text, options)}</>;
}

export default Translate;
