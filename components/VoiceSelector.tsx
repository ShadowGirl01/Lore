import React from 'react'
import { cn } from '@/lib/utils'
import { voiceCategories, voiceOptions } from '@/lib/constants'

interface VoiceSelectorProps {
  disabled?: boolean
  className?: string
  value?: string
  onChange: (voiceId: string) => void
}

const VoiceSelector = ({ disabled, value, onChange, className }: VoiceSelectorProps) => {
  return (
    <div className={cn('space-y-8', className)}>
      {Object.entries(voiceCategories).map(([category, voices]) => (
        <div key={category}>
          <p className="text-sm font-semibold text-[#5b5043] mb-3">
            {category === 'male' ? 'Male Voices' : 'Female Voices'}
          </p>
          <div className="voice-selector-options flex flex-wrap gap-4">
            {voices.map((voiceId) => {
              const voice = voiceOptions[voiceId as keyof typeof voiceOptions]
              const selected = value === voiceId
              const widthClass = category === 'male' ? 'w-full sm:w-[31%]' : 'w-full sm:w-[48%]'

              return (
                <button
                  key={voiceId}
                  type="button"
                  disabled={disabled}
                  onClick={() => onChange(voiceId)}
                  className={cn(
                    'voice-selector-option voice-selector-option-default max-w-[260px] justify-start gap-3 rounded-[18px] p-4 text-left transition-all',
                    widthClass,
                    selected && 'voice-selector-option-selected',
                    disabled && 'opacity-50 cursor-not-allowed',
                  )}
                >
                  <span
                    className={cn(
                      'inline-flex h-4 w-4 shrink-0 rounded-full border border-[#8B7355] transition-all',
                      selected ? 'bg-[#8B7355]' : 'bg-white',
                    )}
                  />
                  <div>
                    <p className="font-semibold text-[#212a3b]">{voice.name}</p>
                    <p className="text-sm text-[#5b5043]">{voice.description}</p>
                  </div>
                </button>
              )
            })}
          </div>
        </div>
      ))}
    </div>
  )
}

export default VoiceSelector