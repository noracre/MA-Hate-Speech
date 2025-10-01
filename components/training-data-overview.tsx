"use client"

import { useState } from "react"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Collapsible, CollapsibleTrigger, CollapsibleContent } from "@/components/ui/collapsible"
import { ChevronDown, ChevronRight } from "lucide-react"
import Image from "next/image"

/* import React, { useState } from "react"
import Card from "./ui/card"
import CardHeader from "./ui/card"
import CardTitle from "./ui/card"
import CardContent from "./ui/card"
import Collapsible from "./ui/collapsible"
import CollapsibleTrigger from "./ui/collapsible"
import CollapsibleContent from "./ui/collapsible"
import ChevronDown from "./ui/chevron-down"
import ChevronRight from "./ui/chevron-right"
import Image from "next/image" */

const faqData = [
	{
		question: "Woher kamen die Trainingsdaten?",
		answer:
			"Der Trainingsdatensatz stammt aus dem DeTox-Projekt, was für „Detektion von Toxizität und Aggressionen in Postings und Kommentaren im Netz\" steht. Dieses wurde vom Fraunhofer-Institut für Sichere Informationstechnologie (SIT) und der Hochschule Darmstadt durchgeführt. Die Daten sind hier öffentlich zugänglich. Anschließend wurde der Datensatz von der Arbeitsgruppe „Wissenschaft und Technologie für Frieden und Sicherheit\" (PEASEC)der Technischen Universität Darmstadt erweitert, indem neue Posts automatisch generiert wurden, damit die Kategorien ausgewogener werden.",
	},
	{
		question: "Welches Format und welchen Umfang hatten die Trainingsdaten?",
		answer:
			"Der Trainingsdatensatz enthält 10278 Posts aus den sozialen Medien, die Anfang 2021 gesammelt wurden. Anschließend haben sechs Personen zu jedem Post angemerkt, ob ein und welcher Tatbestand aus dem Strafgesetzbuch erfüllt ist. Etwa die Hälfte der Kommentare stammt aus zusammenhängenden Teilen von Gesprächen, was die Möglichkeit eröffnet, die Kontexte der Kommentare zu betrachten und Gesprächsanalysen durchzuführen.",
	},
	{
		question: "In welcher Sprache waren die Trainingsdaten?",
		answer: "Alle Trainingsdaten waren auf Deutsch.",
	},
	{
		question: "Wie ist die Qualität des Trainingsdatensatzes?",
		answer:
			"Das vorliegende Modell braucht im Idealfall mehr als 1000 Datenpunkte pro Kategorie. Das müssen deutsche Social-Media-Inhalte sein, bei denen die Kategorie bekannt ist, die möglichst divers sind. Diese Datensatzmenge ist für das Modell bisher nicht erreicht.",
	},
]

const categoryData = [
	{
		title:
			"§ 86 StGB – Verbreiten von Propagandamitteln verfassungswidriger und terroristischer Organisationen",
		definition: `(1) Wer Propagandamittel 
1. einer vom Bundesverfassungsgericht für verfassungswidrig erklärten Partei oder einer Partei oder Vereinigung, von der unanfechtbar festgestellt ist, dass sie Ersatzorganisation einer solchen Partei ist,
2. einer Vereinigung, die unanfechtbar verboten ist, weil sie sich gegen die verfassungsmäßige Ordnung oder gegen den Gedanken der Völkerverständigung richtet, oder von der unanfechtbar festgestellt ist, dass sie Ersatzorganisation einer solchen verbotenen Vereinigung ist,
3. einer Regierung, Vereinigung oder Einrichtung außerhalb des räumlichen Geltungsbereichs dieses Gesetzes, die für die Zwecke einer der in den Nummern 1 und 2 bezeichneten Parteien oder Vereinigungen tätig ist, oder
4. die nach ihrem Inhalt dazu bestimmt sind, Bestrebungen einer ehemaligen nationalsozialistischen Organisation fortzusetzen,
im Inland verbreitet oder der Öffentlichkeit zugänglich macht oder zur Verbreitung im Inland oder Ausland herstellt, vorrätig hält, einführt oder ausführt, wird mit Freiheitsstrafe bis zu drei Jahren oder mit Geldstrafe bestraft.
(2) Ebenso wird bestraft, wer Propagandamittel einer Organisation, die im Anhang der Durchführungsverordnung (EU) 2021/138 des Rates vom 5. Februar 2021 zur Durchführung des Artikels 2 Absatz 3 der Verordnung (EG) Nr. 2580/2001 über spezifische, gegen bestimmte Personen und Organisationen gerichtete restriktive Maßnahmen zur Bekämpfung des Terrorismus und zur Aufhebung der Durchführungsverordnung (EU) 2020/1128 (ABl. L 43 vom 8.2.2021, S. 1) als juristische Person, Vereinigung oder Körperschaft aufgeführt ist, im Inland verbreitet oder der Öffentlichkeit zugänglich macht oder zur Verbreitung im Inland oder Ausland herstellt, vorrätig hält, einführt oder ausführt.
(3) Propagandamittel im Sinne des Absatzes 1 ist nur ein solcher Inhalt (§ 11 Absatz 3), der gegen die freiheitliche demokratische Grundordnung oder den Gedanken der Völkerverständigung gerichtet ist. Propagandamittel im Sinne des Absatzes 2 ist nur ein solcher Inhalt (§ 11 Absatz 3), der gegen den Bestand oder die Sicherheit eines Staates oder einer internationalen Organisation oder gegen die Verfassungsgrundsätze der Bundesrepublik Deutschland gerichtet ist.
(4) Die Absätze 1 und 2 gelten nicht, wenn die Handlung der staatsbürgerlichen Aufklärung, der Abwehr verfassungswidriger Bestrebungen, der Kunst oder der Wissenschaft, der Forschung oder der Lehre, der Berichterstattung über Vorgänge des Zeitgeschehens oder der Geschichte oder ähnlichen Zwecken dient.
(5) Ist die Schuld gering, so kann das Gericht von einer Bestrafung nach dieser Vorschrift absehen.`,
		examples: [
			'„starker Führer"',
			'„Sieg Heil Merkel"',
			'„importiert aus Berlin, 1933"',
		],
	},
	{
		title:
			"§ 86a StGB – Verwenden von Kennzeichen verfassungswidriger und terroristischer Organisationen",
		definition: `(1) Mit Freiheitsstrafe bis zu drei Jahren oder mit Geldstrafe wird bestraft, wer 
1. im Inland Kennzeichen einer der in § 86 Abs. 1 Nr. 1, 2 und 4 oder Absatz 2 bezeichneten Parteien oder Vereinigungen verbreitet oder öffentlich, in einer Versammlung oder in einem von ihm verbreiteten Inhalt (§ 11 Absatz 3) verwendet oder
2. einen Inhalt (§ 11 Absatz 3), der ein derartiges Kennzeichen darstellt oder enthält, zur Verbreitung oder Verwendung im Inland oder Ausland in der in Nummer 1 bezeichneten Art und Weise herstellt, vorrätig hält, einführt oder ausführt.
(2) Kennzeichen im Sinne des Absatzes 1 sind namentlich Fahnen, Abzeichen, Uniformstücke, Parolen und Grußformen. Den in Satz 1 genannten Kennzeichen stehen solche gleich, die ihnen zum Verwechseln ähnlich sind.
(3) § 86 Abs. 4 und 5 gilt entsprechend.`,
		examples: ["Zu dieser Kategorie sind keine Beispiele im Trainingsdatensatz enthalten."],
	},
	{
		title: "§ 111 StGB – Öffentliche Aufforderung zu Straftaten",
		definition: `(1) Wer öffentlich, in einer Versammlung oder durch Verbreiten eines Inhalts (§ 11 Absatz 3) zu einer rechtswidrigen Tat auffordert, wird wie ein Anstifter (§ 26) bestraft.
(2) Bleibt die Aufforderung ohne Erfolg, so ist die Strafe Freiheitsstrafe bis zu fünf Jahren oder Geldstrafe. Die Strafe darf nicht schwerer sein als die, die für den Fall angedroht ist, dass die Aufforderung Erfolg hat (Absatz 1); § 49 Abs. 1 Nr. 2 ist anzuwenden.`,
		examples: [
			'„Virus heil"',
			'„Wollt ihr den totalen Lockdown"',
			'„Angesichts des Raubes durch die Juden ist es unvermeidlich, dass ein Banner des Jihad gehisst wird."',
		],
	},
	{
		title: "§ 126 StGB – Störung des öffentlichen Friedens durch Androhung von Straftaten",
		definition: `(1) Wer in einer Weise, die geeignet ist, den öffentlichen Frieden zu stören, 
1. einen der in § 125a Satz 2 Nr. 1 bis 4 bezeichneten Fälle des Landfriedensbruchs,
2. eine Straftat gegen die sexuelle Selbstbestimmung in den Fällen des § 177 Absatz 4 bis 8 oder des § 178,
3. einen Mord (§ 211), Totschlag (§ 212) oder Völkermord (§ 6 des Völkerstrafgesetzbuches) oder ein Verbrechen gegen die Menschlichkeit (§ 7 des Völkerstrafgesetzbuches) oder ein Kriegsverbrechen (§§ 8, 9, 10, 11 oder 12 des Völkerstrafgesetzbuches),
4. eine gefährliche Körperverletzung (§ 224) oder eine schwere Körperverletzung (§ 226),
5. eine Straftat gegen die persönliche Freiheit in den Fällen des § 232 Absatz 3 Satz 2, des § 232a Absatz 3, 4 oder 5, des § 232b Absatz 3 oder 4, des § 233a Absatz 3 oder 4, jeweils soweit es sich um Verbrechen handelt, der §§ 234 bis 234b, 239a oder 239b,
6. einen Raub oder eine räuberische Erpressung (§§ 249 bis 251 oder 255),
7. ein gemeingefährliches Verbrechen in den Fällen der §§ 306 bis 306c oder 307 Abs. 1 bis 3, des § 308 Abs. 1 bis 3, des § 309 Abs. 1 bis 4, der §§ 313, 314 oder 315 Abs. 3, des § 315b Abs. 3, des § 316a Abs. 1 oder 3, des § 316c Abs. 1 oder 3 oder des § 318 Abs. 3 oder 4 oder
8. ein gemeingefährliches Vergehen in den Fällen des § 309 Abs. 6, des § 311 Abs. 1, des § 316b Abs. 1, des § 317 Abs. 1 oder des § 318 Abs. 1
androht, wird mit Freiheitsstrafe bis zu drei Jahren oder mit Geldstrafe bestraft.
(2) Ebenso wird bestraft, wer in einer Weise, die geeignet ist, den öffentlichen Frieden zu stören, wider besseres Wissen vortäuscht, die Verwirklichung einer der in Absatz 1 genannten rechtswidrigen Taten stehe bevor.`,
		examples: [
			'„wann wird endlich geschossen auf dieses pack"',
			'„Ich würde das Kind behindert schlagen"',
			'„Politiker erschießen"',
		],
	},
	{
		title: "§ 130 StGB – Volksverhetzung",
		definition: `(1) Wer in einer Weise, die geeignet ist, den öffentlichen Frieden zu stören, 
1. gegen eine nationale, rassische, religiöse oder durch ihre ethnische Herkunft bestimmte Gruppe, gegen Teile der Bevölkerung oder gegen einen Einzelnen wegen dessen Zugehörigkeit zu einer vorbezeichneten Gruppe oder zu einem Teil der Bevölkerung zum Hass aufstachelt, zu Gewalt- oder Willkürmaßnahmen auffordert oder
2. die Menschenwürde anderer dadurch angreift, dass er eine vorbezeichnete Gruppe, Teile der Bevölkerung oder einen Einzelnen wegen dessen Zugehörigkeit zu einer vorbezeichneten Gruppe oder zu einem Teil der Bevölkerung beschimpft, böswillig verächtlich macht oder verleumdet,
wird mit Freiheitsstrafe von drei Monaten bis zu fünf Jahren bestraft.
(2) Mit Freiheitsstrafe bis zu drei Jahren oder mit Geldstrafe wird bestraft, wer 
1. einen Inhalt (§ 11 Absatz 3) verbreitet oder der Öffentlichkeit zugänglich macht oder einer Person unter achtzehn Jahren einen Inhalt (§ 11 Absatz 3) anbietet, überlässt oder zugänglich macht, der 
a) zum Hass gegen eine in Absatz 1 Nummer 1 bezeichnete Gruppe, gegen Teile der Bevölkerung oder gegen einen Einzelnen wegen dessen Zugehörigkeit zu einer in Absatz 1 Nummer 1 bezeichneten Gruppe oder zu einem Teil der Bevölkerung aufstachelt,
b) zu Gewalt- oder Willkürmaßnahmen gegen in Buchstabe a genannte Personen oder Personenmehrheiten auffordert oder
c) die Menschenwürde von in Buchstabe a genannten Personen oder Personenmehrheiten dadurch angreift, dass diese beschimpft, böswillig verächtlich gemacht oder verleumdet werden oder
2. einen in Nummer 1 Buchstabe a bis c bezeichneten Inhalt (§ 11 Absatz 3) herstellt, bezieht, liefert, vorrätig hält, anbietet, bewirbt oder es unternimmt, diesen ein- oder auszuführen, um ihn im Sinne der Nummer 1 zu verwenden oder einer anderen Person eine solche Verwendung zu ermöglichen.
(3) Mit Freiheitsstrafe bis zu fünf Jahren oder mit Geldstrafe wird bestraft, wer eine unter der Herrschaft des Nationalsozialismus begangene Handlung der in § 6 Abs. 1 des Völkerstrafgesetzbuches bezeichneten Art in einer Weise, die geeignet ist, den öffentlichen Frieden zu stören, öffentlich oder in einer Versammlung billigt, leugnet oder verharmlost.
(4) Mit Freiheitsstrafe bis zu drei Jahren oder mit Geldstrafe wird bestraft, wer öffentlich oder in einer Versammlung den öffentlichen Frieden in einer die Würde der Opfer verletzenden Weise dadurch stört, dass er die nationalsozialistische Gewalt- und Willkürherrschaft billigt, verherrlicht oder rechtfertigt.
(5) Mit Freiheitsstrafe bis zu drei Jahren oder mit Geldstrafe wird bestraft, wer eine Handlung der in den §§ 6 bis 12 des Völkerstrafgesetzbuches bezeichneten Art gegen eine der in Absatz 1 Nummer 1 bezeichneten Personenmehrheiten oder gegen einen Einzelnen wegen dessen Zugehörigkeit zu einer dieser Personenmehrheiten öffentlich oder in einer Versammlung in einer Weise billigt, leugnet oder gröblich verharmlost, die geeignet ist, zu Hass oder Gewalt gegen eine solche Person oder Personenmehrheit aufzustacheln und den öffentlichen Frieden zu stören.
(6) Absatz 2 gilt auch für einen in den Absätzen 3 bis 5 bezeichneten Inhalt (§ 11 Absatz 3).
(7) In den Fällen des Absatzes 2 Nummer 1, auch in Verbindung mit Absatz 6, ist der Versuch strafbar.
(8) In den Fällen des Absatzes 2, auch in Verbindung mit den Absätzen 6 und 7, sowie in den Fällen der Absätze 3 bis 5 gilt § 86 Absatz 4 entsprechend.`,
		examples: [
			'„Osmanen sind lediglich gierige Eroberer, Vergewaltiger und Zwangskonvertierer und Abschlachter."',
			'"JUDEN HINTER DER CORONA-IMPFUNG"',
			'„Israel wird es nicht mehr lange geben und das weißt auch du selber."',
		],
	},
	{
		title: "§ 131 StGB – Gewaltdarstellung",
		definition: `(1) Mit Freiheitsstrafe bis zu einem Jahr oder mit Geldstrafe wird bestraft, wer 
1. einen Inhalt (§ 11 Absatz 3), der grausame oder sonst unmenschliche Gewalttätigkeiten gegen Menschen oder menschenähnliche Wesen in einer Art schildert, die eine Verherrlichung oder Verharmlosung solcher Gewalttätigkeiten ausdrückt oder die das Grausame oder Unmenschliche des Vorgangs in einer die Menschenwürde verletzenden Weise darstellt, 
a) verbreitet oder der Öffentlichkeit zugänglich macht,
b) einer Person unter achtzehn Jahren anbietet, überlässt oder zugänglich macht oder
2. einen in Nummer 1 bezeichneten Inhalt (§ 11 Absatz 3) herstellt, bezieht, liefert, vorrätig hält, anbietet, bewirbt oder es unternimmt, diesen ein- oder auszuführen, um ihn im Sinne der Nummer 1 zu verwenden oder einer anderen Person eine solche Verwendung zu ermöglichen.
In den Fällen des Satzes 1 Nummer 1 ist der Versuch strafbar.
(2) Absatz 1 gilt nicht, wenn die Handlung der Berichterstattung über Vorgänge des Zeitgeschehens oder der Geschichte dient.
(3) Absatz 1 Satz 1 Nummer 1 Buchstabe b ist nicht anzuwenden, wenn der zur Sorge für die Person Berechtigte handelt; dies gilt nicht, wenn der Sorgeberechtigte durch das Anbieten, Überlassen oder Zugänglichmachen seine Erziehungspflicht gröblich verletzt.`,
		examples: [
			'„mit dem Stuhl in nazi Fresse"',
			'„Messer in den Hinterkopf gerammt"',
			'„geistig behindert"',
		],
	},
	{
		title: "§ 140 StGB – Belohnung und Billigung von Straftaten",
		definition: `Wer eine der in § 138 Absatz 1 Nummer 2 bis 4 und 5 letzte Alternative oder in § 126 Absatz 1 genannten rechtswidrigen Taten oder eine rechtswidrige Tat nach § 176 Absatz 1 oder nach den §§ 176c und 176d
1. belohnt, nachdem sie begangen oder in strafbarer Weise versucht worden ist, oder
2. in einer Weise, die geeignet ist, den öffentlichen Frieden zu stören, öffentlich, in einer Versammlung oder durch Verbreiten eines Inhalts (§ 11 Absatz 3) billigt,
wird mit Freiheitsstrafe bis zu drei Jahren oder mit Geldstrafe bestraft.`,
		examples: [
			'„Kopf abhaken wuerde. Und ja natuerlich also ich WUERDE DAS EISKALT FORDERN"',
			'„Heuschler wie Altmaier, Merkel, Scholz sind üble Klimalügner und gehören beseitigt"',
			'„behindert schlagen"',
		],
	},
	{
		title:
			"§ 166 StGB – Beschimpfung von Bekenntnissen, Religionsgesellschaften und Weltanschauungsvereinigungen",
		definition: `(1) Wer öffentlich oder durch Verbreiten eines Inhalts (§ 11 Absatz 3) den Inhalt des religiösen oder weltanschaulichen Bekenntnisses anderer in einer Weise beschimpft, die geeignet ist, den öffentlichen Frieden zu stören, wird mit Freiheitsstrafe bis zu drei Jahren oder mit Geldstrafe bestraft.
(2) Ebenso wird bestraft, wer öffentlich oder durch Verbreiten eines Inhalts (§ 11 Absatz 3) eine im Inland bestehende Kirche oder andere Religionsgesellschaft oder Weltanschauungsvereinigung, ihre Einrichtungen oder Gebräuche in einer Weise beschimpft, die geeignet ist, den öffentlichen Frieden zu stören.`,
		examples: [
			'„Nur durch massenhypnotische Phänomene ist erklärbar, warum es Religionen noch gibt"',
			'„Querdenker sind scheiße"',
			'„Religion ist grundsätzlich unsinnig"',
		],
	},
	{
		title: "§ 185 StGB – Beleidigung",
		definition: `Die Beleidigung wird mit Freiheitsstrafe bis zu einem Jahr oder mit Geldstrafe und, wenn die Beleidigung öffentlich, in einer Versammlung, durch Verbreiten eines Inhalts (§ 11 Absatz 3) oder mittels einer Tätlichkeit begangen wird, mit Freiheitsstrafe bis zu zwei Jahren oder mit Geldstrafe bestraft.`,
		examples: [
			'„verschissenen Arschlöchern zeigen, wie beschissen"',
			'„deinem Faschistenwahn zum Arzt gehen. Antifa: staatlich alimentierter Nichtsnutz und linker Vollidiot,"',
			'„vogelschissigen, braunen Haufen rückwärtsgewandter Übelkrähen? Niemals AfD"',
		],
	},
	{
		title: "§ 186 StGB – Üble Nachrede",
		definition: `Wer in Beziehung auf einen anderen eine Tatsache behauptet oder verbreitet, welche denselben verächtlich zu machen oder in der öffentlichen Meinung herabzuwürdigen geeignet ist, wird, wenn nicht diese Tatsache erweislich wahr ist, mit Freiheitsstrafe bis zu einem Jahr oder mit Geldstrafe und, wenn die Tat öffentlich, in einer Versammlung oder durch Verbreiten eines Inhalts (§ 11 Absatz 3) begangen ist, mit Freiheitsstrafe bis zu zwei Jahren oder mit Geldstrafe bestraft.`,
		examples: [
			'„weil sie den Schwarzenhasser, Rassist, Faschist und ultrarechten Nazi Hans-Georg Maaßen als Direktkandidat des Wahlkreises 196 aufgestellt hat"',
			'„verherrlichen Gewaltstaaten und Massenmörder"',
			'„Adolf-Verschnitt"',
		],
	},
	{
		title: "§ 187 StGB – Verleumdung",
		definition: `Wer wider besseres Wissen in Beziehung auf einen anderen eine unwahre Tatsache behauptet oder verbreitet, welche denselben verächtlich zu machen oder in der öffentlichen Meinung herabzuwürdigen oder dessen Kredit zu gefährden geeignet ist, wird mit Freiheitsstrafe bis zu zwei Jahren oder mit Geldstrafe und, wenn die Tat öffentlich, in einer Versammlung oder durch Verbreiten eines Inhalts (§ 11 Absatz 3) begangen ist, mit Freiheitsstrafe bis zu fünf Jahren oder mit Geldstrafe bestraft.`,
		examples: [
			'„Bravo, rot-grün ich spuck auf euch"',
			'„diese echten NAZIS! Ein einziger Drecksstall! Drecks OstSozialismus Drecks Sozialisten Drecks DDR Drecks SED Drecks PDS Drecks Die Linke (NAZIS)"',
			'„Covididioten"',
		],
	},
	{
		title: "§ 189 StGB – Verunglimpfung des Andenkens Verstorbener",
		definition: `Wer das Andenken eines Verstorbenen verunglimpft, wird mit Freiheitsstrafe bis zu zwei Jahren oder mit Geldstrafe bestraft.`,
		examples: [
			'„pisse ich auf dein garb"',
		],
	},
	{
		title: "§ 240 StGB – Nötigung",
		definition: `(1) Wer einen Menschen rechtswidrig mit Gewalt oder durch Drohung mit einem empfindlichen Übel zu einer Handlung, Duldung oder Unterlassung nötigt, wird mit Freiheitsstrafe bis zu drei Jahren oder mit Geldstrafe bestraft.
(2) Rechtswidrig ist die Tat, wenn die Anwendung der Gewalt oder die Androhung des Übels zu dem angestrebten Zweck als verwerflich anzusehen ist.
(3) Der Versuch ist strafbar.
(4) In besonders schweren Fällen ist die Strafe Freiheitsstrafe von sechs Monaten bis zu fünf Jahren. Ein besonders schwerer Fall liegt in der Regel vor, wenn der Täter 
1. eine Schwangere zum Schwangerschaftsabbruch nötigt oder
2. seine Befugnisse oder seine Stellung als Amtsträger mißbraucht.`,
		examples: ["Zu dieser Kategorie sind keine Beispiele im Trainingsdatensatz enthalten."],
	},
	{
		title: "§ 241 StGB – Bedrohung",
		definition: `(1) Wer einen Menschen mit der Begehung einer gegen ihn oder eine ihm nahestehende Person gerichteten rechtswidrigen Tat gegen die sexuelle Selbstbestimmung, die körperliche Unversehrtheit, die persönliche Freiheit oder gegen eine Sache von bedeutendem Wert bedroht, wird mit Freiheitsstrafe bis zu einem Jahr oder mit Geldstrafe bestraft.
(2) Wer einen Menschen mit der Begehung eines gegen ihn oder eine ihm nahestehende Person gerichteten Verbrechens bedroht, wird mit Freiheitsstrafe bis zu zwei Jahren oder mit Geldstrafe bestraft.
(3) Ebenso wird bestraft, wer wider besseres Wissen einem Menschen vortäuscht, daß die Verwirklichung eines gegen ihn oder eine ihm nahestehende Person gerichteten Verbrechens bevorstehe.
(4) Wird die Tat öffentlich, in einer Versammlung oder durch Verbreiten eines Inhalts (§ 11 Absatz 3) begangen, ist in den Fällen des Absatzes 1 auf Freiheitsstrafe bis zu zwei Jahren oder auf Geldstrafe und in den Fällen der Absätze 2 und 3 auf Freiheitsstrafe bis zu drei Jahren oder auf Geldstrafe zu erkennen.
(5) Die für die angedrohte Tat geltenden Vorschriften über den Strafantrag sind entsprechend anzuwenden.`,
		examples: [
			'„kleiner hurensohn"',
			'„Holen dich dann gleich ab für die U Haft du linksterrorist"',
			'„Hurenmutter"',
		],
	},
]

export default function TrainingDataOverview() {
	const [openFaqItems, setOpenFaqItems] = useState<number[]>([])
	const [openCategoryItems, setOpenCategoryItems] = useState<number[]>([])

	const toggleFaqItem = (index: number) => {
		setOpenFaqItems((prev) =>
			prev.includes(index)
				? prev.filter((i) => i !== index)
				: [...prev, index]
		)
	}

	const toggleCategoryItem = (index: number) => {
		setOpenCategoryItems((prev) =>
			prev.includes(index)
				? prev.filter((i) => i !== index)
				: [...prev, index]
		)
	}

	return (
		<div className="max-w-7xl mx-auto p-6 space-y-6">
			{/* Header */}
			<div className="flex items-center justify-between">
				<h1 className="text-2xl font-bold text-gray-900">
					Trainingsdaten und Kategorien Übersicht
				</h1>
			</div>

			{/* FAQ Section */}
			<Card>
				<CardHeader>
					<CardTitle>FAQ - Trainingsdaten</CardTitle>
				</CardHeader>
				<CardContent className="space-y-4">
					{faqData.map((faq, index) => (
						<Collapsible
							key={index}
							open={openFaqItems.includes(index)}
							onOpenChange={() => toggleFaqItem(index)}
						>
							<CollapsibleTrigger className="flex items-center justify-between w-full p-3 text-left bg-gray-50 hover:bg-gray-100 rounded-lg">
								<span className="font-medium">{faq.question}</span>
								{openFaqItems.includes(index) ? (
									<ChevronDown className="w-4 h-4" />
								) : (
									<ChevronRight className="w-4 h-4" />
								)}
							</CollapsibleTrigger>
							<CollapsibleContent className="p-3 text-sm text-gray-700 bg-white border border-gray-200 rounded-lg mt-2">
								{faq.answer}
								{index === 3 && (
									<div className="mt-4">
										<Image
											src="/histogram.png"
											alt="Histogram showing training data distribution"
											width={400}
											height={300}
											className="rounded-lg"
										/>
									</div>
								)}
							</CollapsibleContent>
						</Collapsible>
					))}
				</CardContent>
			</Card>

			{/* Categories Section */}
			<Card>
				<CardHeader>
					<CardTitle>Kategorien - Definitionen und Beispiele</CardTitle>
				</CardHeader>
				<CardContent>
					<div className="text-sm text-gray-600 mb-4">
						Dieses Modell klassifiziert nach Straftatbeständen. Im Folgenden finden
						Sie die einzelnen Kategorien
						aufgelistet. Klappen Sie einzelne Straftatbestände auf, um die
						Definition aus dem StGB zu erhalten und um
						Beispiele zu sehen, die in Trainingsdatensatz des Modells enthalten
						waren.
					</div>

					<div className="space-y-2">
						{categoryData.map((category, index) => (
							<Collapsible
								key={index}
								open={openCategoryItems.includes(index)}
								onOpenChange={() => toggleCategoryItem(index)}
							>
								<CollapsibleTrigger className="flex items-center justify-between w-full p-3 text-left bg-gray-50 hover:bg-gray-100 rounded-lg">
									<span className="font-medium text-sm">{category.title}</span>
									{openCategoryItems.includes(index) ? (
										<ChevronDown className="w-4 h-4" />
									) : (
										<ChevronRight className="w-4 h-4" />
									)}
								</CollapsibleTrigger>
								<CollapsibleContent className="p-3 text-sm text-gray-700 bg-white border border-gray-200 rounded-lg mt-2">
									<div className="space-y-3">
										<div>
											<div className="font-medium mb-1">Definition:</div>
											<div className="whitespace-pre-line">
												{category.definition}
											</div>
										</div>
										<div>
											<div className="font-medium mb-1">
												Beispiele aus dem Trainingsdatensatz:
											</div>
											<div className="space-y-1">
												{category.examples.map(
													(example, exampleIndex) => (
														<div
															key={exampleIndex}
															className="text-gray-600 italic"
														>
															{example}
														</div>
													)
												)}
											</div>
										</div>
									</div>
								</CollapsibleContent>
							</Collapsible>
						))}
					</div>
				</CardContent>
			</Card>
		</div>
	)
}
