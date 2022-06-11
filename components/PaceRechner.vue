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
      @change="setPreset"
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
    <div class="pace-rechner summary">
      <table>
        <tbody>
          <tr>
            <td>Gesamt Zeit:</td>
            <td>{{ totalTimeString }}</td>
          </tr>
          <tr class="blank_row">
            <td></td>
            <td></td>
          </tr>
          <tr>
            <td>Uhrzeit nach Swim:</td>
            <td>{{ totalTimeAfterSwimString }}</td>
          </tr>
          <tr>
            <td>Uhrzeit nach Bike:</td>
            <td>{{ totalTimeAfterBikeString }}</td>
          </tr>
          <tr>
            <td>Uhrzeit im Ziel:</td>
            <td>{{ dayTimeFinish }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script lang="ts">
import PaceRechnerTransition from "@/components/PaceRechnerTransition.vue";
import { secondsToHHMMSS } from "~~/utils/calculations";
import PaceRechnerForm from "./PaceRechnerForm.vue";
import {
  SpeedUnit,
  PaceUnit,
  PaceType,
  DistanceUnit,
} from "@/types/PaceRechner";

export default {
  name: "PaceRechner",

  components: {
    PaceRechnerTransition,
    PaceRechnerForm,
  },

  setup() {
    const preset = ref("");
    const dayTimeStart = ref(25200);
    const dayTimeFinish = ref("");

    const swimDistance = ref(3800);
    const swimTime = ref(0);
    const swimPace = ref(120);

    const bikeDistance = ref(180);
    const bikeTime = ref(0);
    const bikeSpeed = ref(25);

    const runDistance = ref(42195);
    const runTime = ref(0);
    const runPace = ref(380);

    const t1Time = ref(300);
    const t2Time = ref(300);

    const onChangeDayTimeStart = (value: number) => {
      dayTimeFinish.value = secondsToHHMMSS(
        dayTimeStart.value + totalTime.value,
        false
      );
    };

    const totalTime = computed(() => {
      if (swimTime.value && bikeTime.value && runTime.value) {
        return (
          swimTime.value +
          bikeTime.value +
          runTime.value +
          t1Time.value +
          t2Time.value
        );
      }
      return 0;
    });

    const totalTimeAfterSwim = computed(() => {
      if (swimTime.value) {
        return swimTime.value;
      }
      return 0;
    });

    const totalTimeAfterBike = computed(() => {
      if (swimTime.value && bikeTime.value) {
        return swimTime.value + bikeTime.value + t1Time.value;
      }
      return 0;
    });

    const totalTimeString = computed(() => {
      dayTimeFinish.value = secondsToHHMMSS(
        dayTimeStart.value + totalTime.value,
        false
      );

      return secondsToHHMMSS(totalTime.value, false);
    });

    const totalTimeAfterSwimString = computed(() => {
      return secondsToHHMMSS(
        dayTimeStart.value + totalTimeAfterSwim.value,
        false
      );
    });

    const totalTimeAfterBikeString = computed(() => {
      return secondsToHHMMSS(
        dayTimeStart.value + totalTimeAfterBike.value,
        false
      );
    });

    const setPreset = () => {
      switch (preset.value) {
        case "sprint":
          swimDistance.value = 750;
          swimPace.value = 120;
          swimTime.value = 900;

          bikeDistance.value = 20;
          bikeSpeed.value = 25;
          bikeTime.value = 2880;

          runDistance.value = 5000;
          runPace.value = 300;
          runTime.value = 1500;
          break;

        case "olympic":
          swimDistance.value = 1500;
          swimPace.value = 120;
          swimTime.value = 1800;

          bikeDistance.value = 40;
          bikeSpeed.value = 25;
          bikeTime.value = 5760;

          runDistance.value = 10000;
          runPace.value = 300;
          runTime.value = 3000;
          break;

        case "md":
          swimDistance.value = 1900;
          swimPace.value = 120;
          swimTime.value = 2280;

          bikeDistance.value = 90;
          bikeSpeed.value = 25;
          bikeTime.value = 12960;

          runDistance.value = 21097.5;
          runPace.value = 380;
          runTime.value = 8017;
          break;

        case "ld":
          swimDistance.value = 3800;
          swimPace.value = 120;
          swimTime.value = 4560;

          bikeDistance.value = 180;
          bikeSpeed.value = 25;
          bikeTime.value = 25920;

          runDistance.value = 42195;
          runPace.value = 380;
          runTime.value = 16034;
          break;

        default:
          break;
      }
    };

    return {
      totalTimeString,
      setPreset,
      preset,
      dayTimeStart,
      onChangeDayTimeStart,
      dayTimeFinish,

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

      PaceUnit,
      SpeedUnit,
      PaceType,
      DistanceUnit,

      totalTimeAfterSwimString,
      totalTimeAfterBikeString,
    };
  },
};
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

    &.summary {
      padding: 10px;

      table {
        margin: 0 auto;

        .blank_row {
          height: 10px !important; /* overwrites any other rules */
          background-color: #ffffff;
        }

        td {
          padding: 4px;
        }
      }
    }

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