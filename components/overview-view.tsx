"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ChevronUp, ChevronDown, MessageCircle, RotateCcw } from "lucide-react"
import { getCategoryColor } from "@/lib/category-colors"

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

interface OverviewViewProps {
  onInstanceSelect: (instanceId: string) => void
}

const pendingInstances: OverviewInstance[] = [
  {
    id: "7835",
    date: "09. Juni 2025, 9:55",
    content: "Was für ein kleiner feiger besoffener [...]",
    author: "@Beispieluser",
    colleagueCommented: true,
    aiClassification: "§ 140 StGB",
    humanClassification: undefined,
    instanceFile: "instance-2",
  },
  {
    id: "7834",
    date: "09. Juni 2025, 9:18",
    content: "Du bist ein Wichser und [...]",
    author: "@Badforyousteve",
    colleagueCommented: false,
    aiClassification: "§ 241 StGB",
    humanClassification: undefined,
    instanceFile: "instance-3",
  },
  {
    id: "7832",
    date: "09. Juni 2025, 8:59",
    content: "Ich werde dich finden [...]",
    author: "@Badforyousteve",
    colleagueCommented: false,
    aiClassification: "§ 241 StGB",
    humanClassification: undefined,
    instanceFile: "instance-4",
  },
  {
    id: "7830",
    date: "08. Juni 2025, 17:29",
    content: "Diese Politiker sind alle [...]",
    author: "@_Iamcate_",
    colleagueCommented: true,
    aiClassification: "§ 130 StGB",
    humanClassification: undefined,
    instanceFile: "instance-5",
  },
    {
    id: "7826",
    date: "08. Juni 2025, 15:30",
    content: "Du dummer Nazi [...]",
    author: "@classischeclaudia",
    colleagueCommented: true,
    aiClassification: "§ 111  StGB",
    humanClassification: undefined,
    instanceFile: "instance-7",
  },
    {
    id: "7836",
    date: "09. Juni 2025, 10:20",
    content: "Kopf abhaken wurde [...]",
    author: "@Beispielperson",
    colleagueCommented: true,
    aiClassification: "§ 140 StGB",
    humanClassification: undefined,
    instanceFile: "instance-1",
  },
]

const evaluatedInstances: OverviewInstance[] = [
  {
    id: "7827",
    date: "08. Juni 2025, 16:06",
    content: "Menschen wie du sollten [...]",
    author: "@mustermax",
    colleagueCommented: false,
    aiClassification: "Kein Strafbestand",
    humanClassification: undefined,
    instanceFile: "instance-6",
  },
  {
    id: "7835",
    date: "11:55, 09. Juni 2025",
    content: "verschiedenen Arschlöchern zeigen [...]",
    author: "Karl Lrak",
    colleagueCommented: false,
    aiClassification: "§ 86 StGB",
    humanClassification: "§ 86 StGB",
    instanceFile: "instance-8",
  },
  {
    id: "7836",
    date: "12:20, 09. Juni 2025",
    content: "verherrlichen Gewaltstaaten [...]",
    author: "Neo-Magazin-Royale",
    colleagueCommented: true,
    aiClassification: "§ 186 StGB",
    humanClassification: "Kein Strafbestand",
    instanceFile: "instance-9",
  },
]

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

export default function OverviewView({ onInstanceSelect }: OverviewViewProps) {
  const [pendingSortOrder, setPendingSortOrder] = useState("desc")
  const [pendingFilterCategory, setPendingFilterCategory] = useState("alle")
  const [evaluatedSortOrder, setEvaluatedSortOrder] = useState("desc")
  const [evaluatedFilterCategory, setEvaluatedFilterCategory] = useState("alle")

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

  const resetFilters = () => {
    setPendingSortOrder("desc")
    setPendingFilterCategory("alle")
    setEvaluatedSortOrder("desc")
    setEvaluatedFilterCategory("alle")
  }

  const filteredPendingInstances = filterAndSortInstances(pendingInstances, pendingFilterCategory, pendingSortOrder)
  const filteredEvaluatedInstances = filterAndSortInstances(
    evaluatedInstances,
    evaluatedFilterCategory,
    evaluatedSortOrder,
  )

  return (
    <div className="max-w-7xl mx-auto p-6 space-y-8">
      <div className="flex justify-end">
        <Button onClick={resetFilters} variant="outline" className="flex items-center space-x-2 bg-transparent">
          <RotateCcw className="w-4 h-4" />
          <span>Zurücksetzen</span>
        </Button>
      </div>

      {/* Pending Instances Section */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200">
        <div className="p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-6">Zu beurteilende Instanzen</h2>

          {/* Filters for pending instances */}
          <div className="flex items-center space-x-4 mb-4">
            <div className="flex items-center space-x-2">
              <span className="text-sm font-medium text-gray-700">Datum</span>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setPendingSortOrder(pendingSortOrder === "asc" ? "desc" : "asc")}
                className="flex items-center space-x-1"
              >
                {pendingSortOrder === "asc" ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
              </Button>
            </div>
            <div className="flex items-center space-x-2">
              <span className="text-sm font-medium text-gray-700">Von KI klassifiziert als</span>
              <Select value={pendingFilterCategory} onValueChange={setPendingFilterCategory}>
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
                {filteredPendingInstances.map((instance, index) => (
                  <tr
                    key={`${instance.id}-${index}`}
                    className="hover:bg-gray-50 cursor-pointer"
                    onClick={() => onInstanceSelect(instance.instanceFile)}
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
                        <span
                          className={`px-3 py-1 rounded-full text-sm font-medium ${getCategoryColor(instance.humanClassification)}`}
                        >
                          {instance.humanClassification}
                        </span>
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
                    onClick={() => onInstanceSelect(`${instance.instanceFile}|${instance.id}`)}
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
                        <span
                          className={`px-3 py-1 rounded-full text-sm font-medium ${getCategoryColor(instance.humanClassification)}`}
                        >
                          {instance.humanClassification}
                        </span>
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
    </div>
  )
}
