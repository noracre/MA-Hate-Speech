"use client"

import InstanceView from "./instance-view"

interface Instance1Props {
  onUnsavedChanges: (hasChanges: boolean) => void
}

export default function Instance1({ onUnsavedChanges }: Instance1Props) {
  return <InstanceView instanceId="7835" screenshot="LIME-Screenshot1.PNG" onUnsavedChanges={onUnsavedChanges} />
}
