import { useState } from 'react'
import { ArrowsClockwise, UploadSimple } from "@phosphor-icons/react"
import { Participant } from '../types'
import { useTranslation } from 'react-i18next'
import { ParticipantRow } from './ParticipantRow'
import { produce } from 'immer'
import Papa from 'papaparse'

interface ParticipantsListProps {
  participants: Record<string, Participant>
  onChangeParticipants: (newParticipants: Record<string, Participant>) => void
  onOpenRules: (participantName: string) => void
  onGeneratePairs: () => void
}

export function ParticipantsList({
  participants,
  onChangeParticipants,
  onOpenRules,
  onGeneratePairs,
}: ParticipantsListProps) {
  const { t } = useTranslation()
  const [nextParticipantId, setNextParticipantId] = useState(() => crypto.randomUUID())

  const updateParticipant = (id: string, name: string) => {
    if (id === nextParticipantId) {
      setNextParticipantId(crypto.randomUUID())
    }

    onChangeParticipants(produce(participants, draft => {
      draft[id] ??= { id, name, rules: [] }
      draft[id].name = name
    }))
  }

  const removeParticipant = (id: string) => {
    onChangeParticipants(produce(participants, draft => {
      delete draft[id]

      for (const participant of Object.values(draft)) {
        participant.rules = participant.rules.filter(
          rule => rule.targetParticipantId !== id
        )
      }
    }))
  }

  // ✅ CSV UPLOAD HANDLER
  const handleCSVUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (!file) return

    Papa.parse(file, {
      header: true,
      skipEmptyLines: true,
      complete: (results) => {
        const rows: any[] = results.data as any[]

        onChangeParticipants(produce({}, draft => {
          rows.forEach((row) => {
            if (!row.Name) return

            const id = crypto.randomUUID()

            draft[id] = {
              id,
              name: row.Name,
              rules: [],

              // ✅ Additional CSV fields
              address: row.Address?.trim() ?? "",
              phone: row.Phone?.trim() ?? "",
              hint: (row["Gift Hint"] ?? row.GiftHint ?? "").trim(),
              notes: row.Notes?.trim() ?? ""
            }
          })
        }))
      }
    })
  }

  const participantsList = [
    ...Object.values(participants),
    {
      id: nextParticipantId,
      name: '',
      rules: []
    }
  ]

  return (
    <div className="space-y-4">

      {/* ✅ CSV Upload Button */}
      <div className="flex items-center justify-between gap-2">
        <label className="flex items-center gap-2 px-3 py-2 bg-indigo-600 text-white rounded cursor-pointer hover:bg-indigo-700">
          <UploadSimple size={20} />
          Upload CSV
          <input
            type="file"
            accept=".csv"
            className="hidden"
            onChange={handleCSVUpload}
          />
        </label>
      </div>

      <p className="mt-1 text-xs text-gray-500">
        {t('participants.generationWarning')}
      </p>

      <div className="space-y-2">
        {participantsList.map((participant, index) => (
          <ParticipantRow
            key={participant.id}
            participant={participant}
            participantIndex={index}
            isLast={index === Object.keys(participants).length}
            onNameChange={(name) => updateParticipant(participant.id, name)}
            onOpenRules={() => onOpenRules(participant.id)}
            onRemove={() => removeParticipant(participant.id)}
          />
        ))}
      </div>

      {/* ✅ Generate Pairs Button */}
      <button
        type="button"
        onClick={onGeneratePairs}
        className="w-full bg-green-500 text-white p-2 rounded hover:bg-green-600 flex items-center justify-center gap-2"
      >
        <ArrowsClockwise size={20} weight="bold" />
        {t('participants.generatePairs')}
      </button>

    </div>
  )
}
