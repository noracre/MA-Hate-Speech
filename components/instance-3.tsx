"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Textarea } from "@/components/ui/textarea"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Checkbox } from "@/components/ui/checkbox"
import {
  MessageCircle,
  User,
  Plus,
  Minus,
  ChevronLeft,
  ChevronRight,
  Info,
  Search,
  X,
  Filter,
  Calendar,
  Users,
} from "lucide-react"
import Image from "next/image"
import { getCategoryColor } from "@/lib/category-colors"

const categories = [
  "Kein Strafbestand",
  "§ 86 StGB – Verbreiten von Propagandamitteln verfassungswidriger und terroristischer Organisationen",
  "§ 86a StGB – Verwenden von Kennzeichen verfassungswidriger und terroristischer Organisationen",
  "§ 111 StGB – Öffentliche Aufforderung zu Straftaten",
  "§ 126 StGB – Störung des öffentlichen Friedens durch Androhung von Straftaten",
  "§ 130 StGB – Volksverhetzung",
  "§ 131 StGB – Gewaltdarstellung",
  "§ 140 StGB – Belohnung und Billigung von Straftaten",
  "§ 166 StGB – Beschimpfung von Bekenntnissen, Religionsgesellschaften und Weltanschauungsvereinigungen",
  "§ 185 StGB – Beleidigung",
  "§ 186 StGB – Üble Nachrede",
  "§ 187 StGB – Verleumdung",
  "§ 189 StGB – Verunglimpfung des Andenkens Verstorbener",
  "§ 240 StGB – Nötigung",
  "§ 241 StGB – Bedrohung",
]

interface InstanceViewProps {
  instanceId: string
  onUnsavedChanges: (hasChanges: boolean) => void
}

interface Comment {
  id: number
  author: string
  content: string
  timestamp: string
  avatar: string
}

export default function InstanceView({ instanceId, onUnsavedChanges }: InstanceViewProps) {
  const [selectFields, setSelectFields] = useState([{ id: 1, value: "" }])
  const [isSaved, setIsSaved] = useState(false)
  const [showSuccessMessage, setShowSuccessMessage] = useState(false)
  const [canChangeDecision, setCanChangeDecision] = useState(false)
  const [feedbackSubmitted, setFeedbackSubmitted] = useState(false)
  const [activeTab, setActiveTab] = useState("")
  const [newComment, setNewComment] = useState("")
  const [showFeedbackModal, setShowFeedbackModal] = useState(false)
  const [feedbackChecks, setFeedbackChecks] = useState({
    classification: false,
    addressee: false,
    gap: false,
  })
  const [comments, setComments] = useState<Comment[]>([
  ])

  const addSelectField = () => {
    if (selectFields.length < 5) {
      setSelectFields([...selectFields, { id: Date.now(), value: "" }])
    }
  }

  const removeSelectField = (id: number) => {
    if (selectFields.length <= 1) return // keep at least one field
    const next = selectFields.filter((f) => f.id !== id)
    setSelectFields(next)
    const hasValues = next.some((f) => f.value !== "") // update "unsaved changes" state depending on remaining values
    onUnsavedChanges(hasValues && !isSaved)
    }

  const updateSelectField = (id: number, value: string) => {
    setSelectFields(selectFields.map((field) => (field.id === id ? { ...field, value } : field)))

    const hasValues = selectFields.some((field) => field.value !== "") || value !== ""
    onUnsavedChanges(hasValues && !isSaved)
  }

  const NO_OFFENSE = "Kein Strafbestand"

  const handleSave = () => {
    setIsSaved(true)
    setShowSuccessMessage(true)
    setCanChangeDecision(true)
    onUnsavedChanges(false)

    setTimeout(() => {
      setShowSuccessMessage(false)
    }, 5000)
  }

  const handleChangeDecision = () => {
    setIsSaved(false)
    setCanChangeDecision(false)
    setFeedbackSubmitted(false)
    setShowSuccessMessage(false)
  }

  const handleUseFeedback = () => {
    setShowFeedbackModal(true)
  }

  const isFrozen = isSaved || feedbackSubmitted

  const handleSendComment = () => {
    if (newComment.trim()) {
      const comment: Comment = {
        id: Date.now(),
        author: "Sie",
        content: newComment,
        timestamp: "gerade eben",
        avatar: "/icon-user.png",
      }
      setComments([...comments, comment])
      setNewComment("")
    }
  }

  const handleFeedbackSubmit = () => {
    setShowFeedbackModal(false)
    setFeedbackSubmitted(true)
    setShowSuccessMessage(false)
    onUnsavedChanges(false)
  }

  const getSelectedCategories = () => {
    return selectFields.filter((field) => field.value !== "").map((field) => field.value)
  }

  const isUnderrepresented = (category: string) => {
    // Categories 185 and 186 are NOT underrepresented
    return !category.includes("§ 185") && !category.includes("§ 186")
  }

  const lastFieldHasValue = selectFields[selectFields.length - 1]?.value !== ""
  const anyFieldHasValue = selectFields.some((field) => field.value !== "")
  const showPlusButton = !isSaved && !feedbackSubmitted

  const allFeedbackChecksComplete = feedbackChecks.classification && feedbackChecks.addressee && feedbackChecks.gap

  const renderTabContent = () => {
    switch (activeTab) {
      case "comments":
        return (
          <div className="space-y-4 max-h-96 overflow-y-auto">
            {comments.map((comment) => (
              <div key={comment.id} className="flex items-start space-x-3">
                <Avatar className="w-10 h-10 rounded-full">
                  <AvatarImage src={comment.avatar || "/placeholder.svg"} />
                  <AvatarFallback className="bg-blue-600 text-white rounded-full">{comment.author[0]}</AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <div className="flex items-center space-x-2 mb-1">
                    <span className="font-medium text-gray-900">{comment.author}</span>
                    <span className="text-sm text-gray-500">{comment.timestamp}</span>
                  </div>
                  <div className="text-gray-900 whitespace-pre-line">{comment.content}</div>
                </div>
              </div>
            ))}

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
                  <Textarea
                    value={newComment}
                    onChange={(e) => setNewComment(e.target.value)}
                    placeholder="Kommentar eingeben..."
                    className="min-h-[100px]"
                  />
                  <div className="flex justify-end">
                    <Button onClick={handleSendComment} className="bg-blue-600 hover:bg-blue-700 text-white">
                      Senden
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )

      case "legal":
        return (
          <div className="space-y-6 max-h-96 overflow-y-auto">
            <div>
              <h3 className="font-semibold text-gray-900 mb-3">
                Gesetzestext aus dem Strafgesetzbuch (StGB): § 241 StGB – Bedrohung
              </h3>
              <div className="text-gray-900 space-y-2">
                <p>
                  (1) Wer einen Menschen mit der Begehung einer gegen ihn oder eine ihm nahestehende Person <span className="bg-yellow-200 px-1">gerichteten rechtswidrigen</span>  
                  Tat gegen die sexuelle Selbstbestimmung, die körperliche Unversehrtheit, die <span className="bg-red-200 px-1">persönliche Freiheit</span> 
                  oder gegen eine Sache von bedeutendem Wert bedroht, wird mit Freiheitsstrafe bis zu einem Jahr oder mit Geldstrafe bestraft.
                </p>
                <p>
                  (2) Wer einen Menschen mit der Begehung eines gegen ihn oder eine ihm nahestehende Person gerichteten Verbrechens bedroht, wird mit 
                  Freiheitsstrafe bis zu zwei Jahren oder mit Geldstrafe bestraft.
                </p>
                <p>
                  (3) Ebenso wird bestraft, wer wider besseres Wissen einem Menschen vortäuscht, daß die Verwirklichung eines gegen ihn oder eine 
                  ihm nahestehende Person gerichteten Verbrechens bevorstehe.
                </p>
                <p>
                  (4) Wird die Tat öffentlich, in einer Versammlung oder durch <span className="bg-yellow-200 px-1">Verbreiten eines Inhalts</span> (§ 11 Absatz 3) 
                  begangen, ist in den Fällen des Absatzes 1 auf Freiheitsstrafe bis zu zwei Jahren oder auf Geldstrafe und in den Fällen der Absätze 2 und 3 auf 
                  Freiheitsstrafe bis zu drei Jahren oder auf Geldstrafe zu erkennen.
                </p>
                <p> 
                  (5) Die für die angedrohte Tat geltenden Vorschriften über den Strafantrag sind entsprechend anzuwenden.
                </p>
              </div>
            </div>

            <div>
              <h4 className="font-semibold text-gray-900 mb-3">Ähnliche Urteile</h4>
            </div>
            <div className="text-gray-900 space-y-2">
                <p>
                  Keine Ähnlichen Urteile gefunden.
                </p>
            </div>
          </div>
        )

      case "author":
        return (
          <div className="space-y-4 max-h-96 overflow-y-auto">
            <div className="flex items-start space-x-3">
              <Avatar className="w-12 h-12 rounded-full">
                <AvatarImage src="/icon-classifier.png" />
                <AvatarFallback className="bg-purple-600 text-white rounded-full">AI</AvatarFallback>
              </Avatar>
              <div className="flex-1">
                <p className="text-gray-900 mb-3">
                  "Die IP-Adresse von Steffen Bäcker @Badforyousteve ist in <strong>Kerpen, Nordrhein-Westfalen</strong>. Es wurde eine andere
                  Instanz gefunden, die als <strong>§ 241 StGB – Bedrohung</strong> kategorisiert wurde. Hier ist die
                  Instanz:"
                </p>
                <div className="bg-white p-3 rounded border">
                  <Image
                    src="/instance-4-text.png"
                    alt="Klassifizierter Text"
                    width={756}
                    height={110}
                    className="w-full h-auto"
                    priority
                  />
                </div>
              </div>
            </div>

            <div>
              <h4 className="font-medium text-gray-900 mb-3">Hier ist die Bio des Profils auf Social Media:</h4>
              <div className="bg-gray-50 p-4 rounded-lg">
                <div className="flex items-center space-x-3 mb-3">
                  <Avatar className="w-10 h-10 rounded-full">
                    <AvatarFallback className="bg-gray-600 text-white rounded-full">B</AvatarFallback>
                  </Avatar>
                  <div>
                    <div className="font-medium">Steffen Bäcker</div>
                    <div className="text-gray-600">@Badforyousteve</div>
                  </div>
                </div>
                <div className="text-sm text-gray-900 space-y-1">
                  <div>
                    <strong>41</strong> Beiträge <strong>1.230</strong> Follower*innen <strong>1.198</strong> Gefolgt
                  </div>
                  <div className="mt-2">
                    <div>Wir sind nicht nur wütend.</div>
                    <div>Wir sind auch mehr. </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )

      case "content":
        return (
          <div className="space-y-4 max-h-96 overflow-y-auto">
            <div className="flex items-start space-x-3">
              <Avatar className="w-12 h-12 rounded-full">
                <AvatarImage src="/icon-classifier.png" />
                <AvatarFallback className="bg-purple-600 text-white rounded-full">AI</AvatarFallback>
              </Avatar>
              <div className="flex-1">
                <p className="text-gray-900 mb-4">
                  "Der Post ist ein <strong>Kommentar</strong> auf ein Reel von Cem Özdemir. Es gibt 21 Likes und zwei Antworten auf den
                  Kommentar. Der Post bezieht sich mit 70% Wahrscheinlichkeit auf <strong>Cem Özdemir</strong>, einen deutschen Politiker 
                  von Bündnis 90/Die Grünen. Er war von Dezember 2021 bis Mai 2025 Bundesminister für Ernährung und Landwirtschaft. Von November 
                  2024 bis Mai 2025 war er zusätzlich Bundesminister für Bildung und Forschung. "
                </p>
              </div>
            </div>

            <div>
              <h4 className="font-medium text-gray-900 mb-3">
                Hier ist die Instanz in ihrem Originalkontext auf Social Media:
              </h4>
              <div className="bg-white border rounded-lg overflow-hidden">
                <Image
                  src="/instance-3-ex4.png"
                  alt="Original social media context"
                  width={600}
                  height={400}
                  className="w-full"
                />
              </div>
            </div>
          </div>
        )

      default:
        return null
    }
  }

  return (
    <div className="flex">
      <div className="w-80 bg-white shadow-lg border-r border-gray-200 h-screen sticky top-0 overflow-y-auto">
        <div className="p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-gray-900">Navigation</h3>
            <div className="flex items-center space-x-2">
              <Button variant="ghost" size="sm" className="p-1">
                <ChevronLeft className="w-4 h-4" />
              </Button>
              <Button variant="ghost" size="sm" className="p-1">
                <ChevronRight className="w-4 h-4" />
              </Button>
            </div>
          </div>

          <div className="space-y-4">
            <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
              <h4 className="font-medium text-blue-900 mb-2">Aktuelle Navigation</h4>
              <div className="space-y-2 text-sm text-blue-800">
                <div className="flex items-center space-x-2">
                  <Users className="w-4 h-4" />
                  <span>Zugewiesene Posts</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Filter className="w-4 h-4" />
                  <span>Gefiltert nach: § 140 StGB</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Calendar className="w-4 h-4" />
                  <span>Sortiert nach: Datum (aufsteigend)</span>
                </div>
              </div>
            </div>

            <div className="border-t pt-4">
              <h4 className="font-medium text-gray-900 mb-3">Navigationsoptionen</h4>
              <div className="space-y-2">
                <Button variant="ghost" className="w-full justify-start text-sm">
                  <Users className="w-4 h-4 mr-2" />
                  Zugewiesene Posts (6)
                </Button>
                <Button variant="ghost" className="w-full justify-start text-sm">
                  <Search className="w-4 h-4 mr-2" />
                  Automatisch erkannte Posts (3)
                </Button>
                <Button variant="ghost" className="w-full justify-start text-sm">
                  <Filter className="w-4 h-4 mr-2" />
                  Gefilterte Posts
                </Button>
                <Button variant="ghost" className="w-full justify-start text-sm">
                  <Calendar className="w-4 h-4 mr-2" />
                  Nach Datum sortiert
                </Button>
              </div>
            </div>

            <div className="border-t pt-4">
              <h4 className="font-medium text-gray-900 mb-3">Aktuelle Position</h4>
              <div className="text-sm text-gray-600">
                <p>Post 1 von 6 zugewiesenen Posts</p>
                <p>Instanz #{instanceId}</p>
                <p>Zugewiesen von: Kim Best</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="flex-1 max-w-4xl mx-auto p-6 space-y-6">
        <Dialog open={showFeedbackModal} onOpenChange={setShowFeedbackModal}>
          <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle className="text-left">
                Sie wollen die obenstehende Instanz als Beispiel für die Kategorie(n):
              </DialogTitle>
            </DialogHeader>

            <div className="space-y-6">
              <div>
                {getSelectedCategories().map((category, index) => (
                  <div key={index} className="font-medium text-gray-900">
                    {category}
                  </div>
                ))}
                <p className="text-gray-700 mt-2">dem Trainingsdatensatz zufügen.</p>
              </div>

              <div>
                <h3 className="font-medium text-gray-900 mb-4">
                  Bitte prüfen sie, ob die folgende Checkliste erfüllt ist.
                </h3>
                <div className="space-y-3">
                  <div className="flex items-start space-x-3">
                    <Checkbox
                      id="classification"
                      checked={feedbackChecks.classification}
                      onCheckedChange={(checked) =>
                        setFeedbackChecks((prev) => ({ ...prev, classification: checked as boolean }))
                      }
                    />
                    <label htmlFor="classification" className="text-gray-700 cursor-pointer">
                      Der Post lässt sich dem Strafbestand klar und plausibel zuordnen.
                    </label>
                  </div>
                  <div className="flex items-start space-x-3">
                    <Checkbox
                      id="addressee"
                      checked={feedbackChecks.addressee}
                      onCheckedChange={(checked) =>
                        setFeedbackChecks((prev) => ({ ...prev, addressee: checked as boolean }))
                      }
                    />
                    <label htmlFor="addressee" className="text-gray-700 cursor-pointer">
                      Adressat und Sprechakt des Posts sind klar.
                    </label>
                  </div>
                  <div className="flex items-start space-x-3">
                    <Checkbox
                      id="gap"
                      checked={feedbackChecks.gap}
                      onCheckedChange={(checked) => setFeedbackChecks((prev) => ({ ...prev, gap: checked as boolean }))}
                    />
                    <label htmlFor="gap" className="text-gray-700 cursor-pointer">
                      Das Beispiel erfüllt eine Lücke im Datensatz.
                    </label>
                  </div>
                </div>
              </div>

              {getSelectedCategories().length > 0 && (
                <div className="space-y-2">
                  {getSelectedCategories().some(isUnderrepresented) && (
                    <div>
                      <div className="text-red-600 font-medium mb-2">
                        Diese Kategorie ist im Datensatz bisher unterrepräsentiert:
                      </div>
                      <div className="space-y-1">
                        {getSelectedCategories()
                          .filter(isUnderrepresented)
                          .map((category, index) => {
                            const categoryCode = category.match(/§\s*(\d+[a-z]?)/)?.[0] || category
                            return (
                              <span
                                key={index}
                                className={`inline-block px-2 py-1 rounded text-sm font-medium mr-2 ${getCategoryColor(categoryCode)}`}
                              >
                                {categoryCode}
                              </span>
                            )
                          })}
                      </div>
                    </div>
                  )}

                  {getSelectedCategories().some((cat) => !isUnderrepresented(cat)) && (
                    <div>
                      <div className="text-green-600 font-medium mb-2">
                        Diese Kategorie ist im Datensatz nicht unterrepräsentiert:
                      </div>
                      <div className="space-y-1">
                        {getSelectedCategories()
                          .filter((cat) => !isUnderrepresented(cat))
                          .map((category, index) => {
                            const categoryCode = category.match(/§\s*(\d+[a-z]?)/)?.[0] || category
                            return (
                              <span
                                key={index}
                                className={`inline-block px-2 py-1 rounded text-sm font-medium mr-2 ${getCategoryColor(categoryCode)}`}
                              >
                                {categoryCode}
                              </span>
                            )
                          })}
                      </div>
                    </div>
                  )}
                </div>
              )}

              <div>
                <Image
                  src="/histogram.png"
                  alt="Anzahl Trainingsdatenpunkte pro Kategorie"
                  width={800}
                  height={400}
                  className="w-full rounded-lg border"
                />
              </div>

              <div className="text-gray-700">Es wurden keine ähnlichen Duplikate gefunden.</div>

              <div className="flex justify-end">
                <Button
                  onClick={handleFeedbackSubmit}
                  disabled={!allFeedbackChecksComplete}
                  className="bg-blue-600 hover:bg-blue-700 text-white px-8 disabled:bg-gray-300 disabled:cursor-not-allowed"
                >
                  Einreichen
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>

        {/* Instance Card */}
        <Card className="bg-white">
          <CardContent className="p-6">
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center space-x-4">
                <h2 className="text-lg font-semibold text-gray-900">Instanz #7834</h2>
              </div>
            </div>
            <div className="bg-white p-3 rounded border">
              <Image
                src="/instance-3-text.png"
                alt="Klassifizierter Text"
                width={756}
                height={110}
                className="w-full h-auto"
                priority
              />
            </div>
            <div className="text-sm text-gray-500 mb-4">09. Juni 2025, 9:18 · 1.142 Mal angezeigt</div>
          </CardContent>
        </Card>

        {/* AI Classification Result */}
        <Card className="bg-white">
          <CardContent className="p-6">
            <div className="flex items-center space-x-4">
              <div className="w-10 h-10 rounded-full">
                <Image src="/icon-classifier.png" alt="AI Classifier" width={24} height={24} className="rounded-full" />
              </div>
              <div className="flex-1">
                <p className="text-gray-900">
                  Von KI mit 97% Sicherheit als{" "}
                  <span
                    className={`px-2 py-1 rounded-full text-sm font-medium ${getCategoryColor("§241 Bedrohung")}`}
                  >
                    §241 Bedrohung
                  </span>{" "}
                  eingestuft.
                </p>
              </div>
            </div>

            <div className="flex items-center justify-between mt-6 border-b border-gray-200">
              <div className="flex items-center space-x-8">
                <button
                  onClick={() => setActiveTab(activeTab === "comments" ? "" : "comments")}
                  className={`flex items-center space-x-2 pb-2 ${
                    activeTab === "comments" ? "text-blue-600 border-b-2 border-blue-600" : "text-gray-600"
                  }`}
                >
                  <div
                    className={`w-4 h-4 rounded-full flex items-center justify-center ${
                      activeTab === "comments" ? "bg-blue-600" : "bg-gray-600"
                    }`}
                  >
                    <MessageCircle className="w-3 h-3 text-white" />
                  </div>
                  <span className="text-sm font-medium">Kommentare (0)</span>
                </button>
                <button
                  onClick={() => setActiveTab(activeTab === "legal" ? "" : "legal")}
                  className={`flex items-center space-x-2 pb-2 ${
                    activeTab === "legal" ? "text-blue-600 border-b-2 border-blue-600" : "text-gray-600"
                  }`}
                >
                  <div
                    className={`w-4 h-4 rounded-full flex items-center justify-center ${
                      activeTab === "legal" ? "bg-blue-600" : "bg-gray-600"
                    }`}
                  >
                    <Info className="w-3 h-3 text-white" />
                  </div>
                  <span className="text-sm">Legaler Kontext (1)</span>
                </button>
                <button
                  onClick={() => setActiveTab(activeTab === "author" ? "" : "author")}
                  className={`flex items-center space-x-2 pb-2 ${
                    activeTab === "author" ? "text-blue-600 border-b-2 border-blue-600" : "text-gray-600"
                  }`}
                >
                  <div
                    className={`w-4 h-4 rounded-full flex items-center justify-center ${
                      activeTab === "author" ? "bg-blue-600" : "bg-gray-600"
                    }`}
                  >
                    <User className="w-3 h-3 text-white" />
                  </div>
                  <span className="text-sm">Post-Verfasser*in</span>
                </button>
                <button
                  onClick={() => setActiveTab(activeTab === "content" ? "" : "content")}
                  className={`flex items-center space-x-2 pb-2 ${
                    activeTab === "content" ? "text-blue-600 border-b-2 border-blue-600" : "text-gray-600"
                  }`}
                >
                  <div
                    className={`w-4 h-4 rounded-full flex items-center justify-center ${
                      activeTab === "content" ? "bg-blue-600" : "bg-gray-600"
                    }`}
                  >
                    <Search className="w-3 h-3 text-white" />
                  </div>
                  <span className="text-sm">Post-Inhalt & Interaktionen</span>
                </button>
              </div>
              {activeTab && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setActiveTab("")}
                  className="p-1 text-gray-500 hover:text-gray-700"
                >
                  <X className="w-4 h-4" />
                </Button>
              )}
            </div>

            {activeTab && <div className="mt-6">{renderTabContent()}</div>}
          </CardContent>
        </Card>

        {/* Classification Section */}
        <Card className="bg-white">
          <CardContent className="p-6">
            <div className="flex items-start space-x-4">
              <Avatar className="w-10 h-10 rounded-full">
                <AvatarImage src="/icon-user.png" />
                <AvatarFallback className="bg-blue-600 text-white rounded-full">
                  <User className="w-5 h-5" />
                </AvatarFallback>
              </Avatar>

              <div className="flex-1 space-y-4">
                <div className="flex items-center space-x-2">
                  <span className="text-gray-900 font-medium">Einstufen als</span>
                </div>

                {/* Dynamic Select Fields */}
                <div className="space-y-3">
                  {selectFields.map((field, index) => (
                    <div key={field.id} className="flex items-center space-x-2">
                      <div className="flex-1">
                        <Select
                          value={field.value}
                          onValueChange={(value) => updateSelectField(field.id, value)}
                          disabled={isFrozen}
                        >
                          <SelectTrigger className="w-full">
                            <SelectValue placeholder="Auswählen" />
                          </SelectTrigger>
                          <SelectContent>
                            {(index === 0 ? categories : categories.filter((c) => c !== NO_OFFENSE)).map((category, idx) => {
                                const categoryCode = category.match(/§\s*(\d+[a-z]?)/)?.[0] || category
                                const colorClass = getCategoryColor(categoryCode)
                                return (
                                <SelectItem key={idx} value={category}>
                                    <span className={`px-2 py-1 rounded text-sm ${colorClass}`}>{category}</span>
                                </SelectItem>
                                )
                            })}
                            </SelectContent>
                        </Select>
                      </div>
                      
                        {/* − button: show for all rows except the first, only when changes are allowed */}
                        {index > 0 && !isFrozen && (
                            <Button
                                variant="outline"
                                size="sm"
                                onClick={() => removeSelectField(field.id)}
                                className="w-8 h-8 p-0 bg-transparent rounded-full"
                                aria-label="Feld entfernen"
                                title="Feld entfernen"
                                >
                                <Minus className="w-4 h-4" />
                            </Button>
                        )}
                      
                      {/* + button: only on last row, non-empty, not 'Kein Strafbestand', <5 fields, and not frozen */}
                      {index === selectFields.length - 1 &&
                        field.value !== "" &&
                        field.value !== "Kein Strafbestand" &&    
                        selectFields.length < 5 &&
                        showPlusButton && (
                            <Button
                                variant="outline"
                                size="sm"
                                onClick={addSelectField}
                                className="w-8 h-8 p-0 bg-transparent rounded-full"
                                >
                                <Plus className="w-4 h-4" />
                            </Button>
                        )}
                    </div>
                  ))}
                </div>

                {/* Success Messages */}
                {showSuccessMessage && !feedbackSubmitted && (
                  <div className="text-green-600 text-sm font-medium">Entscheidung wurde gespeichert</div>
                )}
                {feedbackSubmitted && (
                  <div className="text-green-600 text-sm font-medium">Entscheidung wurde als Feedback genutzt</div>
                )}

                {/* Action Buttons */}
                {anyFieldHasValue && (
                  <div className="flex items-center justify-center space-x-4 pt-4">
                    {!isSaved && !feedbackSubmitted && (
                      <Button onClick={handleSave} className="bg-blue-600 hover:bg-blue-700 text-white px-8">
                        Speichern
                      </Button>
                    )}
                    {isSaved && !feedbackSubmitted && (
                      <Button
                        onClick={handleUseFeedback}
                        variant="outline"
                        className="border-blue-600 text-blue-600 hover:bg-blue-50 px-8 bg-transparent"
                      >
                        Als Feedback verwenden
                      </Button>
                    )}
                    {(canChangeDecision || feedbackSubmitted) && (
                      <Button
                        onClick={handleChangeDecision}
                        variant="outline"
                        className="border-gray-600 text-gray-600 hover:bg-gray-50 px-8 bg-transparent"
                      >
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