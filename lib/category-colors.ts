export const categoryColors: Record<string, string> = {
  "§ 86": "bg-pink-200 text-pink-800", // Pink for § 86 StGB
  "§ 86a": "bg-purple-200 text-purple-800", // Purple for § 86a StGB
  "§ 111": "bg-orange-200 text-orange-800", // Orange for § 111 StGB
  "§ 126": "bg-green-200 text-green-800", // Green for § 126 StGB
  "§ 130": "bg-emerald-200 text-emerald-800", // Emerald for § 130 StGB
  "§ 131": "bg-indigo-200 text-indigo-800", // Indigo for § 131 StGB
  "§ 140": "bg-red-200 text-red-800", // Red for § 140 StGB
  "§ 166": "bg-teal-200 text-teal-800", // Teal for § 166 StGB
  "§ 185": "bg-blue-200 text-blue-800", // Blue for § 185 StGB
  "§ 186": "bg-cyan-200 text-cyan-800", // Cyan for § 186 StGB
  "§ 187": "bg-yellow-200 text-yellow-800", // Yellow for § 187 StGB
  "§ 189": "bg-lime-200 text-lime-800", // Lime for § 189 StGB
  "§ 240": "bg-violet-200 text-violet-800", // Violet for StGB
  "§ 241": "bg-rose-200 text-rose-800", // Rose for § 241 StGB
  "Kein Strafbestand": "bg-gray-200 text-gray-800", // Gray for no offense
}

export function getCategoryColor(classification: string): string {
  // Extract the StGB section code from the classification
  const match = classification.match(/§\s*(\d+[a-z]?)/i)
  if (match) {
    const code = `§ ${match[1]}`
    return categoryColors[code] || "bg-gray-200 text-gray-800"
  }

  // Check for "Kein Strafbestand"
  if (classification.includes("Kein Strafbestand")) {
    return categoryColors["Kein Strafbestand"]
  }

  return "bg-gray-200 text-gray-800"
}
