import { Phone, Mail, MessageCircle } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { trackContact } from "@/lib/meta-pixel";

interface ContactModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function ContactModal({ open, onOpenChange }: ContactModalProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md bg-background rounded-2xl shadow-2xl border-0 top-[10%] translate-y-0 sm:top-[15%]">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-foreground">Kontakt ReinWerk</DialogTitle>
        </DialogHeader>
        <div className="flex flex-col gap-3 pt-2">
          <a
            href="tel:+491632373108"
            onClick={() => {
              trackContact();
            }}
            className="flex items-center gap-4 p-4 rounded-xl border border-border hover:border-primary hover:bg-secondary/50 transition-all group"
          >
            <div className="w-11 h-11 rounded-full bg-primary/10 text-primary flex items-center justify-center group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
              <Phone className="w-5 h-5" />
            </div>
            <div className="flex flex-col">
              <span className="text-xs text-muted-foreground">Telefon</span>
              <span className="text-base font-semibold text-foreground">+49 163 237 3108</span>
            </div>
          </a>

          <a
            href="mailto:info@reinwerk-service.de"
            onClick={() => {
              trackContact();
            }}
            className="flex items-center gap-4 p-4 rounded-xl border border-border hover:border-primary hover:bg-secondary/50 transition-all group"
          >
            <div className="w-11 h-11 rounded-full bg-primary/10 text-primary flex items-center justify-center group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
              <Mail className="w-5 h-5" />
            </div>
            <div className="flex flex-col">
              <span className="text-xs text-muted-foreground">E-Mail</span>
              <span className="text-base font-semibold text-foreground">info@reinwerk-service.de</span>
            </div>
          </a>

          <a
            href="https://api.whatsapp.com/send/?phone=491636986317&text&type=phone_number&app_absent=0"
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => {
              trackContact();
            }}
            className="flex items-center gap-4 p-4 rounded-xl border border-border hover:border-[#25D366] hover:bg-secondary/50 transition-all group"
          >
            <div className="w-11 h-11 rounded-full bg-[#25D366]/10 text-[#25D366] flex items-center justify-center group-hover:bg-[#25D366] group-hover:text-white transition-colors">
              <MessageCircle className="w-5 h-5" />
            </div>
            <div className="flex flex-col">
              <span className="text-xs text-muted-foreground">WhatsApp</span>
              <span className="text-base font-semibold text-foreground">WhatsApp schreiben</span>
            </div>
          </a>
        </div>
      </DialogContent>
    </Dialog>
  );
}
