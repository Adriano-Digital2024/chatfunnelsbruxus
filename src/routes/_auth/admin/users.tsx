export const UserManagementPage = () => {
  const { translate: t } = useTranslation();
  
  return (
    <div>
      <h1>{t("Gestão de Usuários")}</h1>
      <p>{t("Página de gestão de usuários admin")}</p>
    </div>
  );
};