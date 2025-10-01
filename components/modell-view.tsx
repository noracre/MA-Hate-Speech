"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts"
import Image from "next/image"
import Link from "next/link"

// Confusion matrix data
const confusionMatrixData = [
  ["§ 86 StGB", 80, 3, 6, 8, 18, 6, 3, 9, 50, 25, 1, 9, 6, 4],
  ["§ 86a StGB", 3, 90, 6, 6, 9, 9, 9, 8, 40, 19, 2, 0, 0, 3],
  ["§ 111 StGB", 3, 4, 201, 6, 4, 9, 221, 0, 20, 10, 1, 2, 0, 45],
  ["§ 126 StGB", 2, 3, 7, 100, 17, 4, 8, 9, 50, 25, 0, 1, 3, 5],
  ["§ 130 StGB", 4, 5, 7, 7, 413, 9, 7, 8, 19, 9, 0, 0, 2, 6],
  ["§ 131 StGB", 1, 6, 8, 6, 14, 150, 6, 7, 49, 30, 0, 0, 1, 183],
  ["§ 140 StGB", 3, 3, 199, 5, 5, 7, 260, 6, 18, 10, 3, 0, 0, 6],
  ["§ 166 StGB", 2, 3, 8, 6, 1, 7, 8, 230, 19, 5, 2, 2, 0, 7],
  ["§ 185 StGB", 1, 7, 8, 7, 0, 6, 7, 8, 1582, 199, 1, 1, 0, 8],
  ["§ 186 StGB", 1, 8, 8, 6, 4, 5, 6, 6, 0, 502, 5, 1, 0, 8],
  ["§ 187 StGB", 1, 3, 46, 5, 7, 5, 87, 7, 15, 5, 260, 0, 1, 6],
  ["§ 189 StGB", 3, 3, 6, 5, 45, 8, 9, 9, 90, 45, 2, 3, 4, 4],
  ["§ 240 StGB", 3, 3, 56, 6, 50, 7, 6, 8, 100, 54, 0, 1, 0, 7],
  ["§ 241 StGB", 3, 3, 7, 9, 12, 123, 5, 6, 15, 100, 1, 0, 3, 190],
  ["Nichts", 11, 29, 33, 21, 26, 49, 23, 27, 576, 267, 0, 0, 12, 18],
]

const headers = [
  "§ 86 StGB",
  "§ 86a StGB",
  "§ 111 StGB",
  "§ 126 StGB",
  "§ 130 StGB",
  "§ 131 StGB",
  "§ 140 StGB",
  "§ 166 StGB",
  "§ 185 StGB",
  "§ 186 StGB",
  "§ 187 StGB",
  "§ 189 StGB",
  "§ 240 StGB",
  "§ 241 StGB",
]

// Get color intensity based on value
const getHeatmapColor = (value: number, rowIndex: number, colIndex: number) => {
  if (rowIndex === colIndex) {
    // Diagonal cells (correct classifications) - green
    const intensity = Math.min(value / 500, 1)
    return `rgba(34, 197, 94, ${0.3 + intensity * 0.7})`
  } else {
    // Off-diagonal cells (misclassifications) - red
    const intensity = Math.min(value / 200, 1)
    return `rgba(239, 68, 68, ${0.1 + intensity * 0.6})`
  }
}

const languageAccuracy = {
  Deutsch: 82,
  Englisch: 70,
  Französisch: 32,
  Turkish: 20,
}

export default function ModellView() {
  const [selectedLanguage, setSelectedLanguage] = useState("Deutsch")
  const [selectedCategory, setSelectedCategory] = useState("")

  const currentAccuracy = languageAccuracy[selectedLanguage as keyof typeof languageAccuracy] || 82

  const falseNegativeData = [
    { name: "Fälschlicherweise nicht klassifizierte Instanzen", value: 32, color: "#ef4444" },
    { name: "Richtig nicht klassifizierte Instanzen", value: 68, color: "#e5e7eb" },
  ]

  const accuracyData = [
    { name: "Richtig klassifizierte Instanzen", value: currentAccuracy, color: "#3b82f6" },
    { name: "Alle klassifizierte Instanzen", value: 100 - currentAccuracy, color: "#e5e7eb" },
  ]

  return (
    <div className="max-w-7xl mx-auto p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900">Überblick - Modell Performance</h1>
      </div>

      <div className="text-sm text-gray-600 mb-4">Falsche Zuordnung</div>
      <div className="text-sm text-gray-600 mb-4">
        Ihr Team hat bisher <strong>7829</strong> Instanzen kategorisiert. Sie haben davon <strong>1652</strong>{" "}
        Instanzen kategorisiert.
      </div>

      {/* Confusion Matrix Heatmap */}
      <Card>
        <CardContent className="p-6">
          <div className="overflow-x-auto">
            <div
              className="inline-block min-w-full"
              title="Diese Konfusionsmatrix zeigt, wie Instanzen seit de Einführung zugeordnet wurden. Die Zeilen entsprechen der Zuordnung durch Menschen, die Spalten der Zuordnung durch das KI-Modell. Grüne Zellen auf der diagonalen wurden richtig zugeordnet, andere Zellen wurden falsch zugeordnet."
            >
              <table className="border-collapse">
                <thead>
                  <tr>
                    <th className="w-32 p-2 text-xs font-medium text-gray-700 border border-gray-300"></th>
                    {headers.map((header, index) => (
                      <th
                        key={index}
                        className="w-16 p-2 text-xs font-medium text-gray-700 border border-gray-300 transform -rotate-45 origin-bottom-left"
                      >
                        <div className="w-20 h-16 flex items-center justify-center text-center">
                          <span className="whitespace-nowrap">{header}</span>
                        </div>
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {confusionMatrixData.map((row, rowIndex) => (
                    <tr key={rowIndex}>
                      <td className="p-2 text-xs font-medium text-gray-700 border border-gray-300 bg-gray-50">
                        {row[0]}
                      </td>
                      {(row.slice(1) as number[]).map((value, colIndex) => (
                        <td
                          key={colIndex}
                          className="w-16 h-8 p-1 text-xs text-center border border-gray-300"
                          style={{
                            backgroundColor: getHeatmapColor(value, rowIndex, colIndex),
                          }}
                        >
                          {value}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* False Negatives Chart */}
        <Card>
          <CardHeader>
            <CardTitle
              className="text-lg font-semibold"
              title="Dieses Kreisdiagramm zeigt, wie viele Instanzen bei der letzten Evaluationsrunde gefunden wurden, die fälschlicherweise keiner Kategorie zugeordnet wurden."
            >
              Falsche Negative
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-64 relative">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie data={falseNegativeData} cx="50%" cy="50%" innerRadius={60} outerRadius={100} dataKey="value">
                    {falseNegativeData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center">
                  <div className="text-2xl font-bold text-red-500">32%</div>
                </div>
              </div>
            </div>
            <div className="mt-4 space-y-2">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-red-500 rounded"></div>
                <span className="text-sm">Fälschlicherweise nicht klassifizierte Instanzen</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-gray-300 rounded"></div>
                <span className="text-sm">Richtig nicht klassifizierte Instanzen</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Accuracy Chart */}
        <Card>
          <CardHeader>
            <CardTitle
              className="text-lg font-semibold"
              title="Dieses Kreisdiagramm zeigt, wie viele Instanzen insgesamt der richtigen Kategorie zugeordnet wurden."
            >
              Vertrauens-Genauigkeit
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-64 relative">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie data={accuracyData} cx="50%" cy="50%" innerRadius={60} outerRadius={100} dataKey="value">
                    {accuracyData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center">
                  <div className="text-2xl font-bold text-blue-500">{currentAccuracy}%</div>
                </div>
              </div>
            </div>
            <div className="mt-4 space-y-2">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-blue-500 rounded"></div>
                <span className="text-sm">Richtig klassifizierte Instanzen</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-gray-300 rounded"></div>
                <span className="text-sm">Alle klassifizierte Instanzen</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Action Buttons */}
      <div className="flex gap-4">
        <Button className="bg-blue-600 hover:bg-blue-700 text-white">Neue Evaluationsrunde starten</Button>
        <div className="flex gap-2">
          <Select value={selectedLanguage} onValueChange={setSelectedLanguage}>
            <SelectTrigger className="w-48">
              <SelectValue placeholder="Für Sprache zeigen" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Deutsch">Deutsch</SelectItem>
              <SelectItem value="Englisch">Englisch</SelectItem>
              <SelectItem value="Französisch">Französisch</SelectItem>
              <SelectItem value="Turkish">Turkish</SelectItem>
            </SelectContent>
          </Select>
          <Select value={selectedCategory} onValueChange={setSelectedCategory}>
            <SelectTrigger className="w-48">
              <SelectValue placeholder="Für Kategorie zeigen" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="§ 86 StGB">§ 86 StGB</SelectItem>
              <SelectItem value="§ 86a StGB">§ 86a StGB</SelectItem>
              <SelectItem value="§ 111 StGB">§ 111 StGB</SelectItem>
              <SelectItem value="§ 126 StGB">§ 126 StGB</SelectItem>
              <SelectItem value="§ 130 StGB">§ 130 StGB</SelectItem>
              <SelectItem value="§ 131 StGB">§ 131 StGB</SelectItem>
              <SelectItem value="§ 140 StGB">§ 140 StGB</SelectItem>
              <SelectItem value="§ 166 StGB">§ 166 StGB</SelectItem>
              <SelectItem value="§ 185 StGB">§ 185 StGB</SelectItem>
              <SelectItem value="§ 186 StGB">§ 186 StGB</SelectItem>
              <SelectItem value="§ 187 StGB">§ 187 StGB</SelectItem>
              <SelectItem value="§ 189 StGB">§ 189 StGB</SelectItem>
              <SelectItem value="§ 240 StGB">§ 240 StGB</SelectItem>
              <SelectItem value="§ 241 StGB">§ 241 StGB</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Comments Section */}
      <Card>
        <CardHeader>
          <CardTitle>Kommentare zu Modell und Trainingsdaten</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex gap-3">
            <Image src="/icon-classifier.png" alt="AI" width={40} height={40} className="rounded-full" />
            <div className="flex-1">
              <div className="font-medium text-sm">KI-Bot</div>
              <div className="text-sm text-gray-600 mt-1">
                Es werden kaum Instanzen als § 187 StGB Verleumdung erkannt, vielleicht müssen wir nochmal
                nachtrainieren.
              </div>
            </div>
          </div>

          <div className="flex gap-3">
            <div className="w-10 h-10 rounded-full overflow-hidden flex-shrink-0">
              <Image src="/icon-user.png" alt="User" width={40} height={40} className="w-full h-full object-cover" />
            </div>
            <div className="flex-1 space-y-3">
              <div>
                <div className="font-medium text-sm">Sie</div>
                <div className="mt-2">
                  <div className="flex gap-2 mb-2">
                    <span className="text-sm">Thema:</span>
                    <input
                      type="text"
                      placeholder="Auswertung"
                      className="flex-1 px-2 py-1 text-sm border border-gray-300 rounded"
                    />
                  </div>
                  <div className="text-sm mb-2">Kommentar:</div>
                  <textarea
                    className="w-full p-2 text-sm border border-gray-300 rounded-lg h-20 resize-none"
                    placeholder="Ihr Kommentar..."
                  />
                  <Button className="mt-2 bg-blue-600 hover:bg-blue-700 text-white">Senden</Button>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
