<template>
  <div class="p-4">
    <div class="bg-white rounded-lg border border-gray-200 p-4">
      <h2 class="text-lg font-medium mb-4 text-gray-900">Verlauf</h2>

      <div
        v-if="calculations.length === 0"
        class="text-center py-12 text-gray-500"
      >
        <p class="text-sm">Keine Berechnungen vorhanden</p>
      </div>

      <div v-else class="space-y-3">
        <div
          v-for="calculation in calculations"
          :key="calculation.id"
          class="border border-gray-100 rounded p-3 hover:bg-gray-50 transition-colors"
        >
          <div class="flex justify-between items-start mb-2">
            <h3 class="font-medium text-sm text-gray-900">
              {{ calculation.name }}
            </h3>
            <div class="flex gap-1">
              <button
                @click="loadCalculation(calculation)"
                class="px-2 py-1 text-xs text-blue-600 hover:bg-blue-50 rounded transition-colors"
              >
                Laden
              </button>
              <button
                @click="deleteCalculation(calculation.id)"
                class="px-2 py-1 text-xs text-red-600 hover:bg-red-50 rounded transition-colors"
              >
                ×
              </button>
            </div>
          </div>

          <div class="text-xs text-gray-500 space-y-1">
            <div class="flex justify-between">
              <span>{{ formatDate(calculation.timestamp) }}</span>
              <span>{{ secondsToHHMMSS(calculation.totalTime, false) }}</span>
            </div>
            <div
              v-if="calculation.presetType !== 'custom'"
              class="text-gray-400"
            >
              {{ getPresetLabel(calculation.presetType) }}
            </div>
          </div>

          <!-- Activity breakdown -->
          <div class="mt-2 pt-2 border-t border-gray-100">
            <div
              v-for="(activity, index) in calculation.activities"
              :key="index"
              class="text-xs text-gray-400 flex justify-between py-0.5"
            >
              <span>{{ getSportTitle(activity.type, index) }}</span>
              <span>{{ secondsToHHMMSS(activity.time, true) }}</span>
            </div>
          </div>
        </div>
      </div>

      <div
        v-if="calculations.length > 0"
        class="mt-4 pt-3 border-t border-gray-100"
      >
        <button
          @click="clearAllCalculations"
          class="text-xs text-red-600 hover:text-red-800 transition-colors"
        >
          Alle löschen
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import type { PaceCalculation } from "~/types/PaceRechner";
import { SportsType } from "~/types/PaceRechner";
import { secondsToHHMMSS } from "~/utils/calculations";
import { useHistory } from "~/composables/useHistory";

// Emits
const emit = defineEmits<{
  load: [calculation: PaceCalculation];
}>();

// State
const {
  calculations,
  loadCalculations,
  deleteCalculation: deleteCalc,
} = useHistory();

// Methods
const refreshCalculations = () => {
  loadCalculations();
};

const loadCalculation = (calculation: PaceCalculation) => {
  emit("load", calculation);
};

const deleteCalculation = (id: string) => {
  if (confirm("Möchtest du diese Berechnung wirklich löschen?")) {
    deleteCalc(id);
    refreshCalculations(); // Reload the list
  }
};

const clearAllCalculations = () => {
  if (confirm("Möchtest du wirklich alle Berechnungen löschen?")) {
    calculations.value.forEach((calc) => deleteCalc(calc.id));
    refreshCalculations(); // Reload the list
  }
};

const formatDate = (timestamp: number): string => {
  return new Date(timestamp).toLocaleString("de-DE");
};

const getSportTitle = (type: SportsType, index: number): string => {
  switch (type) {
    case SportsType.Swim:
      return "Schwimmen";
    case SportsType.Bike:
      return "Radfahren";
    case SportsType.Run:
      return "Laufen";
    case SportsType.Rowing:
      return "Rudern";
    case SportsType.Hiking:
      return "Wandern";
    case SportsType.Walking:
      return "Gehen";
    default:
      return type;
  }
};

const getPresetLabel = (presetType: string): string => {
  switch (presetType) {
    case "sprint":
      return "Sprint Triathlon";
    case "olympic":
      return "Olympic Triathlon";
    case "md":
      return "Mitteldistanz";
    case "ld":
      return "Langdistanz";
    case "duathlon":
      return "Duathlon";
    default:
      return "Individuell";
  }
};

// Lifecycle
onMounted(() => {
  refreshCalculations();
});
</script>
