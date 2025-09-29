"use client"

import InstanceView from "./instance-view"

interface Instance5Props {
  onUnsavedChanges: (hasChanges: boolean) => void
}

export default function Instance5({ onUnsavedChanges }: Instance5Props) {
  return <InstanceView instanceId="7834" onUnsavedChanges={onUnsavedChanges} />
}
