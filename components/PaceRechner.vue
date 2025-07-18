<template>
  <div class="toolbar">
    <div>
      <label> Um wieviel Uhr startest du? </label>
      <DurationPicker
        v-model="dayTimeStart"
        @update:modelValue="onChangeDayTimeStart"
        uKey="daytimeStart"
      />
    </div>

    <select
      name=""
      id="presets"
      @change="handlePresetChange"
      v-model="preset"
      class="w-full bg-white rounded"
    >
      <option value="">Vorlagen</option>
      <option value="sprint">Sprint</option>
      <option value="olympic">Olympisch</option>
      <option value="md">Mitteldistanz</option>
      <option value="ld">Langdistanz</option>
    </select>
  </div>

  <div class="wrapper">
    <div class="pace-rechner">
      <pace-rechner-form
        v-model:distance="swimDistance"
        v-model:time="swimTime"
        v-model:pace="swimPace"
        :backgroundColor="'#74b9ff'"
        title="Swim"
        :paceUnit="PaceUnit.Swim"
        :distanceUnit="DistanceUnit.Swim"
      />
    </div>

    <div class="pace-rechner">
      <PaceRechnerTransition v-model:time="t1Time" />
    </div>

    <div class="pace-rechner">
      <pace-rechner-form
        v-model:distance="bikeDistance"
        v-model:time="bikeTime"
        v-model:speed="bikeSpeed"
        :backgroundColor="'#00b894'"
        color="#fefefe"
        title="Bike"
        :speedUnit="SpeedUnit.Bike"
        :paceType="PaceType.Speed"
        :distanceUnit="DistanceUnit.Bike"
      />
    </div>

    <div class="pace-rechner">
      <PaceRechnerTransition v-model:time="t2Time" />
    </div>

    <div class="pace-rechner">
      <pace-rechner-form
        v-model:distance="runDistance"
        v-model:time="runTime"
        v-model:pace="runPace"
        :backgroundColor="'#fab1a0'"
        color="#2d3436"
        title="Run"
        :paceUnit="PaceUnit.Run"
        :paceType="PaceType.Pace"
        :distanceUnit="DistanceUnit.Run"
      />
    </div>
  </div>

  <div class="wrapper">
    <PaceRechnerSummary 
      :swimTimeString="swimTimeString"
      :bikeTimeString="bikeTimeString"
      :runTimeString="runTimeString"
      :t1TimeString="t1TimeString"
      :t2TimeString="t2TimeString"
      :totalTimeString="totalTimeString"
      :swimCumulativeTimeString="swimCumulativeTimeString"
      :t1CumulativeTimeString="t1CumulativeTimeString"
      :bikeCumulativeTimeString="bikeCumulativeTimeString"
      :t2CumulativeTimeString="t2CumulativeTimeString"
      :dayTimeStartString="dayTimeStartString"
      :totalTimeAfterSwimString="totalTimeAfterSwimString"
      :timeAfterT1String="timeAfterT1String"
      :totalTimeAfterBikeString="totalTimeAfterBikeString"
      :timeAfterT2String="timeAfterT2String"
      :dayTimeFinish="dayTimeFinish"
      :bikeQuarter1Km="bikeQuarter1Km"
      :bikeHalfKm="bikeHalfKm"
      :bikeThreeQuarterKm="bikeThreeQuarterKm"
      :runQuarter1Km="runQuarter1Km"
      :runHalfKm="runHalfKm"
      :runThreeQuarterKm="runThreeQuarterKm"
      :bike25TimeString="bike25TimeString"
      :bike50TimeString="bike50TimeString"
      :bike75TimeString="bike75TimeString"
      :run25TimeString="run25TimeString"
      :run50TimeString="run50TimeString"
      :run75TimeString="run75TimeString"
      :bike25CumulativeTimeString="bike25CumulativeTimeString"
      :bike50CumulativeTimeString="bike50CumulativeTimeString"
      :bike75CumulativeTimeString="bike75CumulativeTimeString"
      :run25CumulativeTimeString="run25CumulativeTimeString"
      :run50CumulativeTimeString="run50CumulativeTimeString"
      :run75CumulativeTimeString="run75CumulativeTimeString"
      :clockTimeBike25String="clockTimeBike25String"
      :clockTimeBike50String="clockTimeBike50String"
      :clockTimeBike75String="clockTimeBike75String"
      :clockTimeRun25String="clockTimeRun25String"
      :clockTimeRun50String="clockTimeRun50String"
      :clockTimeRun75String="clockTimeRun75String"
    />
  </div>
</template>

<script setup lang="ts">
import PaceRechnerTransition from "@/components/PaceRechnerTransition.vue"
import PaceRechnerForm from "./PaceRechnerForm.vue"
import PaceRechnerSummary from "./PaceRechnerSummary.vue"
import {
  SpeedUnit,
  PaceUnit,
  PaceType,
  DistanceUnit,
} from "@/types/PaceRechner"
import { usePaceCalculations } from "~/composables/usePaceCalculations"

const preset = ref("")

const {
  // Base data
  dayTimeStart,
  swimDistance,
  swimTime,
  swimPace,
  bikeDistance,
  bikeTime,
  bikeSpeed,
  runDistance,
  runTime,
  runPace,
  t1Time,
  t2Time,

  // All computed values for summary
  swimTimeString,
  bikeTimeString,
  runTimeString,
  t1TimeString,
  t2TimeString,
  totalTimeString,
  swimCumulativeTimeString,
  t1CumulativeTimeString,
  bikeCumulativeTimeString,
  t2CumulativeTimeString,
  dayTimeStartString,
  totalTimeAfterSwimString,
  timeAfterT1String,
  totalTimeAfterBikeString,
  timeAfterT2String,
  dayTimeFinish,
  bikeQuarter1Km,
  bikeHalfKm,
  bikeThreeQuarterKm,
  runQuarter1Km,
  runHalfKm,
  runThreeQuarterKm,
  bike25TimeString,
  bike50TimeString,
  bike75TimeString,
  run25TimeString,
  run50TimeString,
  run75TimeString,
  bike25CumulativeTimeString,
  bike50CumulativeTimeString,
  bike75CumulativeTimeString,
  run25CumulativeTimeString,
  run50CumulativeTimeString,
  run75CumulativeTimeString,
  clockTimeBike25String,
  clockTimeBike50String,
  clockTimeBike75String,
  clockTimeRun25String,
  clockTimeRun50String,
  clockTimeRun75String,

  // Functions
  onChangeDayTimeStart,
  setPreset,
} = usePaceCalculations()

const handlePresetChange = () => {
  setPreset(preset.value)
}
</script>

<style lang="scss" scoped>
.wrapper {
  display: flex;
  flex-wrap: wrap;

  @media screen and (max-width: 800px) {
    display: block;
    flex-wrap: nowrap;
  }

  .pace-rechner {
    flex-grow: 1;
    border: 4px solid #333;
    border-radius: 28px;
    margin: 8px;

    ::v-deep(.wrapper) {
      display: flex;
      flex-flow: column;
      border-radius: 28px;
      min-height: 100%;
      position: relative;

      .title {
        position: absolute;
        top: -20px;
        left: 50%;
        transform: translateX(-50%);
        background-color: #333;
        border-radius: 28px;
        padding: 2px 10px;
        font-size: 0.8rem;
        color: #fff;
      }

      .row {
        padding: 10px;

        .label {
          width: 80px;
          padding-right: 5px;
        }
      }
    }

    ::v-deep(.row .picker input) {
      width: 80px;
    }

    ::v-deep(.row .picker input),
    ::v-deep(.vue__time-picker .vue__time-picker-input) {
      border: none;
      font-size: 14px;
      padding: 8px;
      height: auto;
      text-align: center;
      height: auto;
    }
  }
}

.toolbar {
  display: flex;
  justify-content: space-between;
  margin: 12px 12px 24px 12px;

  select {
    font-size: 14px;
    border: 4px solid #333;
    border-radius: 28px;
    padding: 8px;
  }

  ::v-deep(.vue__time-picker .vue__time-picker-input) {
    border: 1px solid #333;
    border-radius: 4px;
  }
}
</style>