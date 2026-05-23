import { useTranslation } from "@/hooks/useTranslation";
import { LinkButton } from "@/components/LinkButton";
import { MessageSquarePlus } from "lucide-react";

export default function Header() {
  const { translate: t } = useTranslation();

  return (
    <div className="header flex justify-between w-full">
      <div className="flex items-center truncate">
        <img src="/logo.png" alt="FlowAction" className="h-10 w-auto" />
      </div>
      <div className="flex justify-end">
        <LinkButton
          to="/conversations/new"
          className="ml-[10px]"
          title={t("Nueva conversación")}
        >
          <MessageSquarePlus className="w-[24px] h-[24px] text-foreground" />
        </LinkButton>
      </div>
    </div>
  );
}
