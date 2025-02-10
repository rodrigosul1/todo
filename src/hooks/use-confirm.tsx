import { useState } from "react";

import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogFooter ,DialogHeader, DialogTitle } from "@/components/ui/dialog";

export const useConfirm = (
    title: string,
    message: string,
): [() => React.ReactElement, () => Promise<unknown>] => {
    const [promise, setPromise] = useState<{ resolve: (value: boolean) => void } | null>(null);
    
    const confirm = () => new Promise((resolve, reject) => {
        setPromise({ resolve });
    });

    const handleClose = () => {
        setPromise(null);
    };

    const handleConfirm = () => {
        promise?.resolve(true);
        handleClose();
    };

    const handleCancel = () => {
        promise?.resolve(false);
        handleClose();
    };

    const ConfirmationDialog = () => (
        <Dialog open={promise !== null} onOpenChange={handleClose}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>{title}</DialogTitle>
                    <DialogDescription>{message}</DialogDescription>
                </DialogHeader>
                <DialogFooter className="pt-2 flex justify-end gap-2">
                    <Button onClick={handleCancel}>Cancelar</Button>
                    <Button onClick={handleConfirm} variant="outline">Confirmar</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );

    return [ConfirmationDialog, confirm];
};