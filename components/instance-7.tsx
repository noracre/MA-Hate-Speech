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
interface Instance7Props {
  onUnsavedChanges: (hasChanges: boolean) => void
  onNext?: () => void
  instanceMeta: { instanceId: string; instanceFile: string }
  onSaveHumanClassification: (p: {
    instanceId: string
    instanceFile: string
    selectedCategories: string[]
  }) => void
  initialSelectedCategories?: string[]
}

export default function Instance7({
  onUnsavedChanges,
  onNext,
  instanceMeta,
  onSaveHumanClassification,
  initialSelectedCategories, 
}: Instance7Props) {
  const legalTab = (
    <div className="space-y-6 max-h-96 overflow-y-auto">
      <div>
        <h3 className="font-semibold text-gray-900 mb-3 flex flex-wrap items-center gap-2">
          Gesetzestext aus dem Strafgesetzbuch (StGB):
          <span
            className={`px-2 py-1 rounded-full text-sm font-medium ${getCategoryColor("§111 Öffentliche Aufforderung zu Straftaten")}`}
          >
            §111 Öffentliche Aufforderung zu Straftaten
          </span>
        </h3>
        <div className="text-gray-900 space-y-2">
          <p>
            (1) Wer öffentlich, in einer Versammlung oder durch Verbreiten eines Inhalts (§ 11 Absatz 3) zu einer rechtswidrigen Tat auffordert, 
            wird wie ein Anstifter (§ 26) bestraft.
          </p>
          <p>
            (2) Bleibt die Aufforderung ohne Erfolg, so ist die Strafe Freiheitsstrafe bis zu fünf Jahren oder Geldstrafe. Die Strafe darf nicht schwerer sein als die, 
            die für den Fall angedroht ist, dass die Aufforderung Erfolg hat (Absatz 1); § 49 Abs. 1 Nr. 2 ist anzuwenden.
          </p>
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
            "Die IP-Adresse von Claudia Musterposterin @classischeclaudia ist in <strong>Schönefeld, Brandenburg</strong>. Es wurde keine andere
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
              <div className="font-medium">Claudia Musterposterin</div>
              <div className="text-gray-600">@classischeclaudia</div>
            </div>
          </div>
          <div className="text-sm text-gray-900 space-y-1">
            <div><strong>17</strong> Beiträge <strong>101</strong> Follower*innen <strong>399</strong> Gefolgt</div>
            <div className="mt-2">
              <div>Wer morgens zerknittert aufwacht,</div>
              <div>hat mehr Möglichkeiten sich zu entfalten.</div>
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
            "Der Post ist eine <strong>Antwort</strong> auf einen Tweet von Bernd Sauerteig. Es gibt keine Reposts oder Zitate. 
            Der Kommentar bezieht sich mit 49% Wahrscheinlichkeit auf <strong>Bernd Sauerteig</strong>"
          </p>
        </div>
      </div>

      <div>
        <h4 className="font-medium text-gray-900 mb-3">Hier ist die Instanz in ihrem Originalkontext auf Social Media:</h4>
        <div className="bg-white border rounded-lg overflow-hidden">
          <Image src="/instance-7-ex4.png" alt="Original social media context" width={600} height={400} className="w-full" />
        </div>
      </div>
    </div>
  )

  return (
    <InstanceParent
      instanceId="7826"
      instanceTitle="Instanz #7826"
      instanceImageSrc="/instance-7-text.png"
      instanceImageAlt="Klassifizierter Text"
      limeImageSrc="/instance-7-lime.png"
      confidencePercent="50"
      dateViews="08. Juni 2025, 15:30 · 786 Mal angezeigt"
      aiBadgeText="§ 111 Öffentliche Aufforderung zu Straftaten"
      aiBadgeColorKey="§ 111 Öffentliche Aufforderung zu Straftaten"
      categories={categories}
      commentsSeed={[
        {
          id: 1,
          author: "Kim Best",
          content:
            'Thema: Weitere Kategorien\n"Zusätzlich als § 185 StGB – Beleidigung kategorisieren?"',
          timestamp: "vor 1 Tag",
          avatar: "/icon-other-user.png",
        },
      ]}
      legalTab={legalTab}
      authorTab={authorTab}
      contentTab={contentTab}
      onUnsavedChanges={onUnsavedChanges}
      onNext={onNext}
      instanceMeta={instanceMeta}
      onSaveHumanClassification={onSaveHumanClassification}
      initialSelectedCategories={initialSelectedCategories} 
      highlightText="Du dummer Nazi-Hurensohn! Ich werde dich finden und dir zeigen was passiert. Geh zurück in dein Land, du gehörst nicht hierher. Diese Politiker sind alle korrupt und sollten alle ins Gefängnis!"
      maxHighlights={8}
      onHighlightChange={(indices, words) => {
      // persist with feedback payload if you like
      // console.log({ indices, words })
    }}
    />
  )
}
