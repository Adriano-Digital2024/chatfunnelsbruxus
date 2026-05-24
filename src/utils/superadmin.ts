const SUPERADMIN_EMAILS = ["eusouadrianovieira@gmail.com"];

export function isSuperAdmin(email?: string | null): boolean {
  return SUPERADMIN_EMAILS.includes((email ?? "").toLowerCase());
}
