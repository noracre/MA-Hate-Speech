"use client"

import InstanceView from "./instance-view"

interface Instance6Props {
  onUnsavedChanges: (hasChanges: boolean) => void
}

export default function Instance6({ onUnsavedChanges }: Instance6Props) {
  return <InstanceView instanceId="7833" onUnsavedChanges={onUnsavedChanges} />
}
