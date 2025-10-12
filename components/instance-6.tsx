"use client"
import InstanceParent from "@/components/InstanceParent"
import Image from "next/image"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
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
  "§ 166 StGB – Beschimpfung ...",
  "§ 185 StGB – Beleidigung",
  "§ 186 StGB – Üble Nachrede",
  "§ 187 StGB – Verleumdung",
  "§ 189 StGB – Verunglimpfung ...",
  "§ 240 StGB – Nötigung",
  "§ 241 StGB – Bedrohung",
]
interface Instance6Props {
  onUnsavedChanges: (hasChanges: boolean) => void
  onNext?: () => void
  instanceMeta: { instanceId: string; instanceFile: string }
  onSaveHumanClassification: (p: {
    instanceId: string
    instanceFile: string
    selectedCategories: string[]
  }) => void
}

export default function Instance6({
  onUnsavedChanges,
  onNext,
  instanceMeta,
  onSaveHumanClassification,
}: Instance6Props) {
  const legalTab = (
    <div className="space-y-6 max-h-96 overflow-y-auto">
      <div>
        <h3 className="font-semibold text-gray-900 mb-3 flex flex-wrap items-center gap-2">
          Gesetzestext aus dem Strafgesetzbuch (StGB):
          <span
            className={`px-2 py-1 rounded-full text-sm font-medium ${getCategoryColor("Kein Strafbestand")}`}
          >
            Kein Strafbestand
          </span>
        </h3>
        <div className="text-gray-900 space-y-2">
          <p> Alle Kategorie Definitionen finden Sie im FAQ.</p>
        </div>
      </div>

      <div>
        <h4 className="font-semibold text-gray-900 mb-3">Ähnliche Urteile</h4>
        <div className="text-gray-900 space-y-2"><p>Keine Ähnlichen Urteile gefunden.</p></div>
      </div>
    </div>
  )

  const authorTab = (
    <div className="space-y-4 max-h-96 overflow-y-auto">
      <div className="flex items-start space-x-3">
        <Avatar className="w-12 h-12 rounded-full">
          <AvatarImage src="/icon-classifier.png" />
          <AvatarFallback className="bg-purple-600 text-white rounded-full">AI</AvatarFallback>
        </Avatar>
        <div className="flex-1">
          <p className="text-gray-900 mb-3">
            "Die IP-Adresse von Max Musterposter @mustermax ist in <strong>Möckern, Sachsen-Anhalt</strong>. Es wurde keine andere
            Instanz gefunden, die als Strafbestand kategorisiert wurde."
          </p>
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
              <div className="font-medium">Max Musterposter</div>
              <div className="text-gray-600">@mustermax</div>
            </div>
          </div>
          <div className="text-sm text-gray-900 space-y-1">
            <div><strong>4</strong> Beiträge <strong>21</strong> Follower*innen <strong>34</strong> Gefolgt</div>
            <div className="mt-2">
              <div>Stolzer Papa von 3 Söhnen</div>
              <div>Hobbybastler, Technik-Enthusiast</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )

  const contentTab = (
    <div className="space-y-4 max-h-96 overflow-y-auto">
      <div className="flex items-start space-x-3">
        <Avatar className="w-12 h-12 rounded-full">
          <AvatarImage src="/icon-classifier.png" />
          <AvatarFallback className="bg-purple-600 text-white rounded-full">AI</AvatarFallback>
        </Avatar>
        <div className="flex-1">
          <p className="text-gray-900 mb-4">
            "Der Post ist ein <strong>Kommentar</strong> auf ein Reel von Andreas Nutzer @AndererNutzer. Es gibt 49 Likes und eine Antwort auf den 
            Kommentar. Der Kommentar bezieht sich mit 50% Wahrscheinlichkeit auf <strong>Andreas Nutzer</strong>."
          </p>
        </div>
      </div>

      <div>
        <h4 className="font-medium text-gray-900 mb-3">Hier ist die Instanz in ihrem Originalkontext auf Social Media:</h4>
        <div className="bg-white border rounded-lg overflow-hidden">
          <Image src="/instance-6-ex4.png" alt="Original social media context" width={600} height={400} className="w-full" />
        </div>
      </div>
    </div>
  )

  return (
    <InstanceParent
      instanceId="7827"
      instanceTitle="Instanz #7827"
      instanceImageSrc="/instance-6-text.png"
      instanceImageAlt="Klassifizierter Text"
      limeImageSrc="/instance-6-lime.png"
      confidencePercent="90"
      dateViews="08. Juni 2025, 16:06 · 142 Mal angezeigt"
      aiBadgeText="Kein Strafbestand"
      aiBadgeColorKey="Kein Strafbestand"
      categories={categories}
      legalCount={0}
      commentsSeed={[]}
      legalTab={legalTab}
      authorTab={authorTab}
      contentTab={contentTab}
      onUnsavedChanges={onUnsavedChanges}
      onNext={onNext}
      instanceMeta={instanceMeta}
      onSaveHumanClassification={onSaveHumanClassification}
      highlightText="Menschen wie du sollten in diesem land nicht leben dürfen. Ihr seid alle gleich und macht nur Probleme."
      maxHighlights={8}
      onHighlightChange={(indices, words) => {
      // persist with feedback payload if you like
      // console.log({ indices, words })
    }}
    />
  )
}
