"use client"

import Link from "next/link"
import { useLanguage } from "@/lib/i18n/language-context"

export default function NotFound() {
  const { t } = useLanguage()

  return (
    <div className="container mx-auto px-4 py-16 pt-32 text-center">
      <h1 className="text-4xl font-bold mb-4">404</h1>
      <h2 className="text-2xl font-bold mb-6">{t.common.notFound}</h2>
      <p className="text-gray-400 mb-8">{t.common.notFoundDesc}</p>
      <Link href="/" className="bg-rose-600 hover:bg-rose-700 text-white px-6 py-3 rounded-md transition-colors">
        {t.common.backToHome}
      </Link>
    </div>
  )
}
