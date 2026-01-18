import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import Icon from "@/components/ui/icon";

interface WelcomeDialogProps {
  showWelcome: boolean;
}

const WelcomeDialog = ({ showWelcome }: WelcomeDialogProps) => {
  return (
    <Dialog open={showWelcome}>
      <DialogContent className="sm:max-w-md bg-gradient-to-br from-primary/20 to-secondary/20 border-2 border-primary/30">
        <DialogTitle className="sr-only">Добро пожаловать</DialogTitle>
        <div className="flex flex-col items-center justify-center text-center py-6">
          <div className="mb-4 text-6xl animate-bounce">🏛️</div>
          <h2 className="text-3xl font-bold text-primary mb-2">
            Добро пожаловать
          </h2>
          <p className="text-lg text-muted-foreground">
            в путеводитель по Казани!
          </p>
          <div className="mt-4 flex gap-2 text-2xl">
            <Icon name="MapPin" className="text-primary animate-pulse" />
            <Icon name="Camera" className="text-secondary animate-pulse delay-100" />
            <Icon name="Heart" className="text-accent animate-pulse delay-200" />
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default WelcomeDialog;
