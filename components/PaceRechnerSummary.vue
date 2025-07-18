<template>
  <div class="pace-rechner summary">
    <table>
      <tbody>
        <tr class="section-header">
          <td colspan="2"><strong>Einzelzeiten</strong></td>
        </tr>
        <tr>
          <td>Swim Zeit:</td>
          <td>{{ swimTimeString }}</td>
        </tr>
        <tr>
          <td>T1 Zeit:</td>
          <td>{{ t1TimeString }}</td>
        </tr>
        <tr class="sub-split">
          <td>&nbsp;&nbsp;→ Bike {{ bikeQuarter1Km }}km:</td>
          <td>{{ bike25TimeString }}</td>
        </tr>
        <tr class="sub-split">
          <td>&nbsp;&nbsp;→ Bike {{ bikeHalfKm }}km:</td>
          <td>{{ bike50TimeString }}</td>
        </tr>
        <tr class="sub-split">
          <td>&nbsp;&nbsp;→ Bike {{ bikeThreeQuarterKm }}km:</td>
          <td>{{ bike75TimeString }}</td>
        </tr>
        <tr>
          <td>Bike Zeit:</td>
          <td>{{ bikeTimeString }}</td>
        </tr>
        <tr>
          <td>T2 Zeit:</td>
          <td>{{ t2TimeString }}</td>
        </tr>
        <tr class="sub-split">
          <td>&nbsp;&nbsp;→ Run {{ runQuarter1Km }}km:</td>
          <td>{{ run25TimeString }}</td>
        </tr>
        <tr class="sub-split">
          <td>&nbsp;&nbsp;→ Run {{ runHalfKm }}km:</td>
          <td>{{ run50TimeString }}</td>
        </tr>
        <tr class="sub-split">
          <td>&nbsp;&nbsp;→ Run {{ runThreeQuarterKm }}km:</td>
          <td>{{ run75TimeString }}</td>
        </tr>
        <tr>
          <td>Run Zeit:</td>
          <td>{{ runTimeString }}</td>
        </tr>
        <tr class="blank_row">
          <td colspan="2"></td>
        </tr>
        <tr class="section-header">
          <td colspan="2"><strong>Kumulierte Zeiten</strong></td>
        </tr>
        <tr>
          <td>Nach Swim:</td>
          <td>{{ swimCumulativeTimeString }}</td>
        </tr>
        <tr>
          <td>Nach T1:</td>
          <td>{{ t1CumulativeTimeString }}</td>
        </tr>
        <tr class="sub-split">
          <td>&nbsp;&nbsp;→ Nach Bike {{ bikeQuarter1Km }}km:</td>
          <td>{{ bike25CumulativeTimeString }}</td>
        </tr>
        <tr class="sub-split">
          <td>&nbsp;&nbsp;→ Nach Bike {{ bikeHalfKm }}km:</td>
          <td>{{ bike50CumulativeTimeString }}</td>
        </tr>
        <tr class="sub-split">
          <td>&nbsp;&nbsp;→ Nach Bike {{ bikeThreeQuarterKm }}km:</td>
          <td>{{ bike75CumulativeTimeString }}</td>
        </tr>
        <tr>
          <td>Nach Bike:</td>
          <td>{{ bikeCumulativeTimeString }}</td>
        </tr>
        <tr>
          <td>Nach T2:</td>
          <td>{{ t2CumulativeTimeString }}</td>
        </tr>
        <tr class="sub-split">
          <td>&nbsp;&nbsp;→ Nach Run {{ runQuarter1Km }}km:</td>
          <td>{{ run25CumulativeTimeString }}</td>
        </tr>
        <tr class="sub-split">
          <td>&nbsp;&nbsp;→ Nach Run {{ runHalfKm }}km:</td>
          <td>{{ run50CumulativeTimeString }}</td>
        </tr>
        <tr class="sub-split">
          <td>&nbsp;&nbsp;→ Nach Run {{ runThreeQuarterKm }}km:</td>
          <td>{{ run75CumulativeTimeString }}</td>
        </tr>
        <tr>
          <td>Gesamt Zeit:</td>
          <td>{{ totalTimeString }}</td>
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
        <tr>
          <td>Nach Swim:</td>
          <td>{{ totalTimeAfterSwimString }}</td>
        </tr>
        <tr>
          <td>Nach T1:</td>
          <td>{{ timeAfterT1String }}</td>
        </tr>
        <tr class="sub-split">
          <td>&nbsp;&nbsp;→ Uhrzeit Bike {{ bikeQuarter1Km }}km:</td>
          <td>{{ clockTimeBike25String }}</td>
        </tr>
        <tr class="sub-split">
          <td>&nbsp;&nbsp;→ Uhrzeit Bike {{ bikeHalfKm }}km:</td>
          <td>{{ clockTimeBike50String }}</td>
        </tr>
        <tr class="sub-split">
          <td>&nbsp;&nbsp;→ Uhrzeit Bike {{ bikeThreeQuarterKm }}km:</td>
          <td>{{ clockTimeBike75String }}</td>
        </tr>
        <tr>
          <td>Nach Bike:</td>
          <td>{{ totalTimeAfterBikeString }}</td>
        </tr>
        <tr>
          <td>Nach T2:</td>
          <td>{{ timeAfterT2String }}</td>
        </tr>
        <tr class="sub-split">
          <td>&nbsp;&nbsp;→ Uhrzeit Run {{ runQuarter1Km }}km:</td>
          <td>{{ clockTimeRun25String }}</td>
        </tr>
        <tr class="sub-split">
          <td>&nbsp;&nbsp;→ Uhrzeit Run {{ runHalfKm }}km:</td>
          <td>{{ clockTimeRun50String }}</td>
        </tr>
        <tr class="sub-split">
          <td>&nbsp;&nbsp;→ Uhrzeit Run {{ runThreeQuarterKm }}km:</td>
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
}

defineProps<Props>();
</script>

<style lang="scss" scoped>
.pace-rechner {
  flex-grow: 1;
  border: 4px solid #333;
  border-radius: 28px;
  margin: 8px;

  &.summary {
    padding: 10px;

    table {
      margin: 0 auto;
      width: 100%;

      .section-header {
        background-color: #f0f0f0;
        font-weight: bold;

        td {
          text-align: center;
          padding: 8px 4px;
          border-bottom: 2px solid #333;
        }
      }

      .blank_row {
        height: 10px !important; /* overwrites any other rules */
        background-color: #ffffff;
      }

      .sub-split {
        td {
          font-size: 0.9em;
          color: #666;
          font-style: italic;

          &:first-child {
            font-weight: 400;
          }
        }
      }

      td {
        padding: 4px;

        &:first-child {
          font-weight: 500;
          width: 30%;
        }

        &:last-child {
          text-align: left;
          font-family: monospace;
        }
      }
    }
  }
}
</style>
