"use client"

import * as React from "react"
import { useTheme } from "next-themes"
import { motion } from "framer-motion"
import { Sun, Moon } from 'lucide-react'

export function ModeToggle() {
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = React.useState(false)

  // Avoid hydration mismatch
  React.useEffect(() => setMounted(true), [])
  if (!mounted) return null

  const toggleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light")
  }

  return (
    <button
      onClick={toggleTheme}
      className="relative h-8 w-14 rounded-full bg-green-200 dark:bg-green-800 transition-colors duration-200"
    >
      <motion.div
        className="absolute left-0 top-0 h-8 w-8 rounded-full bg-white shadow-md"
        layout
        transition={{ type: "spring", stiffness: 700, damping: 30 }}
        animate={{
          x: theme === "dark" ? 24 : 0
        }}
      >
        <div className="absolute inset-0 flex items-center justify-center text-green-600 dark:text-green-400">
          {theme === "dark" ? <Moon size={18} /> : <Sun size={18} />}
        </div>
      </motion.div>
    </button>
  )
}

