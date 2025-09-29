"use client"

import InstanceView from "./instance-view"

interface Instance4Props {
  onUnsavedChanges: (hasChanges: boolean) => void
}

export default function Instance4({ onUnsavedChanges }: Instance4Props) {
  return <InstanceView instanceId="7835" onUnsavedChanges={onUnsavedChanges} />
}
