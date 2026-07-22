import { useTranslation } from "@/hooks/useTranslation";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { translate: t } = useTranslation();

  return (
    <div className="h-full w-full admin-layout">
      {/* Desktop sidebar (hidden on mobile) */}
      <div className="hidden md:block fixed left-0 top-0 h-full w-64 bg-sidebar border-r border-sidebar-border z-40">
        <div className="p-4">
          <h2 className="text-xl font-bold text-sidebar-foreground mb-6">
            {t("Painel de Administración")}
          </h2>
          <nav className="space-y-2">
            <a
              href="/admin"
              className="flex items-center gap-3 px-3 py-2 rounded-lg text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground transition-colors"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 01-1 1h2a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v10m-6-8a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 01-1 1h-2a1 1 0 01-1-1V9z" />
              </svg>
              {t("Dashboard")}
            </a>
            <a
              href="/admin/users"
              className="flex items-center gap-3 px-3 py-2 rounded-lg text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground transition-colors"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a4 4 0 014-4h9a4 4 0 014 4zm0 0h6v-1a4 4 0 00-3-3.87M6 10a1 1 0 111-1h1a1 1 0 011 1v1H7a1 1 0 01-1-1z" />
              </svg>
              {t("Users")}
            </a>
            <a
              href="/admin/organizations"
              className="flex items-center gap-3 px-3 py-2 rounded-lg text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground transition-colors"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-4m-5-4h.01M9 16h.01M9 12h.01M9 8h.01" />
              </svg>
              {t("Organizations")}
            </a>
            <a
              href="/admin/subscriptions"
              className="flex items-center gap-3 px-3 py-2 rounded-lg text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground transition-colors"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h10a2 2 0 012 2v13a2 2 0 01-2 2z" />
              </svg>
              {t("Subscriptions")}
            </a>
            <a
              href="/admin/whatsapps"
              className="flex items-center gap-3 px-3 py-2 rounded-lg text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground transition-colors"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9 9 0 01-9-9c0-4.418 4.03-8 9-8s9 3.582 9 8zM3.6 15.8a.6.6 0 01.6-.6h2.4a.6.6 0 01.6.6v1.2a.6.6 0 01-.6.6H4.2a.6.6 0 01-.6-.6v-1.2zM8.4 15.8a.6.6 0 01.6-.6h1.2a.6.6 0 01.6.6v2.4a.6.6 0 01-.6.6h-1.2a.6.6 0 01-.6-.6v-2.4z" />
              </svg>
              {t("WhatsApps")}
            </a>
          </nav>
        </div>
      </div>

      {/* Main content */}
      <div className="md:ml-64 p-4 md:p-6 h-full overflow-auto">
        {children}
      </div>
    </div>
  );
}