"use client"

import InstanceView from "./instance-view"

interface Instance2Props {
  onUnsavedChanges: (hasChanges: boolean) => void
}

export default function Instance2({ onUnsavedChanges }: Instance2Props) {
  return <InstanceView instanceId="7815" onUnsavedChanges={onUnsavedChanges} />
}
