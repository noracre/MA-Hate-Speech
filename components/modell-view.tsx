"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts"
import Image from "next/image"
import Link from "next/link"

// Data
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
  ["Kein Strafbestand", 11, 29, 33, 21, 26, 49, 23, 27, 576, 267, 0, 0, 12, 18],
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

const getHeatmapColor = (value: number, rowIndex: number, colIndex: number) => {
  if (rowIndex === colIndex) {
    const intensity = Math.min(value / 500, 1)
    return `rgba(34, 197, 94, ${0.3 + intensity * 0.7})`
  } else {
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
  const [activeTab, setActiveTab] = useState<"live" | "test">("live")

  const currentAccuracy =
    languageAccuracy[selectedLanguage as keyof typeof languageAccuracy] || 82

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
      {/* --- Header with Tabs --- */}
      <div className="flex border border-gray-300 rounded-lg overflow-hidden text-center text-xl font-semibold">
        <button
          onClick={() => setActiveTab("live")}
          className={`w-1/2 py-3 ${
            activeTab === "live"
              ? "bg-blue-600 text-white"
              : "bg-gray-100 text-gray-700 hover:bg-gray-200"
          }`}
        >
          Modell Performance seit Inbetriebnahme
        </button>
        <button
          onClick={() => setActiveTab("test")}
          className={`w-1/2 py-3 ${
            activeTab === "test"
              ? "bg-blue-600 text-white"
              : "bg-gray-100 text-gray-700 hover:bg-gray-200"
          }`}
        >
          Modell Performance auf Testdaten
        </button>
      </div>

      <div className="text-sm text-gray-600 mb-4">
        Ihr Team hat bisher <strong>7829</strong> Instanzen kategorisiert. Sie haben davon{" "}
        <strong>1652</strong> Instanzen kategorisiert.
      </div>

      {activeTab === "live" && (
        <>
          {/* Charts Row */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* --- Accuracy Card --- */}
            <Card>
              <CardHeader>
                <CardTitle
                  className="text-lg font-semibold"
                  title="Dieses Kreisdiagramm zeigt, wie viele Instanzen insgesamt der richtigen Kategorie zugeordnet wurden."
                >
                  Genauigkeit
                </CardTitle>
              </CardHeader>
              <CardContent>
                {/* Selects inside the card */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mb-4">
                  <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Für Kategorie anzeigen" />
                    </SelectTrigger>
                    <SelectContent>
                      {headers.map((cat) => (
                        <SelectItem key={cat} value={cat}>
                          {cat}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>

                  <Select value={selectedLanguage} onValueChange={setSelectedLanguage}>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Für Sprache anzeigen" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Deutsch">Deutsch</SelectItem>
                      <SelectItem value="Englisch">Englisch</SelectItem>
                      <SelectItem value="Französisch">Französisch</SelectItem>
                      <SelectItem value="Turkish">Turkish</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Pie Chart */}
                <div className="h-64 relative">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie data={accuracyData} cx="50%" cy="50%" innerRadius={60} outerRadius={100} dataKey="value">
                        {accuracyData.map((entry, i) => (
                          <Cell key={i} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip />
                    </PieChart>
                  </ResponsiveContainer>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-2xl font-bold text-blue-500">{currentAccuracy}%</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* --- False Negatives Card --- */}
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
                        {falseNegativeData.map((entry, i) => (
                          <Cell key={i} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip />
                    </PieChart>
                  </ResponsiveContainer>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-2xl font-bold text-red-500">32%</div>
                  </div>
                </div>

                {/* Button now inside this card */}
                <Button className="mt-4 bg-blue-600 hover:bg-blue-700 text-white">
                  Neue Evaluationsrunde starten
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Confusion Matrix */}
          <Card>
            <CardHeader>
              <CardTitle
                className="text-lg font-semibold"
                title="Diese Konfusionsmatrix zeigt, wie Instanzen seit de Einführung zugeordnet wurden. Die Zeilen entsprechen der Zuordnung durch Menschen, die Spalten der Zuordnung durch das KI-Modell. Grüne Zellen auf der diagonalen wurden richtig zugeordnet, andere Zellen wurden falsch zugeordnet. "
              >
                Zuordnungen
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="border-collapse">
                  <thead>
                    <tr>
                      <th className="w-32"></th>
                      {headers.map((header, i) => (
                        <th key={i} className="relative w-16 h-24 border border-gray-300 text-xs font-normal text-gray-700">
                          <div className="absolute inset-0 flex items-center justify-center text-center">
                            <span className="inline-block transform -rotate-45 whitespace-nowrap">{header}</span>
                          </div>
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {confusionMatrixData.map((row, r) => (
                      <tr key={r}>
                        <td className="p-2 text-xs border border-gray-300 bg-gray-50">{row[0]}</td>
                        {(row.slice(1) as number[]).map((val, c) => (
                          <td
                            key={c}
                            className="w-16 h-8 text-xs text-center border border-gray-300"
                            style={{ backgroundColor: getHeatmapColor(val, r, c) }}
                          >
                            {val}
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </>
      )}

      {activeTab === "test" && (
        <Card>
          <CardHeader>
            <CardTitle>Modell Performance auf Testdaten</CardTitle>
          </CardHeader>
          <CardContent className="text-sm text-gray-600">
            Hier könnten Sie dieselben Metriken für ein festes Test-Set anzeigen.
          </CardContent>
        </Card>
      )}
    </div>
  )
}
