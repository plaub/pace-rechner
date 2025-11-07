<template>
  <div class="p-4">
    <div class="bg-white rounded-lg border border-gray-200 p-4">
      <h2 class="text-lg font-medium mb-4 text-gray-900">Einstellungen</h2>

      <div class="space-y-4">
        <!-- Default Competition Type -->
        <div>
          <label class="block text-sm font-medium mb-2 text-gray-900"
            >Standard-Wettkampfformat</label
          >
          <select
            v-model="settings.defaultCompetitionType"
            @change="saveSettings"
            class="w-full p-2 bg-white border border-gray-200 rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
          >
            <option value="Sprint">Sprint Triathlon</option>
            <option value="Olympic">Olympic Triathlon</option>
            <option value="Middle Distance">Mitteldistanz</option>
            <option value="Long Distance">Langdistanz</option>
            <option value="Duathlon">Duathlon</option>
          </select>
        </div>

        <!-- Default Start Time -->
        <div>
          <label class="block text-sm font-medium mb-2 text-gray-900"
            >Standard-Startzeit</label
          >
          <div class="flex items-center space-x-2">
            <select
              v-model="startTimeHours"
              @change="updateStartTime"
              class="p-2 bg-white border border-gray-200 rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
            >
              <option v-for="hour in 24" :key="hour - 1" :value="hour - 1">
                {{ String(hour - 1).padStart(2, "0") }}
              </option>
            </select>
            <span class="text-gray-500">:</span>
            <select
              v-model="startTimeMinutes"
              @change="updateStartTime"
              class="p-2 bg-white border border-gray-200 rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
            >
              <option
                v-for="minute in 60"
                :key="minute - 1"
                :value="minute - 1"
              >
                {{ String(minute - 1).padStart(2, "0") }}
              </option>
            </select>
          </div>
        </div>

        <!-- Units -->
        <div>
          <label class="block text-sm font-medium mb-2 text-gray-900"
            >Einheiten</label
          >
          <div class="space-y-2">
            <label class="flex items-center text-sm">
              <input
                type="radio"
                v-model="settings.units"
                value="metric"
                @change="saveSettings"
                class="mr-2 text-blue-500"
              />
              <span class="text-gray-700">Metrisch (km, m, km/h)</span>
            </label>
            <label class="flex items-center text-sm">
              <input
                type="radio"
                v-model="settings.units"
                value="imperial"
                @change="saveSettings"
                class="mr-2 text-blue-500"
                disabled
              />
              <span class="text-gray-400"
                >Imperial (mi, yd, mph) - bald verfügbar</span
              >
            </label>
          </div>
        </div>

        <!-- Language (Coming Soon) -->
        <div>
          <label class="block text-sm font-medium mb-2 text-gray-900"
            >Sprache</label
          >
          <select
            disabled
            class="w-full p-2 bg-gray-50 border border-gray-200 rounded text-gray-400 text-sm"
          >
            <option>Deutsch (aktuell)</option>
            <option>English - bald verfügbar</option>
          </select>
        </div>

        <!-- Reset Settings -->
        <div class="pt-3 border-t border-gray-100">
          <button
            @click="handleResetSettings"
            class="text-sm text-red-600 hover:text-red-800 transition-colors"
          >
            Einstellungen zurücksetzen
          </button>
        </div>
      </div>
    </div>

    <!-- App Info -->
    <div class="bg-white rounded-lg border border-gray-200 p-4 mt-4">
      <h3 class="text-lg font-medium mb-3 text-gray-900">App-Info</h3>
      <div class="space-y-1 text-sm text-gray-500">
        <p><span class="text-gray-700">Version:</span> 2.0.0</p>
        <p>
          <span class="text-gray-700">Features:</span> Multi-Sport Support,
          Triathlon Templates, History
        </p>
        <p>
          <span class="text-gray-700">Entwickelt mit:</span> Nuxt 3, Vue 3,
          TypeScript
        </p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from "vue";
import { useSettings } from "~/composables/useSettings";

// Use the global settings composable
const { settings, loadSettings, saveSettings, updateSetting, resetSettings } =
  useSettings();

// Computed for start time
const startTimeHours = computed({
  get: () => Math.floor(settings.value.defaultStartTime / 3600),
  set: (value: number) => {
    const minutes = Math.floor((settings.value.defaultStartTime % 3600) / 60);
    updateSetting("defaultStartTime", value * 3600 + minutes * 60);
  },
});

const startTimeMinutes = computed({
  get: () => Math.floor((settings.value.defaultStartTime % 3600) / 60),
  set: (value: number) => {
    const hours = Math.floor(settings.value.defaultStartTime / 3600);
    updateSetting("defaultStartTime", hours * 3600 + value * 60);
  },
});

// Methods
const updateStartTime = () => {
  // This is handled by the computed setters now
};

const handleResetSettings = () => {
  if (confirm("Möchtest du wirklich alle Einstellungen zurücksetzen?")) {
    resetSettings();
  }
};

// Lifecycle
onMounted(() => {
  loadSettings();
});
</script>
