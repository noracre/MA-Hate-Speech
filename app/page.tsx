"use client"

import { useState } from "react"
import ModellView from "@/components/modell-view"
import OverviewView from "@/components/overview-view"
import { Button } from "@/components/ui/button"
import { Home } from "lucide-react"
import Instance1 from "@/components/instance-1"
import Instance2 from "@/components/instance-2"
import Instance3 from "@/components/instance-3"
import Instance4 from "@/components/instance-4"
import Instance5 from "@/components/instance-5"
import Instance6 from "@/components/instance-6"
import Instance7 from "@/components/instance-7"
import TrainingDataOverview from "@/components/training-data-overview"

export default function ClassificationApp() {
  const [currentView, setCurrentView] = useState("overview")

  const [pendingInstanceId, setPendingInstanceId] = useState<string | null>(null)
  const [pendingInstanceLabel, setPendingInstanceLabel] = useState<string | null>(null)

  const [currentInstanceId, setCurrentInstanceId] = useState("instance-1") // Default instance if none is clicked yet
  const [currentInstanceLabel, setCurrentInstanceLabel] = useState("7836")
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false)
  const [showExitWarning, setShowExitWarning] = useState(false)
  const [pendingView, setPendingView] = useState("")

  const handleViewChange = (newView: string, instanceId?: string) => {
    if (hasUnsavedChanges && newView !== currentView) {
      setPendingView(newView)
      if (instanceId) setPendingInstanceId(instanceId)
      setShowExitWarning(true)
    } else {
      setCurrentView(newView)
      if (instanceId) setCurrentInstanceId(instanceId)
    }
  }
  
  const confirmViewChange = () => {
    setCurrentView(pendingView)
    if (pendingInstanceId) setCurrentInstanceId(pendingInstanceId)
    setShowExitWarning(false)
    setHasUnsavedChanges(false)
    setPendingView("")
    setPendingInstanceId(null)
  }

  const cancelViewChange = () => {
    setShowExitWarning(false)
    setPendingView("")
  }

  const getInstanceComponent = (instanceFile: string) => {
    const map: Record<string, JSX.Element> = {
      "instance-1": <Instance1 onUnsavedChanges={setHasUnsavedChanges} />,
      "instance-2": <Instance2 onUnsavedChanges={setHasUnsavedChanges} />,
      "instance-3": <Instance3 onUnsavedChanges={setHasUnsavedChanges} />,
      "instance-4": <Instance4 onUnsavedChanges={setHasUnsavedChanges} />,
      "instance-5": <Instance5 onUnsavedChanges={setHasUnsavedChanges} />,
      "instance-6": <Instance6 onUnsavedChanges={setHasUnsavedChanges} />,
      "instance-7": <Instance7 onUnsavedChanges={setHasUnsavedChanges} />,
    }
    return map[instanceFile] ?? <Instance1 onUnsavedChanges={setHasUnsavedChanges} />
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navigation */}
      <nav className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-8">
              <button
                onClick={() => handleViewChange("overview")}
                className={`flex items-center space-x-2 font-medium pb-4 ${
                  currentView === "overview"
                    ? "text-blue-600 border-b-2 border-blue-600"
                    : "text-gray-600 hover:text-blue-600"
                }`}
              >
                <Home className="w-5 h-5" />
                <span>Instanz Übersicht</span>
              </button>
              <button
                onClick={() => handleViewChange("instance")}
                className={`flex items-center space-x-2 font-medium pb-4 ${
                  currentView === "instance"
                    ? "text-blue-600 border-b-2 border-blue-600"
                    : "text-gray-600 hover:text-blue-600"
                }`}
              >
                <span>Instanz #{currentInstanceId}</span>
              </button>
              <button
                onClick={() => handleViewChange("modell")}
                className={`flex items-center space-x-2 font-medium pb-4 ${
                  currentView === "modell"
                    ? "text-blue-600 border-b-2 border-blue-600"
                    : "text-gray-600 hover:text-blue-600"
                }`}
              >
                <span>Modell Übersicht</span>
              </button>
              <button
                onClick={() => handleViewChange("training-data")}
                className={`flex items-center space-x-2 font-medium pb-4 ${
                  currentView === "training-data"
                    ? "text-blue-600 border-b-2 border-blue-600"
                    : "text-gray-600 hover:text-blue-600"
                }`}
              >
                <span>Trainingsdaten und Kategorien Übersicht</span>
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Exit Warning Modal */}
      {showExitWarning && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-md">
            <p className="text-gray-900 mb-4">
              Entscheidung wurde noch nicht gespeichert, sicher, dass Sie die Seite verlassen wollen?
            </p>
            <div className="flex space-x-3 justify-end">
              <Button variant="outline" onClick={cancelViewChange}>
                Nein
              </Button>
              <Button onClick={confirmViewChange} className="bg-blue-600 hover:bg-blue-700 text-white">
                Ja
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Content */}
      {currentView === "overview" && (
        <OverviewView
          onInstanceSelect={(payload) => {
            const [file, label] = payload.split("|")
            handleViewChange("instance", file)
            setCurrentInstanceLabel(label)
            // if a view change gets blocked by the modal, remember the label too
            setPendingInstanceLabel(label)
          }}
        />
      )}

      {currentView === "instance" && getInstanceComponent(currentInstanceId)}
      {currentView === "modell" && <ModellView />}
      {currentView === "training-data" && <TrainingDataOverview />}
    </div>
  )
}
