// components/InstanceParent.tsx
"use client"

import { useMemo, useState } from "react"
import Image from "next/image"
import {
  MessageCircle, User, Plus, Minus, ChevronLeft, ChevronRight, Info, Search, X, Filter, Calendar, Users,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Textarea } from "@/components/ui/textarea"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Checkbox } from "@/components/ui/checkbox"
import { getCategoryColor } from "@/lib/category-colors"

export type InstanceComment = {
  id: number
  author: string
  content: string
  timestamp: string
  avatar: string
}

export type InstanceParentProps = {
  // meta
  instanceId: string
  instanceTitle: string // e.g., "Instanz #7835"
  instanceImageSrc: string // e.g., "/instance-2-text.png"
  instanceImageAlt: string
  dateViews: string // e.g., "09. Juni 2025, 9:55 · 20.142 Mal angezeigt"

  // AI badge
  aiBadgeText: string // e.g., "§140 Belohnung und Billigung von Straftaten"
  aiBadgeColorKey: string // the value you pass to getCategoryColor

  // categories
  categories: string[] // must contain "Kein Strafbestand" as first/among options

  // tabs
  commentsSeed?: InstanceComment[]
  legalTab?: React.ReactNode
  authorTab?: React.ReactNode
  contentTab?: React.ReactNode
  legalCount?: number

  // optional: histogram/image for feedback dialog
  histogramSrc?: string
  histogramAlt?: string

  onUnsavedChanges?: (hasChanges: boolean) => void
}

const NO_OFFENSE = "Kein Strafbestand"

export default function InstanceParent({
  instanceId,
  instanceTitle,
  instanceImageSrc,
  instanceImageAlt,
  dateViews,
  aiBadgeText,
  aiBadgeColorKey,
  categories,
  commentsSeed = [],
  legalTab,
  authorTab,
  contentTab,
  legalCount = 1,
  histogramSrc = "/histogram.png",
  histogramAlt = "Anzahl Trainingsdatenpunkte pro Kategorie",
  onUnsavedChanges = () => {},
}: InstanceParentProps) {
  // ----- shared state -----
  const [selectFields, setSelectFields] = useState([{ id: 1, value: "" }])
  const [isSaved, setIsSaved] = useState(false)
  const [showSuccessMessage, setShowSuccessMessage] = useState(false)
  const [canChangeDecision, setCanChangeDecision] = useState(false)
  const [feedbackSubmitted, setFeedbackSubmitted] = useState(false)
  const [activeTab, setActiveTab] = useState<"" | "comments" | "legal" | "author" | "content">("")
  const [newComment, setNewComment] = useState("")
  const [showFeedbackModal, setShowFeedbackModal] = useState(false)
  const [feedbackChecks, setFeedbackChecks] = useState({ classification: false, addressee: false, gap: false })
  const [comments, setComments] = useState<InstanceComment[]>(commentsSeed)

  const isFrozen = isSaved || feedbackSubmitted
  const anyFieldHasValue = useMemo(() => selectFields.some((f) => f.value !== ""), [selectFields])
  const showPlusButton = !isSaved && !feedbackSubmitted
  const allFeedbackChecksComplete = feedbackChecks.classification && feedbackChecks.addressee && feedbackChecks.gap

  // ----- helpers -----
  const addSelectField = () => {
    if (selectFields.length < 5) setSelectFields([...selectFields, { id: Date.now(), value: "" }])
  }

  const removeSelectField = (id: number) => {
    if (selectFields.length <= 1) return
    const next = selectFields.filter((f) => f.id !== id)
    setSelectFields(next)
    const hasValues = next.some((f) => f.value !== "")
    onUnsavedChanges(hasValues && !isSaved)
  }

  const updateSelectField = (id: number, value: string) => {
    const next = selectFields.map((f) => (f.id === id ? { ...f, value } : f))
    setSelectFields(next)
    const hasValues = next.some((f) => f.value !== "")
    onUnsavedChanges(hasValues && !isSaved)
  }

  const handleSave = () => {
    setIsSaved(true)
    setShowSuccessMessage(true)
    setCanChangeDecision(true)
    onUnsavedChanges(false)
    setTimeout(() => setShowSuccessMessage(false), 5000)
  }

  const handleChangeDecision = () => {
    setIsSaved(false)
    setCanChangeDecision(false)
    setFeedbackSubmitted(false)
    setShowSuccessMessage(false)
  }

  const handleUseFeedback = () => setShowFeedbackModal(true)

  const handleSendComment = () => {
    if (!newComment.trim()) return
    setComments((prev) => [
      ...prev,
      { id: Date.now(), author: "Sie", content: newComment, timestamp: "gerade eben", avatar: "/icon-user.png" },
    ])
    setNewComment("")
  }

  const handleFeedbackSubmit = () => {
    setShowFeedbackModal(false)
    setFeedbackSubmitted(true)
    setShowSuccessMessage(false)
    onUnsavedChanges(false)
  }

  const getSelectedCategories = () => selectFields.filter((f) => f.value !== "").map((f) => f.value)
  const isUnderrepresented = (cat: string) => !cat.includes("§ 185") && !cat.includes("§ 186")

  const renderTabContent = () => {
    switch (activeTab) {
      case "comments":
        return (
          <div className="space-y-4 max-h-96 overflow-y-auto">
            {comments.map((c) => (
              <div key={c.id} className="flex items-start space-x-3">
                <Avatar className="w-10 h-10 rounded-full">
                  <AvatarImage src={c.avatar || "/placeholder.svg"} />
                  <AvatarFallback className="bg-blue-600 text-white rounded-full">{c.author[0]}</AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <div className="flex items-center space-x-2 mb-1">
                    <span className="font-medium text-gray-900">{c.author}</span>
                    <span className="text-sm text-gray-500">{c.timestamp}</span>
                  </div>
                  <div className="text-gray-900 whitespace-pre-line">{c.content}</div>
                </div>
              </div>
            ))}

            {/* new comment */}
            <div className="flex items-start space-x-3 pt-4 border-t">
              <Avatar className="w-10 h-10 rounded-full">
                <AvatarImage src="/icon-user.png" />
                <AvatarFallback className="bg-blue-600 text-white rounded-full">S</AvatarFallback>
              </Avatar>
              <div className="flex-1 space-y-3">
                <div className="text-sm text-gray-700">Thema</div>
                <input
                  type="text"
                  placeholder="Auswählen"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <div className="space-y-2">
                  <label className="text-sm text-gray-700">Kommentar</label>
                  <Textarea value={newComment} onChange={(e) => setNewComment(e.target.value)} placeholder="Kommentar eingeben..." className="min-h-[100px]" />
                  <div className="flex justify-end">
                    <Button onClick={handleSendComment} className="bg-blue-600 hover:bg-blue-700 text-white">Senden</Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )
      case "legal":
        return legalTab ?? null
      case "author":
        return authorTab ?? null
      case "content":
        return contentTab ?? null
      default:
        return null
    }
  }

  return (
    <div className="flex">
      {/* --- left navigation (shared) --- */}
      <div className="w-80 bg-white shadow-lg border-r border-gray-200 h-screen sticky top-0 overflow-y-auto">
        <div className="p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-gray-900">Navigation</h3>
            <div className="flex items-center space-x-2">
              <Button variant="ghost" size="sm" className="p-1"><ChevronLeft className="w-4 h-4" /></Button>
              <Button variant="ghost" size="sm" className="p-1"><ChevronRight className="w-4 h-4" /></Button>
            </div>
          </div>

          <div className="space-y-4">
            <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
              <h4 className="font-medium text-blue-900 mb-2">Aktuelle Navigation</h4>
              <div className="space-y-2 text-sm text-blue-800">
                <div className="flex items-center space-x-2"><Users className="w-4 h-4" /><span>Zu beurteilende Instanzen</span></div>
                <div className="flex items-center space-x-2"><Filter className="w-4 h-4" /><span>Gefiltert nach: § 140 StGB</span></div>
                <div className="flex items-center space-x-2"><Calendar className="w-4 h-4" /><span>Sortiert nach: Datum (aufsteigend)</span></div>
              </div>
            </div>

            <div className="border-t pt-4">
              <h4 className="font-medium text-gray-900 mb-3">Navigationsoptionen</h4>
              <div className="space-y-2">
                <Button variant="ghost" className="w-full justify-start text-sm"><Users className="w-4 h-4 mr-2" />Zugewiesene Posts (6)</Button>
                <Button variant="ghost" className="w-full justify-start text-sm"><Search className="w-4 h-4 mr-2" />Automatisch erkannte Posts (3)</Button>
                <Button variant="ghost" className="w-full justify-start text-sm"><Filter className="w-4 h-4 mr-2" />Gefilterte Posts</Button>
                <Button variant="ghost" className="w-full justify-start text-sm"><Calendar className="w-4 h-4 mr-2" />Nach Datum sortiert</Button>
              </div>
            </div>

            <div className="border-t pt-4">
              <h4 className="font-medium text-gray-900 mb-3">Aktuelle Position</h4>
              <div className="text-sm text-gray-600">
                <p>Post 1 von 6</p>
                <p>Instanz #{instanceId}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* --- main column --- */}
      <div className="flex-1 max-w-4xl mx-auto p-6 space-y-6">
        {/* Feedback dialog (shared) */}
        <Dialog open={showFeedbackModal} onOpenChange={setShowFeedbackModal}>
          <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle className="text-left">Sie wollen die obenstehende Instanz als Beispiel für die Kategorie(n):</DialogTitle>
            </DialogHeader>

            <div className="space-y-6">
              <div>
                {getSelectedCategories().map((c, i) => (
                  <div key={i} className="font-medium text-gray-900">{c}</div>
                ))}
                <p className="text-gray-700 mt-2">dem Trainingsdatensatz zufügen.</p>
              </div>

              <div>
                <h3 className="font-medium text-gray-900 mb-4">Bitte prüfen sie, ob die folgende Checkliste erfüllt ist.</h3>
                <div className="space-y-3">
                  <div className="flex items-start space-x-3">
                    <Checkbox id="classification" checked={feedbackChecks.classification}
                      onCheckedChange={(checked) => setFeedbackChecks((p) => ({ ...p, classification: !!checked }))}/>
                    <label htmlFor="classification" className="text-gray-700 cursor-pointer">Der Post lässt sich dem Strafbestand klar und plausibel zuordnen.</label>
                  </div>
                  <div className="flex items-start space-x-3">
                    <Checkbox id="addressee" checked={feedbackChecks.addressee}
                      onCheckedChange={(checked) => setFeedbackChecks((p) => ({ ...p, addressee: !!checked }))}/>
                    <label htmlFor="addressee" className="text-gray-700 cursor-pointer">Adressat und Sprechakt des Posts sind klar.</label>
                  </div>
                  <div className="flex items-start space-x-3">
                    <Checkbox id="gap" checked={feedbackChecks.gap}
                      onCheckedChange={(checked) => setFeedbackChecks((p) => ({ ...p, gap: !!checked }))}/>
                    <label htmlFor="gap" className="text-gray-700 cursor-pointer">Das Beispiel erfüllt eine Lücke im Datensatz.</label>
                  </div>
                </div>
              </div>

              {getSelectedCategories().length > 0 && (
                <div className="space-y-2">
                  {getSelectedCategories().some(isUnderrepresented) && (
                    <div>
                      <div className="text-red-600 font-medium mb-2">Diese Kategorie ist im Datensatz bisher unterrepräsentiert:</div>
                      <div className="space-y-1">
                        {getSelectedCategories().filter(isUnderrepresented).map((cat, i) => {
                          const code = cat.match(/§\s*(\d+[a-z]?)/)?.[0] || cat
                          return <span key={i} className={`inline-block px-2 py-1 rounded text-sm font-medium mr-2 ${getCategoryColor(code)}`}>{code}</span>
                        })}
                      </div>
                    </div>
                  )}

                  {getSelectedCategories().some((c) => !isUnderrepresented(c)) && (
                    <div>
                      <div className="text-green-600 font-medium mb-2">Diese Kategorie ist im Datensatz nicht unterrepräsentiert:</div>
                      <div className="space-y-1">
                        {getSelectedCategories().filter((c) => !isUnderrepresented(c)).map((cat, i) => {
                          const code = cat.match(/§\s*(\d+[a-z]?)/)?.[0] || cat
                          return <span key={i} className={`inline-block px-2 py-1 rounded text-sm font-medium mr-2 ${getCategoryColor(code)}`}>{code}</span>
                        })}
                      </div>
                    </div>
                  )}
                </div>
              )}

              <div>
                <Image src={histogramSrc} alt={histogramAlt} width={800} height={400} className="w-full rounded-lg border" />
              </div>

              <div className="text-gray-700">Es wurden keine ähnlichen Duplikate gefunden.</div>

              <div className="flex justify-end">
                <Button onClick={handleFeedbackSubmit} disabled={!allFeedbackChecksComplete}
                  className="bg-blue-600 hover:bg-blue-700 text-white px-8 disabled:bg-gray-300 disabled:cursor-not-allowed">
                  Einreichen
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>

        {/* Instance Card (per-instance content injected via props) */}
        <Card className="bg-white">
          <CardContent className="p-6">
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center space-x-4">
                <h2 className="text-lg font-semibold text-gray-900">{instanceTitle}</h2>
              </div>
            </div>
            <div className="bg-white p-3 rounded border">
              <Image src={instanceImageSrc} alt={instanceImageAlt} width={756} height={110} className="w-full h-auto" priority />
            </div>
            <div className="text-sm text-gray-500 mb-4">{dateViews}</div>
          </CardContent>
        </Card>

        {/* AI Classification Result (shared shell, per-instance badge) */}
        <Card className="bg-white">
          <CardContent className="p-6">
            <div className="flex items-center space-x-4">
              <div className="w-10 h-10 rounded-full">
                <Image src="/icon-classifier.png" alt="AI Classifier" width={24} height={24} className="rounded-full" />
              </div>
              <div className="flex-1">
                <p className="text-gray-900">
                  Von KI mit 97% Sicherheit als{" "}
                  <span className={`px-2 py-1 rounded-full text-sm font-medium ${getCategoryColor(aiBadgeColorKey)}`}>
                    {aiBadgeText}
                  </span>{" "}
                  eingestuft.
                </p>
              </div>
            </div>

            <div className="flex items-center justify-between mt-6 border-b border-gray-200">
              <div className="flex items-center space-x-8">
                {(["comments","legal","author","content"] as const).map((key) => (
                  <button
                    key={key}
                    onClick={() => setActiveTab(activeTab === key ? "" : key)}
                    className={`flex items-center space-x-2 pb-2 ${
                      activeTab === key ? "text-blue-600 border-b-2 border-blue-600" : "text-gray-600"
                    }`}
                  >
                    <div className={`w-4 h-4 rounded-full flex items-center justify-center ${
                      activeTab === key ? "bg-blue-600" : "bg-gray-600"
                    }`}>
                      {key === "comments" && <MessageCircle className="w-3 h-3 text-white" />}
                      {key === "legal"    && <Info className="w-3 h-3 text-white" />}
                      {key === "author"   && <User className="w-3 h-3 text-white" />}
                      {key === "content"  && <Search className="w-3 h-3 text-white" />}
                    </div>
                    <span className="text-sm">
                      {key === "comments" ? `Kommentare (${comments.length})`
                        : key === "legal" ? `Legaler Kontext (${legalCount})`
                        : key === "author" ? "Post-Verfasser*in"
                        : "Post-Inhalt & Interaktionen"}
                    </span>
                  </button>
                ))}
              </div>
              {activeTab && (
                <Button variant="ghost" size="sm" onClick={() => setActiveTab("")} className="p-1 text-gray-500 hover:text-gray-700">
                  <X className="w-4 h-4" />
                </Button>
              )}
            </div>

            {activeTab && <div className="mt-6">{renderTabContent()}</div>}
          </CardContent>
        </Card>

        {/* Classification Section (shared) */}
        <Card className="bg-white">
          <CardContent className="p-6">
            <div className="flex items-start space-x-4">
              <Avatar className="w-10 h-10 rounded-full">
                <AvatarImage src="/icon-user.png" />
                <AvatarFallback className="bg-blue-600 text-white rounded-full"><User className="w-5 h-5" /></AvatarFallback>
              </Avatar>

              <div className="flex-1 space-y-4">
                <div className="flex items-center space-x-2">
                  <span className="text-gray-900 font-medium">Einstufen als</span>
                </div>

                <div className="space-y-3">
                  {selectFields.map((field, index) => {
                    const options = index === 0 ? categories : categories.filter((c) => c !== NO_OFFENSE)
                    return (
                      <div key={field.id} className="flex items-center space-x-2">
                        <div className="flex-1">
                          <Select value={field.value} onValueChange={(value) => updateSelectField(field.id, value)} disabled={isFrozen}>
                            <SelectTrigger className="w-full">
                              <SelectValue placeholder="Auswählen" />
                            </SelectTrigger>
                            <SelectContent>
                              {options.map((category, idx) => {
                                const code = category.match(/§\s*(\d+[a-z]?)/)?.[0] || category
                                return (
                                  <SelectItem key={idx} value={category}>
                                    <span className={`px-2 py-1 rounded text-sm ${getCategoryColor(code)}`}>{category}</span>
                                  </SelectItem>
                                )
                              })}
                            </SelectContent>
                          </Select>
                        </div>

                        {index > 0 && !isFrozen && (
                          <Button variant="outline" size="sm" onClick={() => removeSelectField(field.id)} className="w-8 h-8 p-0 bg-transparent rounded-full" aria-label="Feld entfernen" title="Feld entfernen">
                            <Minus className="w-4 h-4" />
                          </Button>
                        )}

                        {index === selectFields.length - 1 &&
                          field.value !== "" &&
                          field.value !== NO_OFFENSE &&
                          selectFields.length < 5 &&
                          showPlusButton && (
                            <Button variant="outline" size="sm" onClick={addSelectField} className="w-8 h-8 p-0 bg-transparent rounded-full">
                              <Plus className="w-4 h-4" />
                            </Button>
                          )}
                      </div>
                    )
                  })}
                </div>

                {showSuccessMessage && !feedbackSubmitted && (
                  <div className="text-green-600 text-sm font-medium">Entscheidung wurde gespeichert</div>
                )}
                {feedbackSubmitted && (
                  <div className="text-green-600 text-sm font-medium">Entscheidung wurde als Feedback genutzt</div>
                )}

                {anyFieldHasValue && (
                  <div className="flex items-center justify-center space-x-4 pt-4">
                    {!isSaved && !feedbackSubmitted && (
                      <Button onClick={handleSave} className="bg-blue-600 hover:bg-blue-700 text-white px-8">Speichern</Button>
                    )}
                    {isSaved && !feedbackSubmitted && (
                      <Button onClick={handleUseFeedback} variant="outline" className="border-blue-600 text-blue-600 hover:bg-blue-50 px-8 bg-transparent">
                        Als Feedback verwenden
                      </Button>
                    )}
                    {(canChangeDecision || feedbackSubmitted) && (
                      <Button onClick={handleChangeDecision} variant="outline" className="border-gray-600 text-gray-600 hover:bg-gray-50 px-8 bg-transparent">
                        Entscheidung ändern
                      </Button>
                    )}
                  </div>
                )}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
