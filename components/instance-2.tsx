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
  "§ 166 StGB – Beschimpfung von Bekenntnissen, Religionsgesellschaften und Weltanschauungsvereinigungen",
  "§ 185 StGB – Beleidigung",
  "§ 186 StGB – Üble Nachrede",
  "§ 187 StGB – Verleumdung",
  "§ 189 StGB – Verunglimpfung des Andenkens Verstorbener",
  "§ 240 StGB – Nötigung",
  "§ 241 StGB – Bedrohung",
]
interface Instance2Props {
  onUnsavedChanges: (hasChanges: boolean) => void
}

export default function Instance2({ onUnsavedChanges }: Instance2Props) {
  const legalTab = (
    <div className="space-y-6 max-h-96 overflow-y-auto">
      <div>
        <h3 className="font-semibold text-gray-900 mb-3">
          Gesetzestext aus dem Strafgesetzbuch (StGB): § 140 StGB – Belohnung und Billigung von Straftaten
        </h3>
        <div className="text-gray-900 space-y-2">
          <p>
            Wer eine der in § 138 Absatz 1 Nummer 2 bis 4 und 5 letzte Alternative oder in § 126 Absatz 1
            genannten rechtswidrigen Taten oder eine <span className="bg-red-200 px-1">rechtswidrige Tat</span>{" "}
            nach § 176 Absatz 1 oder Absatz 3, § 176a, § 176b, nach den §§ 176c und 176d
          </p>
          <p>
            1. <span className="bg-yellow-200 px-1">belohnt</span>, nachdem sie begangen oder in strafbarer Weise
            versucht worden ist, oder
          </p>
          <p>
            2. in einer Weise, die geeignet ist, den öffentlichen Frieden zu stören, öffentlich, in einer
            Versammlung oder durch <span className="bg-yellow-200 px-1">Verbreiten</span> eines Inhalts (§ 11
            Absatz 3) <span className="bg-red-200 px-1">billigt</span>,
          </p>
          <p className="mt-4">wird mit Freiheitsstrafe bis zu drei Jahren oder mit Geldstrafe bestraft.</p>
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
            "Die IP-Adresse von Beispieluser @Beispieluser ist in <strong>Köln, Nordrhein-Westfalen</strong>. Es wurde keine andere
            Instanz gefunden, die als Hassrede kategorisiert wurde."
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
              <div className="font-medium">Beispieluser</div>
              <div className="text-gray-600">@Beispieluser</div>
            </div>
          </div>
          <div className="text-sm text-gray-900 space-y-1">
            <div><strong>4</strong> Beiträge <strong>80</strong> Follower*innen <strong>351</strong> Gefolgt</div>
            <div className="mt-2">
              <div>Mein Name ist User. Beispiel User.</div>
              <div>Agent 88</div>
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
            "Der Post ist ein <strong>Kommentar</strong> auf ein Reel von Philipp Amthor. Es gibt fünf Likes und eine Antwort auf den 
            Kommentar. Der Kommentar bezieht sich mit 95% Wahrscheinlichkeit auf <strong>Philipp Amthor</strong>, einen deutschen Politiker 
            der CDU. Er ist seit 2017 Mitglied des Deutschen Bundestages und seit 2025 Parlamentarischer Staatssekretär 
            beim Bundesminister für Digitales und Staatsmodernisierung. Zudem ist er seit 2024 Mitgliederbeauftragter im 
            Bundesvorstand der CDU. Von April 2024 bis Mai 2025 war er Generalsekretär der CDU Mecklenburg-Vorpommern."
          </p>
        </div>
      </div>

      <div>
        <h4 className="font-medium text-gray-900 mb-3">Hier ist die Instanz in ihrem Originalkontext auf Social Media:</h4>
        <div className="bg-white border rounded-lg overflow-hidden">
          <Image src="/instance-2-ex4.png" alt="Original social media context" width={600} height={400} className="w-full" />
        </div>
      </div>
    </div>
  )

  return (
    <InstanceParent
      instanceId="7835"
      instanceTitle="Instanz #7835"
      instanceImageSrc="/instance-2-text.png"
      instanceImageAlt="Klassifizierter Text"
      limeImageSrc="/instance-2-lime.png"
      dateViews="09. Juni 2025, 9:55 · 20.142 Mal angezeigt"
      aiBadgeText="§140 Belohnung und Billigung von Straftaten"
      aiBadgeColorKey="§140 Belohnung und Billigung von Straftaten"
      legalCount={1}
      categories={categories}
      commentsSeed={[
        {
          id: 1,
          author: "Werkstudentin Anna",
          content:
            'Thema: Unsicherheit\n"Ich war nicht sicher, ob es ein Strafbestand ist, wenn es um eine Person der öffentlichen Lebens geht."',
          timestamp: "vor 1 Tag",
          avatar: "/icon-other-user.png",
        },
      ]}
      legalTab={legalTab}
      authorTab={authorTab}
      contentTab={contentTab}
      onUnsavedChanges={onUnsavedChanges}
      highlightText="Was für ein kleiner feiger besoffener Nazi Hurensohn. Hätte definitiv mit ihm gekämpft. Was für ein kranker dummer Mensch."
      maxHighlights={8}
      onHighlightChange={(indices, words) => {
      // persist with feedback payload if you like
      // console.log({ indices, words })
    }}
    />
  )
}
