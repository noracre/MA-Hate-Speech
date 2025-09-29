"use client"

import InstanceView from "./instance-view"

interface Instance7Props {
  onUnsavedChanges: (hasChanges: boolean) => void
}

export default function Instance7({ onUnsavedChanges }: Instance7Props) {
  return <InstanceView instanceId="7832" onUnsavedChanges={onUnsavedChanges} />
}
