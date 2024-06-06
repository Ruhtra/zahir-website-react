import * as Dialog from "@radix-ui/react-dialog";


export function EditProfile({ children }) {
    return <>
        <Dialog.Root>
            <Dialog.Trigger>
                { children }
            </Dialog.Trigger>
            <Dialog.Portal>
                <Dialog.Overlay />
                <Dialog.Content>
                    é verdade
                </Dialog.Content>
            </Dialog.Portal>
        </Dialog.Root>
    </>
}