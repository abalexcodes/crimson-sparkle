import * as React from "react"
import { cn } from "@/lib/utils"

interface Tab {
  title: string
  icon: React.ComponentType<{ className?: string }>
  type?: never
}

interface Separator {
  type: "separator"
  title?: never
  icon?: never
}

type TabItem = Tab | Separator

interface ExpandedTabsProps {
  tabs: TabItem[]
  activeColor?: string
  className?: string
  onTabClick?: (title: string) => void
  activeTab?: string
}

export function ExpandedTabs({ 
  tabs, 
  activeColor = "text-primary", 
  className,
  onTabClick,
  activeTab 
}: ExpandedTabsProps) {
  const firstTab = tabs.find((tab): tab is Tab => tab.type !== "separator")
  const [selectedTab, setSelectedTab] = React.useState(activeTab || firstTab?.title || "")

  const handleTabClick = (title: string) => {
    setSelectedTab(title)
    onTabClick?.(title)
  }

  return (
    <div className={cn(
      "flex items-center gap-1 p-1 bg-muted/50 rounded-lg border backdrop-blur-sm",
      className
    )}>
      {tabs.map((item, index) => {
        if (item.type === "separator") {
          return (
            <div
              key={`separator-${index}`}
              className="w-px h-6 bg-border mx-1"
            />
          )
        }

        const tabItem = item as Tab
        const isActive = selectedTab === tabItem.title
        const IconComponent = tabItem.icon

        return (
          <button
            key={tabItem.title}
            onClick={() => handleTabClick(tabItem.title)}
            className={cn(
              "flex items-center gap-2 px-3 py-2 rounded-md text-sm font-medium transition-all duration-200",
              "hover:bg-accent hover:text-accent-foreground",
              isActive ? `${activeColor} bg-background shadow-sm` : "text-muted-foreground"
            )}
          >
            <IconComponent className="w-4 h-4" />
            <span className="whitespace-nowrap">{tabItem.title}</span>
          </button>
        )
      })}
    </div>
  )
}