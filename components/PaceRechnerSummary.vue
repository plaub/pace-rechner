<template>
  <div class="pace-rechner summary">
    <table class="pace-calculator-table">
      <tbody>
        <!-- Kumulierte Zeiten Section - nur bei Multi-Sport anzeigen -->
        <template v-if="!currentSportPreset">
          <tr class="section-header">
            <td colspan="2"><strong>Kumulierte Zeiten</strong></td>
          </tr>
          <tr v-if="showSwimData">
            <td>{{ getFirstSportLabel() }}:</td>
            <td>{{ swimCumulativeTimeString }}</td>
          </tr>
          <tr v-if="showTransitionData && showSwimData && showBikeData">
            <td>Nach T1:</td>
            <td>{{ t1CumulativeTimeString }}</td>
          </tr>
          <tr v-if="showBikeData" class="sub-split">
            <td>&nbsp;&nbsp;→ Nach Bike {{ bikeQuarter1Km }}km:</td>
            <td>{{ bike25CumulativeTimeString }}</td>
          </tr>
          <tr v-if="showBikeData" class="sub-split">
            <td>&nbsp;&nbsp;→ Nach Bike {{ bikeHalfKm }}km:</td>
            <td>{{ bike50CumulativeTimeString }}</td>
          </tr>
          <tr v-if="showBikeData" class="sub-split">
            <td>&nbsp;&nbsp;→ Nach Bike {{ bikeThreeQuarterKm }}km:</td>
            <td>{{ bike75CumulativeTimeString }}</td>
          </tr>
          <tr v-if="showBikeData">
            <td>Nach Bike:</td>
            <td>{{ bikeCumulativeTimeString }}</td>
          </tr>
          <tr v-if="showTransitionData && showBikeData && showRunData">
            <td>Nach T2:</td>
            <td>{{ t2CumulativeTimeString }}</td>
          </tr>
          <tr v-if="showRunData" class="sub-split">
            <td>
              &nbsp;&nbsp;→ Nach {{ getThirdSportLabel() }}
              {{ runQuarter1Km }}km:
            </td>
            <td>{{ run25CumulativeTimeString }}</td>
          </tr>
          <tr v-if="showRunData" class="sub-split">
            <td>
              &nbsp;&nbsp;→ Nach {{ getThirdSportLabel() }} {{ runHalfKm }}km:
            </td>
            <td>{{ run50CumulativeTimeString }}</td>
          </tr>
          <tr v-if="showRunData" class="sub-split">
            <td>
              &nbsp;&nbsp;→ Nach {{ getThirdSportLabel() }}
              {{ runThreeQuarterKm }}km:
            </td>
            <td>{{ run75CumulativeTimeString }}</td>
          </tr>
          <tr>
            <td>Gesamt Zeit:</td>
            <td>{{ totalTimeString }}</td>
          </tr>
          <tr class="blank_row">
            <td colspan="2"></td>
          </tr>
        </template>

        <tr class="section-header">
          <td colspan="2"><strong>Einzelzeiten</strong></td>
        </tr>
        <tr v-if="showSwimData">
          <td>{{ getFirstSportTimeLabel() }}:</td>
          <td>{{ swimTimeString }}</td>
        </tr>
        <tr v-if="showTransitionData && showSwimData && showBikeData">
          <td>T1 Zeit:</td>
          <td>{{ t1TimeString }}</td>
        </tr>
        <tr v-if="showBikeData" class="sub-split">
          <td>&nbsp;&nbsp;→ Bike {{ bikeQuarter1Km }}km:</td>
          <td>{{ bike25TimeString }}</td>
        </tr>
        <tr v-if="showBikeData" class="sub-split">
          <td>&nbsp;&nbsp;→ Bike {{ bikeHalfKm }}km:</td>
          <td>{{ bike50TimeString }}</td>
        </tr>
        <tr v-if="showBikeData" class="sub-split">
          <td>&nbsp;&nbsp;→ Bike {{ bikeThreeQuarterKm }}km:</td>
          <td>{{ bike75TimeString }}</td>
        </tr>
        <tr v-if="showBikeData">
          <td>Bike Zeit:</td>
          <td>{{ bikeTimeString }}</td>
        </tr>
        <tr v-if="showTransitionData && showBikeData && showRunData">
          <td>T2 Zeit:</td>
          <td>{{ t2TimeString }}</td>
        </tr>
        <tr v-if="showRunData" class="sub-split">
          <td>
            &nbsp;&nbsp;→ {{ getThirdSportLabel() }} {{ runQuarter1Km }}km:
          </td>
          <td>{{ run25TimeString }}</td>
        </tr>
        <tr v-if="showRunData" class="sub-split">
          <td>&nbsp;&nbsp;→ {{ getThirdSportLabel() }} {{ runHalfKm }}km:</td>
          <td>{{ run50TimeString }}</td>
        </tr>
        <tr v-if="showRunData" class="sub-split">
          <td>
            &nbsp;&nbsp;→ {{ getThirdSportLabel() }} {{ runThreeQuarterKm }}km:
          </td>
          <td>{{ run75TimeString }}</td>
        </tr>
        <tr v-if="showRunData">
          <td>{{ getThirdSportTimeLabel() }}:</td>
          <td>{{ runTimeString }}</td>
        </tr>
        <tr class="blank_row">
          <td colspan="2"></td>
        </tr>

        <tr class="section-header">
          <td colspan="2"><strong>Uhrzeiten</strong></td>
        </tr>
        <tr>
          <td>Start:</td>
          <td>{{ dayTimeStartString }}</td>
        </tr>
        <tr v-if="showSwimData">
          <td>{{ getFirstSportStartLabel() }}:</td>
          <td>{{ totalTimeAfterSwimString }}</td>
        </tr>
        <tr v-if="showTransitionData && showSwimData && showBikeData">
          <td>Nach T1:</td>
          <td>{{ timeAfterT1String }}</td>
        </tr>
        <tr v-if="showBikeData" class="sub-split">
          <td>&nbsp;&nbsp;→ Uhrzeit Bike {{ bikeQuarter1Km }}km:</td>
          <td>{{ clockTimeBike25String }}</td>
        </tr>
        <tr v-if="showBikeData" class="sub-split">
          <td>&nbsp;&nbsp;→ Uhrzeit Bike {{ bikeHalfKm }}km:</td>
          <td>{{ clockTimeBike50String }}</td>
        </tr>
        <tr v-if="showBikeData" class="sub-split">
          <td>&nbsp;&nbsp;→ Uhrzeit Bike {{ bikeThreeQuarterKm }}km:</td>
          <td>{{ clockTimeBike75String }}</td>
        </tr>
        <tr v-if="showBikeData">
          <td>Nach Bike:</td>
          <td>{{ totalTimeAfterBikeString }}</td>
        </tr>
        <tr v-if="showTransitionData && showBikeData && showRunData">
          <td>Nach T2:</td>
          <td>{{ timeAfterT2String }}</td>
        </tr>
        <tr v-if="showRunData" class="sub-split">
          <td>
            &nbsp;&nbsp;→ Uhrzeit {{ getThirdSportLabel() }}
            {{ runQuarter1Km }}km:
          </td>
          <td>{{ clockTimeRun25String }}</td>
        </tr>
        <tr v-if="showRunData" class="sub-split">
          <td>
            &nbsp;&nbsp;→ Uhrzeit {{ getThirdSportLabel() }} {{ runHalfKm }}km:
          </td>
          <td>{{ clockTimeRun50String }}</td>
        </tr>
        <tr v-if="showRunData" class="sub-split">
          <td>
            &nbsp;&nbsp;→ Uhrzeit {{ getThirdSportLabel() }}
            {{ runThreeQuarterKm }}km:
          </td>
          <td>{{ clockTimeRun75String }}</td>
        </tr>
        <tr>
          <td>Ziel:</td>
          <td>{{ dayTimeFinish }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup lang="ts">
import { computed } from "vue";
import { usePresets } from "~/composables/usePresets";

interface Props {
  swimTimeString: string;
  bikeTimeString: string;
  runTimeString: string;
  t1TimeString: string;
  t2TimeString: string;
  totalTimeString: string;
  swimCumulativeTimeString: string;
  t1CumulativeTimeString: string;
  bikeCumulativeTimeString: string;
  t2CumulativeTimeString: string;
  dayTimeStartString: string;
  totalTimeAfterSwimString: string;
  timeAfterT1String: string;
  totalTimeAfterBikeString: string;
  timeAfterT2String: string;
  dayTimeFinish: string;
  bikeQuarter1Km: number;
  bikeHalfKm: number;
  bikeThreeQuarterKm: number;
  runQuarter1Km: number;
  runHalfKm: number;
  runThreeQuarterKm: number;
  bike25TimeString: string;
  bike50TimeString: string;
  bike75TimeString: string;
  run25TimeString: string;
  run50TimeString: string;
  run75TimeString: string;
  bike25CumulativeTimeString: string;
  bike50CumulativeTimeString: string;
  bike75CumulativeTimeString: string;
  run25CumulativeTimeString: string;
  run50CumulativeTimeString: string;
  run75CumulativeTimeString: string;
  clockTimeBike25String: string;
  clockTimeBike50String: string;
  clockTimeBike75String: string;
  clockTimeRun25String: string;
  clockTimeRun50String: string;
  clockTimeRun75String: string;
  preset?: string;
}

const props = defineProps<Props>();

// Check if current preset is a single sport
const { getSingleSportPresets } = usePresets();
const singleSportPresets = computed(() => getSingleSportPresets());
const currentSportPreset = computed(() => {
  return singleSportPresets.value.find((p) => p.value === props.preset);
});

// Show/hide sections based on preset
const showSwimData = computed(() => {
  if (!currentSportPreset.value) return true; // Show all for triathlon presets
  return currentSportPreset.value.type === "swim";
});

const showBikeData = computed(() => {
  if (!currentSportPreset.value) return true; // Show all for triathlon presets
  return currentSportPreset.value.type === "bike";
});

const showRunData = computed(() => {
  if (!currentSportPreset.value) return true; // Show all for triathlon presets
  return currentSportPreset.value.type === "run";
});

const showTransitionData = computed(() => {
  return !currentSportPreset.value; // Hide transitions for single sports
});

// Helper functions for dynamic labels
const getFirstSportLabel = () => {
  return props.preset === "duathlon" ? "Nach Run 1" : "Nach Swim";
};

const getFirstSportTimeLabel = () => {
  return props.preset === "duathlon" ? "Run 1 Zeit" : "Swim Zeit";
};

const getFirstSportStartLabel = () => {
  return props.preset === "duathlon" ? "Nach Run 1" : "Nach Swim";
};

const getThirdSportLabel = () => {
  return props.preset === "duathlon" ? "Run 2" : "Run";
};

const getThirdSportTimeLabel = () => {
  return props.preset === "duathlon" ? "Run 2 Zeit" : "Run Zeit";
};
</script>

<style lang="scss" scoped>
.pace-rechner {
  flex-grow: 1;
  border: 4px solid #333;
  border-radius: 28px;
  margin: 8px;

  &.summary {
    padding: 10px;

    /* WordPress-spezifische Tabellen-Styles mit hoher Spezifität */
    table.pace-calculator-table {
      margin: 0 auto !important;
      width: 100% !important;
      border-collapse: collapse !important;
      border-spacing: 0 !important;
      border: none !important;
      background: transparent !important;
      box-shadow: none !important;

      tbody {
        border: none !important;
        background: transparent !important;
      }

      tr {
        border: none !important;
        background: transparent !important;

        &:nth-child(odd),
        &:nth-child(even) {
          background: transparent !important;
        }

        &:hover {
          background: transparent !important;
        }
      }

      .section-header {
        background-color: #f0f0f0 !important;
        font-weight: bold !important;

        td {
          text-align: center !important;
          padding: 8px 4px !important;
          border-bottom: 2px solid #333 !important;
          border-top: none !important;
          border-left: none !important;
          border-right: none !important;
          background-color: #f0f0f0 !important;
        }
      }

      .blank_row {
        height: 10px !important;
        background-color: #ffffff !important;

        td {
          background-color: #ffffff !important;
          border: none !important;
          padding: 0 !important;
          height: 10px !important;
        }
      }

      .sub-split {
        td {
          font-size: 0.9em !important;
          color: #666 !important;
          font-style: italic !important;
          border: none !important;

          &:first-child {
            font-weight: 400 !important;
          }
        }
      }

      td {
        padding: 4px !important;
        border: none !important;
        vertical-align: top !important;
        background: transparent !important;

        &:first-child {
          font-weight: 500 !important;
          width: 30% !important;
        }

        &:last-child {
          text-align: left !important;
          font-family: monospace !important;
        }
      }
    }
  }
}

/* WordPress Theme Override - Globale Styles mit sehr hoher Spezifität */
:global(.pace-rechner.summary table.pace-calculator-table) {
  margin: 0 auto !important;
  width: 100% !important;
  border-collapse: collapse !important;
  border-spacing: 0 !important;
  border: none !important;
  background: transparent !important;
  box-shadow: none !important;

  tbody {
    border: none !important;
    background: transparent !important;
  }

  tr {
    border: none !important;
    background: transparent !important;

    &:nth-child(odd),
    &:nth-child(even) {
      background: transparent !important;
    }

    &:hover {
      background: transparent !important;
    }
  }

  td {
    padding: 4px !important;
    border: none !important;
    vertical-align: top !important;
    background: transparent !important;
  }
}
</style>
