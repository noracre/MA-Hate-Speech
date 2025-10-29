"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts"
import { ChevronUp, ChevronDown, MessageCircle, RotateCcw, Info } from "lucide-react"
import { getCategoryColor } from "@/lib/category-colors"

// Data
const confusionMatrixData = [
  ["§ 86 StGB", 80, 3, 6, 8, 18, 6, 3, 9, 50, 125, 1, 9, 6, 4],
  ["§ 86a StGB", 3, 90, 6, 6, 9, 9, 9, 8, 40, 119, 2, 0, 0, 3],
  ["§ 111 StGB", 3, 4, 30, 6, 4, 9, 221, 0, 20, 60, 1, 2, 0, 45],
  ["§ 126 StGB", 2, 3, 107, 40, 17, 4, 8, 9, 500, 75, 0, 1, 3, 5],
  ["§ 130 StGB", 4, 5, 37, 40, 113, 9, 7, 8, 19, 209, 0, 0, 2, 6],
  ["§ 131 StGB", 1, 6, 58, 46, 14, 50, 6, 7, 49, 130, 0, 0, 1, 183],
  ["§ 140 StGB", 3, 3, 199, 5, 5, 7, 60, 6, 180, 40, 3, 0, 0, 6],
  ["§ 166 StGB", 2, 3, 8, 6, 1, 7, 8, 230, 39, 70, 2, 2, 0, 7],
  ["§ 185 StGB", 1, 7, 58, 7, 10, 6, 7, 8, 582, 199, 1, 1, 0, 8],
  ["§ 186 StGB", 1, 8, 8, 6, 14, 5, 6, 6, 150, 502, 5, 1, 0, 8],
  ["§ 187 StGB", 1, 3, 46, 5, 7, 5, 87, 7, 45, 25, 260, 0, 1, 6],
  ["§ 189 StGB", 3, 3, 6, 5, 45, 8, 9, 9, 90, 45, 2, 3, 4, 4],
  ["§ 240 StGB", 3, 3, 56, 6, 50, 7, 6, 8, 100, 54, 0, 1, 0, 7],
  ["§ 241 StGB", 3, 3, 7, 9, 12, 123, 5, 6, 15, 100, 1, 0, 3, 90],
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

const categoryAccuracy = {
  Alle: 82,
  "§ 86 StGB": 9,
  "§ 86a StGB": 12,
  "§ 111 StGB": 50,
  "§ 126 StGB": 11,
  "§ 130 StGB": 75,
  "§ 131 StGB": 10,
  "§ 140 StGB": 59,
  "§ 166 StGB": 60,
  "§ 185 StGB": 98,
  "§ 186 StGB": 80,
  "§ 187 StGB": 60,
  "§ 189 StGB": 0,
  "§ 240 StGB": 0,
  "§ 241 StGB": 50,
}

const languageAccuracy = {
  "Alle": 82,
  Deutsch: 89,
  Englisch: 70,
  Französisch: 32,
  Turkish: 20,
}

const categories = [
  "§ 86 StGB",
  "§ 86a StGB",
  "§ 111 StGB",
  "§ 126 StGB",
  "§ 129a StGB",
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
  "Kein Strafbestand",
]

interface OverviewInstance {
  id: string
  date: string
  content: string
  author: string
  colleagueCommented: boolean
  aiClassification: string
  humanClassification?: string
  instanceFile: string
}

interface ModellViewProps {
  instances: OverviewInstance[];
  onOpenInstanceTab?: (file: string, label: string, type?: "keinStrafbestand" | "nochmal") => void;
}

export default function ModellView({ instances, onOpenInstanceTab }: ModellViewProps) {
  const [selectedLanguage, setSelectedLanguage] = useState("Alle")
  const [selectedCategory, setSelectedCategory] = useState("Alle")
  const [activeTab, setActiveTab] = useState<"live" | "test">("live")
  const [evaluatedSortOrder, setEvaluatedSortOrder] = useState("desc")
  const [evaluatedFilterCategory, setEvaluatedFilterCategory] = useState("alle")

  const langAcc =
    languageAccuracy[selectedLanguage as keyof typeof languageAccuracy] ?? 82
  const catAcc =
    categoryAccuracy[selectedCategory as keyof typeof categoryAccuracy] ?? 82
  const currentAccuracy = (langAcc + catAcc) / 2

  const falseNegativeData = [
    { name: "Fälschlicherweise nicht klassifizierte Instanzen", value: 32, color: "#ef4444" },
    { name: "Richtig nicht klassifizierte Instanzen", value: 68, color: "#e5e7eb" },
  ]

  const accuracyData = [
    { name: "Richtig klassifizierte Instanzen", value: currentAccuracy, color: "#3b82f6" },
    { name: "Alle klassifizierte Instanzen", value: 100 - currentAccuracy, color: "#e5e7eb" },
  ]

  const filterAndSortInstances = (instances: OverviewInstance[], filterCategory: string, sortOrder: string) => {
    let filtered = instances

    if (filterCategory !== "alle") {
      filtered = instances.filter((instance) => {
        const aiMatch = instance.aiClassification.includes(filterCategory)
        const humanMatch = instance.humanClassification?.includes(filterCategory)
        return aiMatch || humanMatch
      })
    }

    return filtered.sort((a, b) => {
      const dateA = new Date(a.date.replace(/(\d{2}):(\d{2}), (\d{2})\. (\w+) (\d{4})/, "$5-$4-$3 $1:$2"))
      const dateB = new Date(b.date.replace(/(\d{2}):(\d{2}), (\d{2})\. (\w+) (\d{4})/, "$5-$4-$3 $1:$2"))
      return sortOrder === "asc" ? dateA.getTime() - dateB.getTime() : dateB.getTime() - dateA.getTime()
    })
  }

  const filteredEvaluatedInstances = filterAndSortInstances(
    instances,
    evaluatedFilterCategory,
    evaluatedSortOrder as "asc" | "desc"
  );

  const resetFilters = () => {
    setEvaluatedSortOrder("desc")
    setEvaluatedFilterCategory("alle")
  }

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

      

      {activeTab === "live" && (
        <>
          {/* Info on Top */}
          <div className="text-sm text-gray-600 mb-4">
            Ihr Team hat bisher <strong>7829</strong> Instanzen kategorisiert. Sie haben davon{" "}
            <strong>{filteredEvaluatedInstances.length}</strong> Instanzen kategorisiert.
          </div>

          {/* Charts Row */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* --- Accuracy Card --- */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg font-semibold">
                  <span className="inline-flex items-center">
                    Genauigkeit
                    <span title="Dieses Kreisdiagramm zeigt, wie viele Instanzen seit der Inbetriebnahme der richtigen Kategorie zugeordnet wurden." className="ml-2 text-gray-400 hover:text-gray-600">
                      <Info className="w-4 h-4 inline" />
                    </span>
                  </span>
                </CardTitle>
              </CardHeader>
              <CardContent>

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

                {/* Selects + Reset */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-4 items-end">
                  {/* Kategorie */}
                  <div>
                    <div className="text-xs text-gray-600 mb-1">Für Kategorie zeigen:</div>
                    <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Für Kategorie anzeigen" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Alle">Alle</SelectItem>
                        {headers.map((cat) => (
                          <SelectItem key={cat} value={cat}>
                            {cat}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Sprache */}
                  <div>
                    <div className="text-xs text-gray-600 mb-1">Für Sprache zeigen:</div>
                    <Select value={selectedLanguage} onValueChange={setSelectedLanguage}>
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Für Sprache anzeigen" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Alle">Alle</SelectItem>
                        <SelectItem value="Deutsch">Deutsch</SelectItem>
                        <SelectItem value="Englisch">Englisch</SelectItem>
                        <SelectItem value="Französisch">Französisch</SelectItem>
                        <SelectItem value="Turkish">Turkish</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Zurücksetzen */}
                  <div className="sm:justify-self-end">
                    <Button
                      variant="outline"
                      className="w-full sm:w-auto"
                      onClick={() => {
                        setSelectedCategory("Alle")
                        setSelectedLanguage("Alle") 
                      }}
                    >
                      <RotateCcw className="w-4 h-4 mr-2" />
                      Zurücksetzen
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* --- False Negatives Card --- */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg font-semibold">
                  <span className="inline-flex items-center">
                    Falsche Negative
                    <span title="Dieses Kreisdiagramm zeigt, wie viele Instanzen bei der letzten Evaluationsrunde gefunden wurden, die fälschlicherweise keiner Kategorie zugeordnet wurden." className="ml-2 text-gray-400 hover:text-gray-600">
                      <Info className="w-4 h-4 inline" />
                    </span>
                  </span>
                </CardTitle>
              </CardHeader>
              <CardContent>

                {/* Pie Chart */}
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
                <Button
                  className="mt-4 bg-blue-600 hover:bg-blue-700 text-white"
                  onClick={() => onOpenInstanceTab?.("instance-6", "7827", "keinStrafbestand")}
                >
                  In Evaluationsrunde nach weiteren falschen Negativen suchen
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Confusion Matrix */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg font-semibold">
                <span className="inline-flex items-center">
                  Zuordnungen
                  <span title="Diese Konfusionsmatrix zeigt, wie Instanzen seit de Einführung zugeordnet wurden. Die Zeilen entsprechen der Zuordnung durch Menschen, die Spalten der Zuordnung durch das KI-Modell. Grüne Zellen auf der diagonalen wurden richtig zugeordnet, andere Zellen wurden falsch zugeordnet." className="ml-2 text-gray-400 hover:text-gray-600">
                    <Info className="w-4 h-4 inline" />
                  </span>
                </span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="relative">
                {/* X-axis label (KI) centered above the headers */}
                <div className="absolute left-1/2 -translate-x-1/2 -top-6 text-sm font-medium text-gray-600">
                  KI
                </div>

                {/* Y-axis label (Mensch) rotated and centered at the left side */}
                <div className="absolute -left-10 top-1/2 -translate-y-1/2 text-sm font-medium text-gray-600 transform -rotate-90 origin-center">
                  Mensch
                </div>

                {/* give left padding so the rotated Y label has space */}
                <div className="overflow-x-auto pl-6">
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
              </div>
            </CardContent>
          </Card>

          {/* Evaluated Instances Section */} 
          <div className="bg-white rounded-lg shadow-sm border border-gray-200">
            <div className="p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-6">Beurteilte Instanzen</h2>

              {/* Filters for evaluated instances */} 
              <div className="flex items-center space-x-4 mb-4">
                <div className="flex items-center space-x-2">
                  <span className="text-sm font-medium text-gray-700">Datum</span>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setEvaluatedSortOrder(evaluatedSortOrder === "asc" ? "desc" : "asc")}
                    className="flex items-center space-x-1"
                  >
                    {evaluatedSortOrder === "asc" ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                  </Button>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="text-sm font-medium text-gray-700">Von KI klassifiziert als</span>
                  <Select value={evaluatedFilterCategory} onValueChange={setEvaluatedFilterCategory}>
                    <SelectTrigger className="w-48">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="alle">Alle</SelectItem>
                      {categories.map((category) => (
                        <SelectItem key={category} value={category}>
                          {category}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="text-sm font-medium text-gray-700">Von Mensch klassifiziert als</span>
                  <Select value={evaluatedFilterCategory} onValueChange={setEvaluatedFilterCategory}>
                    <SelectTrigger className="w-48">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="alle">Alle</SelectItem>
                      {categories.map((category) => (
                        <SelectItem key={category} value={category}>
                          {category}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="flex items-center space-x-2">
                  <Button onClick={resetFilters} variant="outline" className="flex items-center space-x-2 bg-transparent">
                    <RotateCcw className="w-4 h-4" />
                    <span>Zurücksetzen</span>
                  </Button>
                </div>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-gray-200">
                      <th className="text-left py-3 px-4 font-medium text-gray-700">Instanznummer</th>
                      <th className="text-left py-3 px-4 font-medium text-gray-700">Datum</th>
                      <th className="text-left py-3 px-4 font-medium text-gray-700">Inhalt</th>
                      <th className="text-left py-3 px-4 font-medium text-gray-700">Post-Verfasser*in</th>
                      <th className="text-left py-3 px-4 font-medium text-gray-700">Von Kolleg*innen kommentiert</th>
                      <th className="text-left py-3 px-4 font-medium text-gray-700">Von KI klassifiziert als</th>
                      <th className="text-left py-3 px-4 font-medium text-gray-700">Von Mensch klassifiziert als</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    {filteredEvaluatedInstances.map((instance, index) => (
                      <tr
                        key={`${instance.id}-${index}`}
                        className="hover:bg-gray-50 cursor-pointer"
                        onClick={() => onOpenInstanceTab?.(instance.instanceFile, instance.id, "nochmal")}
                      >
                        <td className="py-3 px-4 font-medium text-gray-900">#{instance.id}</td>
                        <td className="py-3 px-4 text-gray-700">{instance.date}</td>
                        <td className="py-3 px-4 text-gray-700 max-w-xs truncate">{instance.content}</td>
                        <td className="py-3 px-4 text-gray-700">{instance.author}</td>
                        <td className="py-3 px-4">
                          <MessageCircle
                            className={`w-5 h-5 ${instance.colleagueCommented ? "text-blue-500 fill-blue-500" : "text-gray-300"}`}
                          />
                        </td>
                        <td className="py-3 px-4">
                          <span
                            className={`px-3 py-1 rounded-full text-sm font-medium ${getCategoryColor(instance.aiClassification)}`}
                          >
                            {instance.aiClassification}
                          </span>
                        </td>
                        <td className="py-3 px-4">
                          {instance.humanClassification ? (
                            <div className="flex flex-wrap gap-2">
                              {instance.humanClassification
                                .split(",")
                                .map((c) => c.trim())
                                .filter(Boolean)
                                .map((c, i) => (
                                  <span
                                    key={`${c}-${i}`}
                                    className={`px-3 py-1 rounded-full text-sm font-medium ${getCategoryColor(c)}`}
                                  >
                                    {c}
                                  </span>
                                ))}
                            </div>
                          ) : (
                            <span className="text-gray-400">-</span>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div> 
            </div> 
          </div>
        </>
      )}

      {/*--- Test Data Tab --- */}
      {activeTab === "test" && (
        <>
          <div className="text-sm text-gray-600 mb-4">
            Dieser Reiter zeigt die Modellperformance auf den Testdaten, bevor das Modell in ihrem Team eingesetzt wurde. 
            Er hilft ihnen festzustellen, ob die Modellperformance sich seit Inbetriebnahme verschlechtert hat. {" "}
            <strong>Bisher wurden keine signifikante Verschlechterung festgestellt. Die Differenz zwischen der Genauigkeit vor Inbetriebnahme und der Genauigkiet jetzt ist 0.</strong>
          </div>

          {/* Charts Row */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* --- Accuracy Card --- */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg font-semibold">
                  <span className="inline-flex items-center">
                    Genauigkeit
                    <span title="Dieses Kreisdiagramm zeigt, wie viele Instanzen auf den Testdaten der richtigen Kategorie zugeordnet wurden." className="ml-2 text-gray-400 hover:text-gray-600">
                      <Info className="w-4 h-4 inline" />
                    </span>
                  </span>
                </CardTitle>
              </CardHeader>
              <CardContent>

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

                {/* Selects + Reset */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-4 items-end">
                  {/* Kategorie */}
                  <div>
                    <div className="text-xs text-gray-600 mb-1">Für Kategorie zeigen:</div>
                    <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Für Kategorie anzeigen" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Alle">Alle</SelectItem>
                        {headers.map((cat) => (
                          <SelectItem key={cat} value={cat}>
                            {cat}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Sprache */}
                  <div>
                    <div className="text-xs text-gray-600 mb-1">Für Sprache zeigen:</div>
                    <Select value={selectedLanguage} onValueChange={setSelectedLanguage}>
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Für Sprache anzeigen" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Alle">Alle</SelectItem>
                        <SelectItem value="Deutsch">Deutsch</SelectItem>
                        <SelectItem value="Englisch">Englisch</SelectItem>
                        <SelectItem value="Französisch">Französisch</SelectItem>
                        <SelectItem value="Turkish">Turkish</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Zurücksetzen */}
                  <div className="sm:justify-self-end">
                    <Button
                      variant="outline"
                      className="w-full sm:w-auto"
                      onClick={() => {
                        setSelectedCategory("Alle")
                        setSelectedLanguage("Alle") 
                      }}
                    >
                      <RotateCcw className="w-4 h-4 mr-2" />
                      Zurücksetzen
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* --- False Negatives Card --- */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg font-semibold">
                  <span className="inline-flex items-center">
                    Falsche Negative
                    <span title="Dieses Kreisdiagramm zeigt, wie viele Instanzen auf den Testdaten fälschlicherweise keiner Kategorie zugeordnet wurden." className="ml-2 text-gray-400 hover:text-gray-600">
                      <Info className="w-4 h-4 inline" />
                    </span>
                  </span>
                </CardTitle>
              </CardHeader>
              <CardContent>

                {/* Pie Chart */}
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

              </CardContent>
            </Card>
          </div>

          {/* Confusion Matrix */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg font-semibold">
                <span className="inline-flex items-center">
                  Zuordnungen
                  <span title="Diese Konfusionsmatrix zeigt, wie Instanzen auf dem Test-Datensatz zugeordnet wurden. Die Zeilen entsprechen den richtigen Labels, die Spalten Labels, die durch das KI-Modell zugordnet wurden. Grüne Zellen auf der diagonalen wurden richtig zugeordnet, andere Zellen wurden falsch zugeordnet." className="ml-2 text-gray-400 hover:text-gray-600">
                    <Info className="w-4 h-4 inline" />
                  </span>
                </span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="relative">
                {/* X-axis label (KI) centered above the headers */}
                <div className="absolute left-1/2 -translate-x-1/2 -top-6 text-sm font-medium text-gray-600">
                  KI
                </div>

                {/* Y-axis label (Mensch) rotated and centered at the left side */}
                <div className="absolute -left-10 top-1/2 -translate-y-1/2 text-sm font-medium text-gray-600 transform -rotate-90 origin-center">
                  Mensch
                </div>

                {/* give left padding so the rotated Y label has space */}
                <div className="overflow-x-auto pl-6">
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
              </div>
            </CardContent>
          </Card>
        </>
      )}
    </div>
  )
}
