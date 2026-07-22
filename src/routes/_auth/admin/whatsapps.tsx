export const WhatsAppsManagementPage = () => {
  const { translate: t } = useTranslation();
  
  return (
    <div>
      <h1>{t("Gestão de WhatsApps")}</h1>
      <p>{t("Página de gestão de WhatsApps admin")}</p>
    </div>
  );
};