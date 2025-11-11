<template>
  <div>
    <!-- Tab Navigation -->
    <div class="max-w-6xl mx-auto px-4 mb-4">
      <nav class="bg-white rounded-lg shadow-sm">
        <div class="flex">
          <button
            v-for="tab in tabs"
            :key="tab.id"
            @click="activeTab = tab.id"
            :class="[
              'flex flex-col flex-1 py-3 px-4 text-center font-medium transition-colors rounded-lg',
              activeTab === tab.id ? 'bg-blue-500 text-white' : '',
            ]"
          >
            <span class="text-lg mr-2">{{ tab.icon }}</span>
            {{ tab.label }}
          </button>
        </div>
      </nav>
    </div>

    <!-- Tab Content -->
    <div class="max-w-6xl mx-auto">
      <!-- Calculator Tab -->
      <div v-if="activeTab === 'calculator'">
        <PaceRechner />
      </div>

      <!-- History Tab -->
      <div v-if="activeTab === 'history'">
        <HistoryView @load="onLoadCalculation" />
      </div>

      <!-- Settings Tab -->
      <div v-if="activeTab === 'settings'">
        <SettingsView />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { ref, onMounted } from "vue";
import PaceRechner from "@/components/PaceRechner.vue";
import HistoryView from "@/components/HistoryView.vue";
import type { PaceCalculation } from "~/types/PaceRechner";
import { useSettings } from "~/composables/useSettings";
import { useCalculationLoader } from "~/composables/useCalculationLoader";

export default {
  name: "App",

  components: {
    PaceRechner,
    HistoryView,
    SettingsView: () => import("@/components/SettingsView.vue"),
  },

  setup() {
    // State
    const activeTab = ref("calculator");

    // Initialize settings and calculation loader
    const { loadSettings } = useSettings();
    const { loadCalculation } = useCalculationLoader();

    // Tabs configuration
    const tabs = [
      { id: "calculator", label: "Rechner", icon: "🏃" },
      { id: "history", label: "Verlauf", icon: "📊" },
      { id: "settings", label: "Einstellungen", icon: "⚙️" },
    ];

    // Methods
    const onLoadCalculation = (calculation: PaceCalculation) => {
      console.log("Loading calculation:", calculation);
      // Load the calculation into global state
      loadCalculation(calculation);
      // Switch to calculator tab
      activeTab.value = "calculator";
    };

    // Load settings on app initialization
    onMounted(async () => {
      await loadSettings();
    });

    return {
      activeTab,
      tabs,
      onLoadCalculation,
    };
  },
};
</script>

<style scoped>
/* Add some padding for mobile bottom navigation */
@media (max-width: 768px) {
  body {
    padding-bottom: 80px;
  }
}
</style>
