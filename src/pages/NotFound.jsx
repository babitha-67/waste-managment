import React from "react";
import { useTranslation } from "react-i18next";

export default function NotFound() {

  const { t } = useTranslation();
  return (
    <div className="min-h-screen flex items-center justify-center bg-red-50">
      <h1 className="text-3xl font-bold text-red-600">{t("not_found_title")}</h1>
    </div>
  );
}