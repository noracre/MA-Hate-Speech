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
  instances: OverviewInstance[];
  onInstanceSelect: (instanceId: string) => void
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

export default function OverviewView({ instances, onInstanceSelect }: OverviewViewProps) {
  const [pendingSortOrder, setPendingSortOrder] = useState("desc");
  const [pendingFilterCategory, setPendingFilterCategory] = useState("alle");

 const filterAndSortInstances = (
    instances: OverviewInstance[],
    filterCategory: string,
    sortOrder: "asc" | "desc"
  ) => {
    let filtered = instances;

    if (filterCategory !== "alle") {
      filtered = instances.filter((instance) => {
        const aiMatch = instance.aiClassification?.includes(filterCategory);
        const humanMatch = instance.humanClassification?.includes(filterCategory);
        return aiMatch || humanMatch;
      });
    }

    // IMPORTANT: don't mutate props — sort a copy
    return [...filtered].sort((a, b) => {
      const dateA = new Date(
        a.date.replace(/(\d{2}):(\d{2}), (\d{2})\. (\w+) (\d{4})/, "$5-$4-$3 $1:$2")
      );
      const dateB = new Date(
        b.date.replace(/(\d{2}):(\d{2}), (\d{2})\. (\w+) (\d{4})/, "$5-$4-$3 $1:$2")
      );
      return sortOrder === "asc"
        ? dateA.getTime() - dateB.getTime()
        : dateB.getTime() - dateA.getTime();
    });
  };

  const filteredPendingInstances = filterAndSortInstances(
    instances,
    pendingFilterCategory,
    pendingSortOrder as "asc" | "desc"
  );

  const resetFilters = () => {
    setPendingSortOrder("desc")
    setPendingFilterCategory("alle")
  }

  return (
    <div className="max-w-7xl mx-auto p-6 space-y-8">

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
            <div className="flex justify-end">
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
                {filteredPendingInstances.map((instance, index) => (
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
