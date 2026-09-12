"use client";

import { useEffect } from "react";
import { createPortal } from "react-dom";

type ModalProps = {
  open: boolean;
  onClose: () => void;
  children: React.ReactNode;
  labelId?: string;
  maxWidth?: string;
};

export function Modal({
  open,
  onClose,
  children,
  labelId,
  maxWidth = "max-w-md",
}: ModalProps) {
  useEffect(() => {
    if (!open) return;

    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") onClose();
    }

    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKeyDown);

    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [open, onClose]);

  if (!open) return null;

  return createPortal(
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center overflow-y-auto p-4 sm:p-6"
      role="dialog"
      aria-modal="true"
      aria-labelledby={labelId}
    >
      <button
        type="button"
        aria-label="Close"
        className="fixed inset-0 bg-slate-950/75 backdrop-blur-sm"
        onClick={onClose}
      />

      <div className={`relative my-auto w-full ${maxWidth}`}>{children}</div>
    </div>,
    document.body,
  );
}
