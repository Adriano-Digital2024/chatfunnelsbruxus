export const OrganizationsManagementPage = () => {
  const { translate: t } = useTranslation();
  
  return (
    <div>
      <h1>{t("Gestão de Organizações")}</h1>
      <p>{t("Página de gestão de organizações admin")}</p>
    </div>
  );
};