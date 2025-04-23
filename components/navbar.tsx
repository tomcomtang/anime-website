"use client"

import type React from "react"

import { useState, useEffect, useRef } from "react"
import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import { Menu, Search, X, Globe } from "lucide-react"
import { useLanguage } from "@/lib/i18n/language-context"
import type { Language } from "@/lib/i18n/translations"

export default function Navbar() {
  const { t, language, changeLanguage } = useLanguage()
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const [isSearchOpen, setIsSearchOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")
  const [isLanguageMenuOpen, setIsLanguageMenuOpen] = useState(false)
  const pathname = usePathname()
  const router = useRouter()
  const searchInputRef = useRef<HTMLInputElement>(null)
  const languageMenuRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true)
      } else {
        setIsScrolled(false)
      }
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  useEffect(() => {
    // 当搜索框打开时，聚焦输入框
    if (isSearchOpen && searchInputRef.current) {
      searchInputRef.current.focus()
    }
  }, [isSearchOpen])

  useEffect(() => {
    // 点击页面其他地方时关闭语言菜单
    const handleClickOutside = (event: MouseEvent) => {
      if (languageMenuRef.current && !languageMenuRef.current.contains(event.target as Node)) {
        setIsLanguageMenuOpen(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])

  const navLinks = [
    { name: t.nav.home, href: "/" },
    { name: t.nav.latest, href: "/latest" },
    { name: t.nav.popular, href: "/popular" },
    { name: t.nav.weekly, href: "/weekly" },
  ]

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (searchQuery.trim()) {
      router.push(`/search?q=${encodeURIComponent(searchQuery.trim())}`)
      setIsSearchOpen(false)
      setSearchQuery("")
    }
  }

  const languageOptions: { code: Language; name: string }[] = [
    { code: "zh", name: "中文" },
    { code: "en", name: "English" },
    { code: "ja", name: "日本語" },
  ]

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? "bg-gray-900/95 backdrop-blur-sm shadow-lg" : "bg-transparent"
      }`}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <Link href="/" className="flex items-center">
              <span className="text-2xl font-bold text-rose-500">AnimeVerse</span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-8">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`text-sm font-medium transition-colors hover:text-rose-500 ${
                  pathname === link.href ? "text-rose-500" : "text-gray-300"
                }`}
              >
                {link.name}
              </Link>
            ))}
          </nav>

          <div className="hidden md:flex items-center space-x-4">
            {/* 搜索按钮 */}
            <button
              className="p-2 rounded-full hover:bg-gray-800 transition-colors"
              aria-label={t.nav.search}
              onClick={() => setIsSearchOpen(true)}
            >
              <Search className="h-5 w-5" />
            </button>

            {/* 语言切换按钮 */}
            <div className="relative" ref={languageMenuRef}>
              <button
                className="p-2 rounded-full hover:bg-gray-800 transition-colors flex items-center"
                aria-label={t.nav.language}
                onClick={() => setIsLanguageMenuOpen(!isLanguageMenuOpen)}
              >
                <Globe className="h-5 w-5 mr-1" />
                <span className="text-sm uppercase">{language}</span>
              </button>

              {/* 语言选择下拉菜单 */}
              {isLanguageMenuOpen && (
                <div className="absolute right-0 mt-2 w-40 bg-gray-800 rounded-md shadow-lg overflow-hidden z-50">
                  {languageOptions.map((option) => (
                    <button
                      key={option.code}
                      className={`w-full text-left px-4 py-2 text-sm hover:bg-gray-700 transition-colors ${
                        language === option.code ? "text-rose-500" : "text-gray-300"
                      }`}
                      onClick={() => {
                        changeLanguage(option.code)
                        setIsLanguageMenuOpen(false)
                      }}
                    >
                      {option.name}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Mobile Navigation Toggle */}
          <div className="md:hidden flex items-center">
            {/* 移动端搜索按钮 */}
            <button
              className="p-2 rounded-full hover:bg-gray-800 transition-colors mr-1"
              aria-label={t.nav.search}
              onClick={() => setIsSearchOpen(true)}
            >
              <Search className="h-5 w-5" />
            </button>

            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="p-2 rounded-full hover:bg-gray-800 transition-colors"
              aria-label="Toggle Menu"
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* 搜索框覆盖层 */}
      {isSearchOpen && (
        <div className="fixed inset-0 bg-gray-900/95 z-50 flex items-start pt-20 px-4">
          <div className="container mx-auto max-w-2xl">
            <form onSubmit={handleSearchSubmit} className="relative">
              <input
                ref={searchInputRef}
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder={t.search.placeholder}
                className="w-full bg-gray-800 border border-gray-700 rounded-lg py-3 px-4 pr-12 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-rose-500"
              />
              <button type="submit" className="absolute right-4 top-1/2 transform -translate-y-1/2">
                <Search className="h-5 w-5 text-gray-400" />
              </button>
            </form>
            <button
              onClick={() => setIsSearchOpen(false)}
              className="mt-4 text-gray-400 hover:text-white flex items-center"
            >
              <X className="h-4 w-4 mr-1" />
              {t.common.backToHome}
            </button>
          </div>
        </div>
      )}

      {/* Mobile Navigation Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-gray-900 shadow-lg">
          <div className="container mx-auto px-4 py-4">
            <nav className="flex flex-col space-y-4">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`text-sm font-medium transition-colors hover:text-rose-500 ${
                    pathname === link.href ? "text-rose-500" : "text-gray-300"
                  }`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  {link.name}
                </Link>
              ))}

              {/* 移动端语言切换 */}
              <div className="pt-2 border-t border-gray-800">
                <p className="text-sm font-medium text-gray-400 mb-2">{t.nav.language}</p>
                <div className="flex flex-wrap gap-2">
                  {languageOptions.map((option) => (
                    <button
                      key={option.code}
                      className={`px-3 py-1 text-sm rounded-full transition-colors ${
                        language === option.code
                          ? "bg-rose-500 text-white"
                          : "bg-gray-800 text-gray-300 hover:bg-gray-700"
                      }`}
                      onClick={() => {
                        changeLanguage(option.code)
                      }}
                    >
                      {option.name}
                    </button>
                  ))}
                </div>
              </div>
            </nav>
          </div>
        </div>
      )}
    </header>
  )
}
