"use client"
import InstanceParent from "@/components/InstanceParent"
import Image from "next/image"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

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
}

export default function Instance6({ onUnsavedChanges }: Instance6Props) {
  const legalTab = (
    <div className="space-y-6 max-h-96 overflow-y-auto">
      <div>
        <h3 className="font-semibold text-gray-900 mb-3">
          Dieser Post wurde der Kategorie <span className="italic">"Kein Strafbestand"</span> zugeordnet.
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
      dateViews="08. Juni 2025, 16:06 · 142 Mal angezeigt"
      aiBadgeText="Kein Strafbestand"
      aiBadgeColorKey="Kein Strafbestand"
      categories={categories}
      legalCount={0}
      commentsSeed={[]}
      legalTab={legalTab}
      authorTab={authorTab}
      contentTab={contentTab}
      onUnsavedChanges={onUnsavedChanges}  // ADD THIS LINE
    />
  )
}
