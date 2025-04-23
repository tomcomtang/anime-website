// 多语言翻译文件

export type Language = "zh" | "en" | "ja"

export interface Translations {
  // 导航栏
  nav: {
    home: string
    latest: string
    popular: string
    weekly: string
    search: string
    language: string
  }

  // 首页
  home: {
    latestAnime: string
    popularAnime: string
    weeklyUpdates: string
    viewAll: string
    watchNow: string
    details: string
  }

  // 动漫详情
  anime: {
    episodes: string
    status: {
      releasing: string
      finished: string
      notYetReleased: string
      unknown: string
    }
    firstAirDate: string
    score: string
    popularity: string
    synopsis: string
    studios: string
    watchNow: string
    episodeList: string
    episode: string
  }

  // 观看页面
  watch: {
    episode: string
    details: string
    previousEpisode: string
    nextEpisode: string
    videoPlaceholder: string
    videoPlaceholderDesc: string
  }

  // 搜索
  search: {
    title: string
    placeholder: string
    noResults: string
    results: string
  }

  // 页脚
  footer: {
    description: string
    browse: string
    resources: string
    helpCenter: string
    aboutUs: string
    contactUs: string
    legal: string
    privacyPolicy: string
    termsOfService: string
    cookiePolicy: string
    copyright: string
    dataSource: string
  }

  // 通用
  common: {
    loading: string
    noData: string
    notFound: string
    notFoundDesc: string
    backToHome: string
  }
}

export const translations: Record<Language, Translations> = {
  // 中文翻译
  zh: {
    nav: {
      home: "首页",
      latest: "最新",
      popular: "最受欢迎",
      weekly: "同步每周更新",
      search: "搜索",
      language: "语言",
    },
    home: {
      latestAnime: "最新动漫",
      popularAnime: "最受欢迎",
      weeklyUpdates: "同步每周更新",
      viewAll: "查看全部",
      watchNow: "立即观看",
      details: "详情",
    },
    anime: {
      episodes: "集数",
      status: {
        releasing: "连载中",
        finished: "已完结",
        notYetReleased: "即将上映",
        unknown: "未知状态",
      },
      firstAirDate: "首播日期",
      score: "评分",
      popularity: "人气",
      synopsis: "简介",
      studios: "制作公司",
      watchNow: "开始观看",
      episodeList: "剧集列表",
      episode: "第 {number} 集",
    },
    watch: {
      episode: "第 {number} 集",
      details: "详情",
      previousEpisode: "上一集",
      nextEpisode: "下一集",
      videoPlaceholder: "视频播放器占位符",
      videoPlaceholderDesc: "由于版权限制，此处仅作为示例展示",
    },
    search: {
      title: "搜索动漫",
      placeholder: "输入动漫名称...",
      noResults: "未找到相关动漫",
      results: "搜索结果",
    },
    footer: {
      description: "发现最新、最热门的动漫内容，随时随地观看您喜爱的动漫。",
      browse: "浏览",
      resources: "资源",
      helpCenter: "帮助中心",
      aboutUs: "关于我们",
      contactUs: "联系我们",
      legal: "法律",
      privacyPolicy: "隐私政策",
      termsOfService: "使用条款",
      cookiePolicy: "Cookie 政策",
      copyright: "保留所有权利。",
      dataSource: "数据来源:",
    },
    common: {
      loading: "加载中...",
      noData: "暂无数据",
      notFound: "页面未找到",
      notFoundDesc: "您访问的页面不存在或已被移除",
      backToHome: "返回首页",
    },
  },

  // 英文翻译
  en: {
    nav: {
      home: "Home",
      latest: "Latest",
      popular: "Popular",
      weekly: "Weekly Updates",
      search: "Search",
      language: "Language",
    },
    home: {
      latestAnime: "Latest Anime",
      popularAnime: "Popular Anime",
      weeklyUpdates: "Weekly Updates",
      viewAll: "View All",
      watchNow: "Watch Now",
      details: "Details",
    },
    anime: {
      episodes: "Episodes",
      status: {
        releasing: "Releasing",
        finished: "Finished",
        notYetReleased: "Coming Soon",
        unknown: "Unknown",
      },
      firstAirDate: "First Air Date",
      score: "Score",
      popularity: "Popularity",
      synopsis: "Synopsis",
      studios: "Studios",
      watchNow: "Watch Now",
      episodeList: "Episode List",
      episode: "Episode {number}",
    },
    watch: {
      episode: "Episode {number}",
      details: "Details",
      previousEpisode: "Previous",
      nextEpisode: "Next",
      videoPlaceholder: "Video Player Placeholder",
      videoPlaceholderDesc: "This is just a demo due to copyright restrictions",
    },
    search: {
      title: "Search Anime",
      placeholder: "Enter anime name...",
      noResults: "No anime found",
      results: "Search Results",
    },
    footer: {
      description: "Discover the latest and most popular anime content, watch your favorite anime anytime, anywhere.",
      browse: "Browse",
      resources: "Resources",
      helpCenter: "Help Center",
      aboutUs: "About Us",
      contactUs: "Contact Us",
      legal: "Legal",
      privacyPolicy: "Privacy Policy",
      termsOfService: "Terms of Service",
      cookiePolicy: "Cookie Policy",
      copyright: "All rights reserved.",
      dataSource: "Data source:",
    },
    common: {
      loading: "Loading...",
      noData: "No data available",
      notFound: "Page Not Found",
      notFoundDesc: "The page you are looking for does not exist or has been removed",
      backToHome: "Back to Home",
    },
  },

  // 日文翻译
  ja: {
    nav: {
      home: "ホーム",
      latest: "最新",
      popular: "人気",
      weekly: "週間更新",
      search: "検索",
      language: "言語",
    },
    home: {
      latestAnime: "最新アニメ",
      popularAnime: "人気アニメ",
      weeklyUpdates: "週間更新",
      viewAll: "すべて見る",
      watchNow: "今すぐ見る",
      details: "詳細",
    },
    anime: {
      episodes: "エピソード",
      status: {
        releasing: "放送中",
        finished: "完結",
        notYetReleased: "近日公開",
        unknown: "不明",
      },
      firstAirDate: "初回放送日",
      score: "スコア",
      popularity: "人気度",
      synopsis: "あらすじ",
      studios: "制作会社",
      watchNow: "視聴開始",
      episodeList: "エピソード一覧",
      episode: "第{number}話",
    },
    watch: {
      episode: "第{number}話",
      details: "詳細",
      previousEpisode: "前のエピソード",
      nextEpisode: "次のエピソード",
      videoPlaceholder: "動画プレーヤーのプレースホルダー",
      videoPlaceholderDesc: "著作権の制限により、これはデモ表示のみです",
    },
    search: {
      title: "アニメを検索",
      placeholder: "アニメ名を入力...",
      noResults: "アニメが見つかりません",
      results: "検索結果",
    },
    footer: {
      description: "最新かつ最も人気のあるアニメコンテンツを発見し、いつでもどこでもお気に入りのアニメを視聴できます。",
      browse: "ブラウズ",
      resources: "リソース",
      helpCenter: "ヘルプセンター",
      aboutUs: "私たちについて",
      contactUs: "お問い合わせ",
      legal: "法的情報",
      privacyPolicy: "プライバシーポリシー",
      termsOfService: "利用規約",
      cookiePolicy: "Cookieポリシー",
      copyright: "すべての権利を保有します。",
      dataSource: "データソース:",
    },
    common: {
      loading: "読み込み中...",
      noData: "データがありません",
      notFound: "ページが見つかりません",
      notFoundDesc: "お探しのページは存在しないか、削除されました",
      backToHome: "ホームに戻る",
    },
  },
}

// 获取特定语言的翻译
export function getTranslation(lang: Language): Translations {
  return translations[lang]
}

// 格式化带有参数的翻译文本
export function formatTranslation(text: string, params: Record<string, string | number>): string {
  return Object.entries(params).reduce((result, [key, value]) => {
    return result.replace(`{${key}}`, String(value))
  }, text)
}
