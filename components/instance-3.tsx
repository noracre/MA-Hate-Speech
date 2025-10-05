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

interface Instance3Props {
  onUnsavedChanges: (hasChanges: boolean) => void
}

export default function Instance3({ onUnsavedChanges }: Instance3Props) {
  const legalTab = (
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
            "Die IP-Adresse von Steffen Bäcker @Badforyousteve ist in <strong>Kerpen, Nordrhein-Westfalen</strong>. Es wurde eine andere
            Instanz gefunden, die als <strong>§ 241 StGB – Bedrohung</strong> kategorisiert wurde. Hier ist die Instanz:"
          </p>
          <div className="bg-white p-3 rounded border">
            <Image src="/instance-4-text.png" alt="Klassifizierter Text" width={756} height={110} className="w-full h-auto" priority />
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
            <div><strong>41</strong> Beiträge <strong>1.230</strong> Follower*innen <strong>1.198</strong> Gefolgt</div>
            <div className="mt-2">
              <div>Wir sind nicht nur wütend.</div>
              <div>Wir sind auch mehr.</div>
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
            "Der Post ist ein <strong>Kommentar</strong> auf ein Reel von Cem Özdemir. Es gibt 21 Likes und zwei Antworten auf den
            Kommentar. Der Post bezieht sich mit 70% Wahrscheinlichkeit auf <strong>Cem Özdemir</strong>, einen deutschen Politiker 
            von Bündnis 90/Die Grünen. Er war von Dezember 2021 bis Mai 2025 Bundesminister für Ernährung und Landwirtschaft. Von November 
            2024 bis Mai 2025 war er zusätzlich Bundesminister für Bildung und Forschung. "
          </p>
        </div>
      </div>

      <div>
        <h4 className="font-medium text-gray-900 mb-3">Hier ist die Instanz in ihrem Originalkontext auf Social Media:</h4>
        <div className="bg-white border rounded-lg overflow-hidden">
          <Image src="/instance-3-ex4.png" alt="Original social media context" width={600} height={400} className="w-full" />
        </div>
      </div>
    </div>
  )

  return (
    <InstanceParent
      instanceId="7834"
      instanceTitle="Instanz #7834"
      instanceImageSrc="/instance-3-text.png"
      instanceImageAlt="Klassifizierter Text"
      dateViews="09. Juni 2025, 9:18 · 1.142 Mal angezeigt"
      aiBadgeText="§241 Bedrohung"
      aiBadgeColorKey="§241 Bedrohung"
      categories={categories}
      commentsSeed={[]}
      legalTab={legalTab}
      authorTab={authorTab}
      contentTab={contentTab}
      onUnsavedChanges={onUnsavedChanges}  // ADD THIS LINE
    />
  )
}
