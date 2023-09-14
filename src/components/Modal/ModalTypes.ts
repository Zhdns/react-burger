export interface ModalType {
    title?: string;
    children: React.ReactNode;
    handleClose: () => void;
}
