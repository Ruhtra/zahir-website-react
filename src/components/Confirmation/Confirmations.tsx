import * as Dialog from "@radix-ui/react-dialog";

import "./Confirmation.css"

export function Confirmation({ children }) {
    return (
        <>
            <Dialog.Root>
                <Dialog.Trigger>
                    {children}
                </Dialog.Trigger>
                <Dialog.Portal>
                    <Dialog.Overlay className="OverlayConfirmation" />
                    <Dialog.Content className="ContentConfirmation">
                        Realmente excluir esse item?
                        <div className="btns">

                            <div className="btn success">Sim</div>
                            <Dialog.Close asChild>
                                <div className="btn cancel">Não</div>
                            </Dialog.Close>
                        </div>
                    </Dialog.Content>
                </Dialog.Portal>
            </Dialog.Root>
        </>
    )
}