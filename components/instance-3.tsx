"use client"

import InstanceView from "./instance-view"

interface Instance3Props {
  onUnsavedChanges: (hasChanges: boolean) => void
}

export default function Instance3({ onUnsavedChanges }: Instance3Props) {
  return <InstanceView instanceId="7836" onUnsavedChanges={onUnsavedChanges} />
}
