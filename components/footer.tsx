"use client"

import Link from "next/link"
import { useLanguage } from "@/lib/i18n/language-context"

export default function Footer() {
  const { t } = useLanguage()

  return (
    <footer className="bg-gray-900 border-t border-gray-800">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-xl font-bold text-rose-500 mb-4">AnimeVerse</h3>
            <p className="text-gray-400 text-sm">{t.footer.description}</p>
          </div>

          <div>
            <h4 className="text-white font-medium mb-4">{t.footer.browse}</h4>
            <ul className="space-y-2">
              <li>
                <Link href="/latest" className="text-gray-400 hover:text-rose-500 text-sm">
                  {t.nav.latest}
                </Link>
              </li>
              <li>
                <Link href="/popular" className="text-gray-400 hover:text-rose-500 text-sm">
                  {t.nav.popular}
                </Link>
              </li>
              <li>
                <Link href="/weekly" className="text-gray-400 hover:text-rose-500 text-sm">
                  {t.nav.weekly}
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-medium mb-4">{t.footer.resources}</h4>
            <ul className="space-y-2">
              <li>
                <Link href="#" className="text-gray-400 hover:text-rose-500 text-sm">
                  {t.footer.helpCenter}
                </Link>
              </li>
              <li>
                <Link href="#" className="text-gray-400 hover:text-rose-500 text-sm">
                  {t.footer.aboutUs}
                </Link>
              </li>
              <li>
                <Link href="#" className="text-gray-400 hover:text-rose-500 text-sm">
                  {t.footer.contactUs}
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-medium mb-4">{t.footer.legal}</h4>
            <ul className="space-y-2">
              <li>
                <Link href="#" className="text-gray-400 hover:text-rose-500 text-sm">
                  {t.footer.privacyPolicy}
                </Link>
              </li>
              <li>
                <Link href="#" className="text-gray-400 hover:text-rose-500 text-sm">
                  {t.footer.termsOfService}
                </Link>
              </li>
              <li>
                <Link href="#" className="text-gray-400 hover:text-rose-500 text-sm">
                  {t.footer.cookiePolicy}
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-6 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-500 text-sm">
            &copy; {new Date().getFullYear()} AnimeVerse. {t.footer.copyright}
          </p>
          <div className="mt-4 md:mt-0">
            <p className="text-gray-500 text-sm">
              {t.footer.dataSource}{" "}
              <a href="https://anilist.co" className="hover:text-rose-500" target="_blank" rel="noopener noreferrer">
                AniList
              </a>
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}
