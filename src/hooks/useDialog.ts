import { useEffect, useRef } from "react";

const FOCUSABLE_SELECTOR =
  'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])';

/**
 * Accessible-dialog behaviour for the site's modal overlays:
 * - moves focus into the dialog when it opens,
 * - traps Tab / Shift+Tab inside it while it is open,
 * - closes on Escape,
 * - restores focus to the element that opened it when it closes.
 *
 * Usage: attach the returned ref to the dialog element, and give that
 * element role="dialog", aria-modal="true" and tabIndex={-1}. The
 * caller owns the open state; `onClose` must be stable (useCallback)
 * or at least idempotent.
 */
export function useDialog<T extends HTMLElement>(isOpen: boolean, onClose: () => void) {
  const dialogRef = useRef<T | null>(null);
  const previouslyFocusedRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (!isOpen) return;
    const node = dialogRef.current;
    previouslyFocusedRef.current =
      document.activeElement instanceof HTMLElement ? document.activeElement : null;

    const getFocusable = (): HTMLElement[] => {
      if (!node) return [];
      return Array.from(node.querySelectorAll<HTMLElement>(FOCUSABLE_SELECTOR)).filter(
        (el) => !el.hasAttribute("disabled") && el.offsetParent !== null
      );
    };

    const focusTimer = window.setTimeout(() => {
      const first = getFocusable()[0];
      (first ?? node)?.focus();
    }, 0);

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.preventDefault();
        onClose();
        return;
      }
      if (e.key !== "Tab" || !node) return;
      const focusable = getFocusable();
      if (focusable.length === 0) {
        e.preventDefault();
        node.focus();
        return;
      }
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };

    document.addEventListener("keydown", handleKeyDown, true);
    return () => {
      window.clearTimeout(focusTimer);
      document.removeEventListener("keydown", handleKeyDown, true);
      previouslyFocusedRef.current?.focus?.();
    };
  }, [isOpen, onClose]);

  return dialogRef;
}
