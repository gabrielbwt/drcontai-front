interface ModalProps {
    show: boolean;
    children: React.ReactNode;
    setShow: (show: boolean) => void;
}

export default function Modal({ show, setShow, children }: ModalProps) {
    if (!show) return null;

    return (
        <div className="flex-1">
            <div
                className="w-screen h-full fixed inset-0 bg-black opacity-50 z-[60]"
                onClick={() => setShow(false)}
                aria-hidden="true"
            />
            <div
                className="w-fit h-fit rounded-lg bg-white opacity-100 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-[60]"
                onClick={(e) => e.stopPropagation()}
                role="dialog"
                aria-modal="true"
                aria-labelledby="modal-title"
                aria-describedby="modal-description"
            >
                {children}
            </div>
        </div>
    );
}
