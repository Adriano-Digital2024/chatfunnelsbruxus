import { useState } from "react";
import SectionBody from "@/components/SectionBody";
import SectionHeader from "@/components/SectionHeader";
import { useTranslation } from "@/hooks/useTranslation";
import { useContacts } from "@/queries/useContacts";
import SectionItem from "@/components/SectionItem";
import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { Plus, Contact } from "lucide-react";
import Avatar from "@/components/Avatar";
import { formatPhoneNumber } from "@/utils/FormatUtils";
import SearchBar from "@/components/SearchBar";
import Spinner from "@/components/Spinner";
import Fuse from "fuse.js";

export const Route = createFileRoute("/_auth/contacts/")({
  component: ListContacts,
});

function ListContacts() {
  const { translate: t } = useTranslation();
  const navigate = useNavigate();
  const { data: contacts, isLoading } = useContacts();
  const [search, setSearch] = useState("");

  let filtered = contacts ?? [];
  if (search) {
    const fuse = new Fuse(filtered, {
      threshold: 0.4,
      keys: ["name", "addresses.address"],
    });
    filtered = fuse.search(search).map((r) => r.item);
  }

  return (
    <>
      <SectionHeader title={t("Contactos")} />

      <SearchBar
        value={search}
        onChange={setSearch}
        placeholder={t("Buscar contactos")}
      />

      <SectionBody>
        <SectionItem
          title={t("Agregar contacto")}
          aside={
            <div className="p-[8px] bg-primary/10 rounded-full">
              <Plus className="w-[24px] h-[24px] text-primary" />
            </div>
          }
          onClick={() =>
            navigate({
              to: "/contacts/new",
              hash: (prevHash) => prevHash!,
            })
          }
        />
        {isLoading ? (
          <div className="flex items-center justify-center gap-2 text-muted-foreground text-sm p-6">
            <Spinner size={16} />
            {t("Cargando...")}
          </div>
        ) : !search && filtered.length === 0 ? (
          <div className="flex flex-col items-center gap-3 py-[32px] text-center">
            <Contact className="w-10 h-10 text-muted-foreground" />
            <p className="text-muted-foreground text-[14px]">
              {t("No hay contactos aún. Agregá tu primer contacto.")}
            </p>
          </div>
        ) : search && filtered.length === 0 ? (
          <div className="py-[32px] text-center text-muted-foreground text-[14px]">
            {t("Sin resultados para")} "{search}"
          </div>
        ) : (
          filtered.map((contact) => (
          <SectionItem
            key={contact.id}
            title={contact.name || t("Sin nombre")}
            description={contact.addresses?.at(0)?.address ? formatPhoneNumber(contact.addresses.at(0)!.address) : t("Sin dirección")}
            aside={
              <Avatar
                fallback={contact.name?.substring(0, 2).toUpperCase() || "?"}
                size={40}
                className="bg-muted text-muted-foreground"
              />
            }
            onClick={() =>
              navigate({
                to: `/contacts/${contact.id}`,
                hash: (prevHash) => prevHash!,
              })
            }
          />
        ))}
      </SectionBody>
    </>
  );
}
