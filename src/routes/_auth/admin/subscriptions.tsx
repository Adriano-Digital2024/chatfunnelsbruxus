export const SubscriptionsManagementPage = () => {
  const { translate: t } = useTranslation();
  
  return (
    <div>
      <h1>{t("Gestão de Assinaturas")}</h1>
      <p>{t("Página de gestão de assinaturas admin")}</p>
    </div>
  );
};