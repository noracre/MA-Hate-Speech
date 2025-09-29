const response = await fetch(
  "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/overview-view-instances-UpXo1FIuCeYCUqiElxejjeZ5knhzA7.csv",
)
const csvText = await response.text()
console.log("CSV Data:")
console.log(csvText)

// Parse CSV manually
const lines = csvText.trim().split("\n")
const headers = lines[0].split(",")
console.log("\nHeaders:", headers)

const data = lines.slice(1).map((line) => {
  const values = line.split(",")
  const row = {}
  headers.forEach((header, index) => {
    row[header.trim()] = values[index]?.trim() || ""
  })
  return row
})

console.log("\nParsed Data:")
console.log(JSON.stringify(data, null, 2))
