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
interface Instance5Props {
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

export default function Instance5({
  onUnsavedChanges,
  onNext,
  instanceMeta,
  onSaveHumanClassification,
  initialSelectedCategories, 
}: Instance5Props) {
  const legalTab = (
    <div className="space-y-6 max-h-96 overflow-y-auto">
      <div>
        <h3 className="font-semibold text-gray-900 mb-3 flex flex-wrap items-center gap-2">
          Gesetzestext aus dem Strafgesetzbuch (StGB):
          <span
            className={`px-2 py-1 rounded-full text-sm font-medium ${getCategoryColor("§130 Volksverhetzung")}`}
          >
            §130 Volksverhetzung
          </span>
        </h3>
        <div className="text-gray-900 space-y-2">
          <p>
            (1) Wer in einer Weise, die geeignet ist, den öffentlichen Frieden zu stören, 1. gegen eine nationale, rassische, religiöse oder durch ihre 
            ethnische Herkunft bestimmte <span className="bg-red-200 px-1">Gruppe</span>, gegen Teile der Bevölkerung oder gegen einen Einzelnen wegen 
            dessen Zugehörigkeit zu einer vorbezeichneten Gruppe oder zu einem Teil der Bevölkerung zum <span className="bg-yellow-200 px-1">Hass</span> aufstachelt, zu Gewalt- oder Willkürmaßnahmen auffordert 
            oder 2. die Menschenwürde anderer dadurch angreift, dass er eine vorbezeichnete Gruppe, Teile der Bevölkerung oder einen Einzelnen wegen dessen Zugehörigkeit
            zu einer vorbezeichneten Gruppe oder zu einem Teil der Bevölkerung beschimpft, böswillig verächtlich macht oder verleumdet,
            wird mit Freiheitsstrafe von drei Monaten bis zu fünf Jahren bestraft.
          </p>
          <p>
            (2) Mit Freiheitsstrafe bis zu drei Jahren oder mit Geldstrafe wird bestraft, wer 1. einen <span className="bg-yellow-200 px-1">Inhalt (§ 11 Absatz 3) verbreitet</span> oder 
            der Öffentlichkeit zugänglich macht oder einer Person unter achtzehn Jahren einen Inhalt (§ 11 Absatz 3) anbietet, überlässt oder zugänglich macht, der 
            a. zum Hass gegen eine in Absatz 1 Nummer 1 bezeichnete Gruppe, gegen Teile der Bevölkerung oder gegen einen Einzelnen wegen dessen Zugehörigkeit zu einer 
            in Absatz 1 Nummer 1 bezeichneten Gruppe oder zu einem <span className="bg-yellow-200 px-1">Teil der Bevölkerung</span> aufstachelt, b. zu 
            <span className="bg-yellow-200 px-1">Gewalt- oder Willkürmaßnahmen</span> gegen in Buchstabe a genannte 
            Personen oder Personenmehrheiten auffordert oder c. die Menschenwürde von in Buchstabe a genannten Personen oder Personenmehrheiten dadurch angreift, 
            dass diese beschimpft, böswillig verächtlich gemacht oder verleumdet werden oder 2. einen in Nummer 1 Buchstabe a bis c bezeichneten Inhalt (§ 11 Absatz 3) herstellt, 
            bezieht, liefert, vorrätig hält, anbietet, bewirbt oder es unternimmt, diesen ein- oder auszuführen, um ihn im Sinne der Nummer 1 zu verwenden oder einer anderen 
            Person eine solche Verwendung zu ermöglichen.
          </p>
          <p>
            (3) Mit Freiheitsstrafe bis zu fünf Jahren oder mit Geldstrafe wird bestraft, wer eine unter der Herrschaft des Nationalsozialismus begangene Handlung 
            der in § 6 Abs. 1 des Völkerstrafgesetzbuches bezeichneten Art in einer Weise, die geeignet ist, den öffentlichen Frieden zu stören, öffentlich oder in 
            einer Versammlung billigt, leugnet oder verharmlost.
          </p>
          <p>
            (4) Mit Freiheitsstrafe bis zu drei Jahren oder mit Geldstrafe wird bestraft, wer öffentlich oder in einer Versammlung den öffentlichen Frieden in einer die 
            Würde der Opfer verletzenden Weise dadurch stört, dass er die nationalsozialistische Gewalt- und Willkürherrschaft billigt, verherrlicht oder rechtfertigt.
          </p>
          <p> 
            (5) Mit Freiheitsstrafe bis zu drei Jahren oder mit Geldstrafe wird bestraft, wer eine Handlung der in den §§ 6 bis 12 des Völkerstrafgesetzbuches 
            bezeichneten Art gegen eine der in Absatz 1 Nummer 1 bezeichneten Personenmehrheiten oder gegen einen Einzelnen wegen dessen Zugehörigkeit zu einer dieser 
            Personenmehrheiten öffentlich oder in einer Versammlung in einer Weise billigt, leugnet oder gröblich verharmlost, die geeignet ist, zu Hass oder Gewalt gegen 
            eine solche Person oder Personenmehrheit aufzustacheln und den öffentlichen Frieden zu stören.
          </p>
          <p>
            (6) Absatz 2 gilt auch für einen in den Absätzen 3 bis 5 bezeichneten Inhalt (§ 11 Absatz 3).
          </p>
          <p>
            (7) In den Fällen des Absatzes 2 Nummer 1, auch in Verbindung mit Absatz 6, ist der Versuch strafbar.
          </p>
          <p>
            (8) In den Fällen des Absatzes 2, auch in Verbindung mit den Absätzen 6 und 7, sowie in den Fällen der Absätze 3 bis 5 gilt § 86 Absatz 4 entsprechend.
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
            "Die IP-Adresse von Cate Black @_Iamcate_ ist in <strong>Mülheim an der Ruhr, Nordrhein-Westfalen</strong>. Es wurde keine andere
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
              <div className="font-medium">Cate Black</div>
              <div className="text-gray-600">@_Iamcate_</div>
            </div>
          </div>
          <div className="text-sm text-gray-900 space-y-1">
            <div><strong>100</strong> Beiträge <strong>18.730</strong> Follower*innen <strong>1.167</strong> Gefolgt</div>
            <div className="mt-2">
              <div>Modell, Actress, Whatever</div>
              <div>Memoirs of a Sparklemuffin</div>
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
            "Der <strong>Post</strong> wurde auf X abgesetzt. Es gibt 488 Reposts und 57 Zitate. In dem Post werden <strong>"diese Politiker"</strong> genannt. 
            Das aktuelle Zeitgeschehen und die Sprache des Posts lassen darauf schließen, dass es sich dabei entweder um die Deutsche Bundesregierung aus CDU und SPD 
            handelt oder um die Amerikanische Regierung."
          </p>
        </div>
      </div>

      <div>
        <h4 className="font-medium text-gray-900 mb-3">Hier ist die Instanz in ihrem Originalkontext auf Social Media:</h4>
        <div className="bg-white border rounded-lg overflow-hidden">
          <Image src="/instance-5-ex4.png" alt="Original social media context" width={600} height={400} className="w-full" />
        </div>
      </div>
    </div>
  )

  return (
    <InstanceParent
      instanceId="7830"
      instanceTitle="Instanz #7830"
      instanceImageSrc="/instance-5-text.png"
      instanceImageAlt="Klassifizierter Text"
      limeImageSrc="/instance-5-lime.png"
      confidencePercent="70"
      dateViews="08. Juni 2025, 17:29 · 1.142 Mal angezeigt"
      aiBadgeText="§ 130 Volksverhetzung"
      aiBadgeColorKey="§130 Volksverhetzung"
      categories={categories}
      commentsSeed={[
        {
          id: 1,
          author: "Kim Best",
          content:
            'Thema: Als Feedback verwenden\n"Gerade Volksverhetzung scheint die KI nicht sehr gut zu können. Ich würde es als "Kein Strafbestand" kategorisieren und als Feedback verwenden."',
          timestamp: "vor 1 Tag",
          avatar: "/icon-other-user.png",
        },
                {
          id: 2,
          author: "Werkstudentin Anna",
          content:
            'Thema: Unsicherheit\n"Politiker*innen sind keine "vorbezeichneten Gruppe", oder?"',
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
      highlightText="Diese Politiker sind alle korrupt und sollten alle ins Gefängnis. Das System ist kaputt."
      maxHighlights={8}
      onHighlightChange={(indices, words) => {
      // persist with feedback payload if you like
      // console.log({ indices, words })
    }}
    />
  )
}
