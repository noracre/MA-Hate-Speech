"use client"

import { useMemo, useState } from "react"
import ModellView from "@/components/modell-view"
import OverviewView from "@/components/overview-view"
import { Button } from "@/components/ui/button"
import { Home, X } from "lucide-react"
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
  const [reviewInstanceTab, setReviewInstanceTab] = useState<{ file: string; label: string } | null>(null);
  const [orderMode, setOrderMode] = useState<"date-desc" | "date-asc" | "id-desc" | "id-asc" | "custom">("date-desc");
  const [customOrder, setCustomOrder] = useState<string[]>([]); // array of instanceFile strings for manual order

  const sequence: Record<string, string | undefined> = {
    "instance-1": "instance-2",
    "instance-2": "instance-3",
    "instance-3": "instance-4",
    "instance-4": "instance-5",
    "instance-5": "instance-7",
    "instance-7": "instance-1",
    // others can stay undefined (no next)
  }

  // helper: parse date strings used in Overview
  const parseDateString = (d: string) => {
    // matches your overview regex format "HH:MM, DD. Monat YYYY" or "DD. Monat YYYY, HH:MM"
    const m1 = d.replace(/(\d{2}):(\d{2}), (\d{2})\. (\w+) (\d{4})/, "$5-$4-$3 $1:$2");
    return new Date(m1);
  };

  const getOrderedInstances = (list: OverviewInstance[]) => {
    if (orderMode === "custom" && customOrder.length > 0) {
      // place items by customOrder, fall back to remaining items appended
      const map = new Map(list.map(i => [i.instanceFile, i]));
      const ordered = customOrder.map(f => map.get(f)).filter(Boolean) as OverviewInstance[];
      const remaining = list.filter(i => !customOrder.includes(i.instanceFile));
      return [...ordered, ...remaining];
    }
    const copy = [...list];
    switch (orderMode) {
      case "date-asc":
        return copy.sort((a, b) => parseDateString(a.date).getTime() - parseDateString(b.date).getTime());
      case "date-desc":
        return copy.sort((a, b) => parseDateString(b.date).getTime() - parseDateString(a.date).getTime());
      case "id-asc":
        return copy.sort((a, b) => Number(a.id) - Number(b.id));
      case "id-desc":
      default:
        return copy.sort((a, b) => Number(b.id) - Number(a.id));
    }
  };

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
    setCurrentView(pendingView);
    if (pendingInstanceId) setCurrentInstanceId(pendingInstanceId);

    // If user clicked X and we’re actually leaving the instance, hide the tab now.
    if (closeRequestedViaX && pendingView === "overview") {
      setIsInstanceTabOpen(false); // <-- close the tab
    }
    setCloseRequestedViaX(false);

    setShowExitWarning(false);
    setHasUnsavedChanges(false);
    setPendingView("");
    setPendingInstanceId(null);
  };

  const cancelViewChange = () => {
    setShowExitWarning(false);
    setPendingView("");
    setCloseRequestedViaX(false); // don’t close if user cancelled
  };

  const getInstanceComponent = (instanceFile: string) => {
    const current = pendingInstances.find(p => p.instanceFile === currentInstanceId) 
                ?? pendingInstances.find(p => p.instanceFile === instanceFile);
    const instanceIdLabel = current?.id ?? currentInstanceLabel;

    const common = {
      onUnsavedChanges: setHasUnsavedChanges,
      onNext: handleNextInstance,
      instanceMeta: { instanceId: instanceIdLabel, instanceFile },
      onSaveHumanClassification,
      initialSelectedCategories: getInitialSelectedCategories(instanceFile, instanceIdLabel),
    };

    const map: Record<string, JSX.Element> = {
      "instance-1": <Instance1 {...common} />,
      "instance-2": <Instance2 {...common} />,
      "instance-3": <Instance3 {...common} />,
      "instance-4": <Instance4 {...common} />,
      "instance-5": <Instance5 {...common} />,
      "instance-6": <Instance6 {...common} />,
      "instance-7": <Instance7 {...common} />,
    };
    return map[instanceFile] ?? <Instance1 {...common} />;
  };

  const [tempInstanceTab, setTempInstanceTab] = useState<{ file: string; label: string } | null>(null);

  const openTempInstanceTab = (file: string, label: string) => {
    setTempInstanceTab({ file, label });
    setCurrentInstanceLabel(label);
    handleViewChange("instance", file);
  };

  const closeTempInstanceTab = () => {
    setTempInstanceTab(null);
    setCurrentView("modell");
  };

  const onCloseInstanceClick = () => {
    if (hasUnsavedChanges) {
      setPendingView("overview");
      setShowExitWarning(true);
      setCloseRequestedViaX(true); // <-- set this!
    } else {
      setIsInstanceTabOpen(false); // <-- close tab immediately
      setCurrentView("overview");
    }
  };

  const handleNextInstance = () => {
    setCurrentView("instance")
    // traverse using the ordered list
    const order = orderedPendingInstances.map(p => p.instanceFile)
    const idx = order.indexOf(currentInstanceId)
    if (idx === -1) return
    const next = order[(idx + 1) % order.length] // wrap-around
    const nextRow = orderedPendingInstances.find(p => p.instanceFile === next)
    setCurrentInstanceId(next)
    if (nextRow?.id) setCurrentInstanceLabel(nextRow.id)
    setCurrentView("instance")
    setHasUnsavedChanges(false)
  }

  const getInitialSelectedCategories = (instanceFile: string, instanceIdLabel: string) => {
    const fromEvaluated = evaluatedInstances.find(
      (p) => p.instanceFile === instanceFile && p.id === instanceIdLabel
    )?.humanClassification;
    const fromPending = pendingInstances.find(
      (p) => p.instanceFile === instanceFile && p.id === instanceIdLabel
    )?.humanClassification;

    const src = fromEvaluated ?? fromPending;
    return src ? src.split(", ").filter(Boolean) : [];
  };

  const [isInstanceTabOpen, setIsInstanceTabOpen] = useState(false);
  const [closeRequestedViaX, setCloseRequestedViaX] = useState(false);

  type OverviewInstance = {
    id: string;
    date: string;
    content: string;
    author: string;
    colleagueCommented: boolean;
    aiClassification: string;
    humanClassification?: string;   // comma-separated if multiple
    instanceFile: string;
  };

  const [pendingInstances, setPendingInstances] = useState<OverviewInstance[]>([
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
    {
      id: "7835",
      date: "08. Juni 2025, 15:30",
      content: "Was für ein kleiner [...]",
      author: "@Beispieluser",
      colleagueCommented: true,
      aiClassification: "§ 140 StGB",
      humanClassification: undefined,
      instanceFile: "instance-2",
    },
    {
      id: "7834",
      date: "09. Juni 2025, 8:59",
      content: "Du bist ein Wichser [...]",
      author: "@Badforyousteve",
      colleagueCommented: false,
      aiClassification: "§ 241 StGB",
      humanClassification: undefined,
      instanceFile: "instance-3",
    },
    {
      id: "7832",
      date: "09. Juni 2025, 9:18",
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
      content: "Diese Politiker sind [...]",
      author: "@_Iamcate_",
      colleagueCommented: true,
      aiClassification: "§ 130 StGB",
      humanClassification: undefined,
      instanceFile: "instance-5",
    },
      {
      id: "7826",
      date: "09. Juni 2025, 9:55",
      content: "Du dummer Nazi [...]",
      author: "@classischeclaudia",
      colleagueCommented: true,
      aiClassification: "§ 111  StGB",
      humanClassification: undefined,
      instanceFile: "instance-7",
    },
  ]);

  const [evaluatedInstances, setEvaluatedInstances] = useState<OverviewInstance[]>([
    /*{
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
    },*/
  ]);

    // memoize ordered list so overview and next traversal use identical ordering
  const orderedPendingInstances = useMemo(() => getOrderedInstances(pendingInstances), [pendingInstances, orderMode, customOrder]);

  const onSaveHumanClassification = ({
    instanceId,
    instanceFile,
    selectedCategories,
  }: {
    instanceId: string;
    instanceFile: string;
    selectedCategories: string[];
  }) => {
    const humanClassification = selectedCategories.join(", ");

  // 1) If still pending → move to evaluated
  const savedPending = pendingInstances.find(p => p.id === instanceId && p.instanceFile === instanceFile);
  if (savedPending) {
    setPendingInstances(prev => prev.filter(p => !(p.id === instanceId && p.instanceFile === instanceFile)));
    setEvaluatedInstances(prev => [{ ...savedPending, humanClassification }, ...prev]);
    return;
  }

  // 2) Else already in evaluated → update there
  const savedEvaluated = evaluatedInstances.some(p => p.id === instanceId && p.instanceFile === instanceFile);
  if (savedEvaluated) {
    setEvaluatedInstances(prev =>
      prev.map(p =>
        p.id === instanceId && p.instanceFile === instanceFile
          ? { ...p, humanClassification }
          : p
      )
    );
  }
};

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navigation */}
      <nav className="sticky top-0 z-50 bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            <div className="flex space-x-6">
              {/* Instanzen Übersicht Menüpunkt */}
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

              {/* Instanz Nr Menüpunkt */}
              {isInstanceTabOpen && (
                <div className="flex items-center">
                  <button
                    onClick={() => handleViewChange("instance")}
                    className={`flex items-center space-x-2 font-medium pb-4 ${
                      currentView === "instance"
                        ? "text-blue-600 border-b-2 border-blue-600"
                        : "text-gray-600 hover:text-blue-600"
                    }`}
                    title={`Instanz #${currentInstanceLabel}`}
                  >
                    <span>Instanz #{currentInstanceLabel} Strafbestand überprüfen</span>
                  </button>

                  {/* The X */}
                  <button
                    aria-label="Instanz-Tab schließen"
                    onClick={onCloseInstanceClick}
                    className="ml-2 -mr-1 p-1 rounded hover:bg-gray-100 text-gray-500 hover:text-gray-700"
                    title="Schließen"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              )}

              {/* FAQ Menüpunkt */}
              <button
                onClick={() => handleViewChange("training-data")}
                className={`flex items-center space-x-2 font-medium pb-4 ${
                  currentView === "training-data"
                    ? "text-blue-600 border-b-2 border-blue-600"
                    : "text-gray-600 hover:text-blue-600"
                }`}
              >
                <span>FAQ zu Trainingsdaten und Kategorien</span>
              </button>

              {/* Modell Übersicht Menüpunkt */}
              <button
                onClick={() => handleViewChange("modell")}
                className={`flex items-center space-x-2 font-medium pb-4 ${
                  currentView === "modell"
                    ? "text-blue-600 border-b-2 border-blue-600"
                    : "text-gray-600 hover:text-blue-600"
                }`}
              >
                <span>Modell Performance</span>
              </button>
              
              {/* Evaluationsrunde Menüpunkt */}
              {tempInstanceTab && (
                <div className="flex items-center">
                  <button
                    onClick={() => handleViewChange("instance", tempInstanceTab.file)}
                    className={`flex items-center space-x-2 font-medium pb-4 ${
                      currentView === "instance" && currentInstanceId === tempInstanceTab.file
                        ? "text-blue-600 border-b-2 border-blue-600"
                        : "text-gray-600 hover:text-blue-600"
                    }`}
                    title={`Instanz #${tempInstanceTab.label}`}
                  >
                    <span>Instanz #{currentInstanceLabel} kein Strafbestand überprüfen</span>
                  </button>
                  <button
                    aria-label="Instanz-Tab schließen"
                    onClick={(e) => {
                      e.stopPropagation();
                      closeTempInstanceTab();
                    }}
                    className="ml-2 -mr-1 p-1 rounded hover:bg-gray-100 text-gray-500 hover:text-gray-700"
                    title="Schließen"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              )}

              {/*"nochmal ansehen" Menüpunkt*/}
              {reviewInstanceTab && (
                <div className="flex items-center">
                  <button
                    onClick={() => handleViewChange("instance", reviewInstanceTab.file)}
                    className={`flex items-center space-x-2 font-medium pb-4 ${
                      currentView === "instance" && currentInstanceId === reviewInstanceTab.file
                        ? "text-blue-600 border-b-2 border-blue-600"
                        : "text-gray-600 hover:text-blue-600"
                    }`}
                    title={`Instanz #${reviewInstanceTab.label}`}
                  >
                    <span>Instanz #{currentInstanceLabel} nochmal ansehen</span>
                  </button>
                  <button
                    aria-label="Instanz-Tab schließen"
                    onClick={(e) => {
                      e.stopPropagation();
                      setReviewInstanceTab(null);
                      setCurrentView("modell");
                    }}
                    className="ml-2 -mr-1 p-1 rounded hover:bg-gray-100 text-gray-500 hover:text-gray-700"
                    title="Schließen"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              )}
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
          instances={orderedPendingInstances} // pass ordered list
          onInstanceSelect={(payload) => {
            const [file, label] = payload.split("|");
            handleViewChange("instance", file);
            setCurrentInstanceLabel(label);
            setPendingInstanceLabel(label);
            setIsInstanceTabOpen(true); // <-- show the tab
          }}
        />
      )}

      {currentView === "instance" && getInstanceComponent(currentInstanceId)}
      {currentView === "modell" && (
        <ModellView
          instances={evaluatedInstances}
          onOpenInstanceTab={(file, label, type) => {
            handleViewChange("instance", file);
            setCurrentInstanceLabel(label);
            setPendingInstanceLabel(label);
            if (type === "keinStrafbestand") {
              openTempInstanceTab(file, label);
              setReviewInstanceTab(null);
            } else if (type === "nochmal") {
              setReviewInstanceTab({ file, label });
              setTempInstanceTab(null);
            }
          }}
        />
      )}
      {currentView === "training-data" && <TrainingDataOverview />}
    </div>
  )
}
