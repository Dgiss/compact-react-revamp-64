
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Badge } from '@/components/ui/badge';
import { Loader2, CheckCircle, XCircle, Eye, EyeOff } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { 
  getFlespiApiKey, 
  setFlespiApiKey, 
  removeFlespiApiKey, 
  validateFlespiApiKey,
  hasFlespiApiKey 
} from '@/services/ApiConfigService';

interface FlespiConfigDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const FlespiConfigDialog: React.FC<FlespiConfigDialogProps> = ({
  open,
  onOpenChange
}) => {
  const [apiKey, setApiKey] = useState('');
  const [isValidating, setIsValidating] = useState(false);
  const [isValid, setIsValid] = useState<boolean | null>(null);
  const [showApiKey, setShowApiKey] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    if (open) {
      const existingKey = getFlespiApiKey();
      if (existingKey) {
        setApiKey(existingKey);
        // Don't auto-validate on open to avoid unnecessary API calls
      }
    }
  }, [open]);

  const handleValidateKey = async () => {
    if (!apiKey.trim()) {
      toast({
        title: "Erreur",
        description: "Veuillez saisir une clé API",
        variant: "destructive"
      });
      return;
    }

    setIsValidating(true);
    setIsValid(null);

    try {
      const valid = await validateFlespiApiKey(apiKey);
      setIsValid(valid);
      
      if (valid) {
        toast({
          title: "Succès",
          description: "Clé API Flespi valide"
        });
      } else {
        toast({
          title: "Erreur",
          description: "Clé API Flespi invalide ou expirée",
          variant: "destructive"
        });
      }
    } catch (error) {
      console.error('Error validating API key:', error);
      setIsValid(false);
      toast({
        title: "Erreur",
        description: "Erreur lors de la validation de la clé API",
        variant: "destructive"
      });
    } finally {
      setIsValidating(false);
    }
  };

  const handleSaveKey = () => {
    if (!apiKey.trim()) {
      toast({
        title: "Erreur",
        description: "Veuillez saisir une clé API",
        variant: "destructive"
      });
      return;
    }

    if (isValid === false) {
      toast({
        title: "Attention",
        description: "La clé API n'a pas été validée avec succès",
        variant: "destructive"
      });
      return;
    }

    try {
      setFlespiApiKey(apiKey);
      toast({
        title: "Succès",
        description: "Clé API Flespi sauvegardée"
      });
      onOpenChange(false);
    } catch (error) {
      toast({
        title: "Erreur",
        description: "Erreur lors de la sauvegarde de la clé API",
        variant: "destructive"
      });
    }
  };

  const handleRemoveKey = () => {
    removeFlespiApiKey();
    setApiKey('');
    setIsValid(null);
    toast({
      title: "Succès",
      description: "Clé API Flespi supprimée"
    });
  };

  const getStatusBadge = () => {
    if (isValid === true) {
      return <Badge variant="secondary" className="text-green-600"><CheckCircle className="w-3 h-3 mr-1" />Valide</Badge>;
    }
    if (isValid === false) {
      return <Badge variant="destructive"><XCircle className="w-3 h-3 mr-1" />Invalide</Badge>;
    }
    return null;
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Configuration Flespi</DialogTitle>
          <DialogDescription>
            Configurez votre clé API Flespi pour permettre la création et la gestion des devices.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4">
          <Alert>
            <AlertDescription>
              Vous pouvez obtenir votre clé API Flespi depuis votre tableau de bord Flespi dans la section "Tokens".
            </AlertDescription>
          </Alert>

          <div className="space-y-2">
            <Label htmlFor="apiKey">Clé API Flespi</Label>
            <div className="relative">
              <Input
                id="apiKey"
                type={showApiKey ? "text" : "password"}
                value={apiKey}
                onChange={(e) => {
                  setApiKey(e.target.value);
                  setIsValid(null); // Reset validation when key changes
                }}
                placeholder="Saisissez votre clé API Flespi"
                className="pr-10"
              />
              <Button
                type="button"
                variant="ghost"
                size="sm"
                className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                onClick={() => setShowApiKey(!showApiKey)}
              >
                {showApiKey ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </Button>
            </div>
            <div className="flex items-center justify-between">
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={handleValidateKey}
                disabled={isValidating || !apiKey.trim()}
              >
                {isValidating ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : null}
                Valider la clé
              </Button>
              {getStatusBadge()}
            </div>
          </div>

          <div className="flex justify-between space-x-2">
            <div className="flex space-x-2">
              {hasFlespiApiKey() && (
                <Button
                  type="button"
                  variant="outline"
                  onClick={handleRemoveKey}
                >
                  Supprimer
                </Button>
              )}
            </div>
            <div className="flex space-x-2">
              <Button
                type="button"
                variant="outline"
                onClick={() => onOpenChange(false)}
              >
                Annuler
              </Button>
              <Button
                onClick={handleSaveKey}
                disabled={!apiKey.trim()}
              >
                Sauvegarder
              </Button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
