// src/components/Layout.jsx
import React from "react";
import { Outlet } from "react-router-dom";
import LanguageSelector from "./LanguageSelector";
import { useTranslation } from "react-i18next";


export default function Layout() {

    const { t } = useTranslation();

  return (
    <div className="min-h-screen flex flex-col">
      
      <header className="bg-green-700 text-white px-4 py-3 flex justify-end gap-3">
      <h3 className="text-lg">{t("choose_language")}</h3>
        <LanguageSelector />
      </header>

      
      <main className="flex-grow">
        <Outlet />
      </main>
    </div>
  );
}
