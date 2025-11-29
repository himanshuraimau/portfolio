"use client"

import { SocialIcons } from "./social-icons"

export function HeroSocialBar() {
  return (
    <div className="flex flex-col items-center gap-4">

        {/* The Bar */}
        <div className="px-6 py-3 rounded-full border border-border/50 bg-background/50 backdrop-blur-sm shadow-sm hover:shadow-md hover:border-primary/30 transition-all duration-500">
            <SocialIcons iconSize={22} />
        </div>
    </div>
  )
}