"use client";

import { useEffect } from "react";

export default function ServiceWorkerRegister() {
  useEffect(() => {
    if (typeof navigator === "undefined" || !("serviceWorker" in navigator)) {
      return;
    }
    // Relativ registrieren, damit es auch unter einem Unterpfad
    // (z. B. eisbad.de/eisklar) funktioniert.
    const url = new URL("sw.js", window.location.href).toString();
    navigator.serviceWorker.register(url).catch(() => {
      /* Registrierung fehlgeschlagen - App funktioniert trotzdem online */
    });
  }, []);

  return null;
}
