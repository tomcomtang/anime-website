"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"
import { type Language, getTranslation, type Translations } from "./translations"

interface LanguageContextType {
  language: Language
  t: Translations
  changeLanguage: (lang: Language) => void
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined)

export function LanguageProvider({ children }: { children: ReactNode }) {
  // 默认语言为中文，尝试从localStorage获取保存的语言设置
  const [language, setLanguage] = useState<Language>("zh")
  const [translations, setTranslations] = useState<Translations>(getTranslation("zh"))

  // 在客户端初始化时，尝试从localStorage获取语言设置
  useEffect(() => {
    const savedLanguage = localStorage.getItem("language") as Language
    if (savedLanguage && ["zh", "en", "ja"].includes(savedLanguage)) {
      setLanguage(savedLanguage)
      setTranslations(getTranslation(savedLanguage))
    }
  }, [])

  // 切换语言的函数
  const changeLanguage = (lang: Language) => {
    setLanguage(lang)
    setTranslations(getTranslation(lang))
    localStorage.setItem("language", lang)
  }

  return (
    <LanguageContext.Provider value={{ language, t: translations, changeLanguage }}>
      {children}
    </LanguageContext.Provider>
  )
}

// 自定义hook，用于在组件中获取语言上下文
export function useLanguage() {
  const context = useContext(LanguageContext)
  if (context === undefined) {
    throw new Error("useLanguage must be used within a LanguageProvider")
  }
  return context
}
