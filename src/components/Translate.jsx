import { useTranslation } from 'react-i18next';

export default function Translate({ text, options = {} }) {
  const { t } = useTranslation();
  return t(text, options);
}
