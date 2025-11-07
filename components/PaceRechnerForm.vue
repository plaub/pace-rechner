<template>
  <div
    class="wrapper"
    :style="{ backgroundColor: backgroundColor, color: color }"
  >
    <span class="title">{{ title }}</span>

    <div class="row">
      <div class="label">
        Distanz

        <br />
        <small class="unit">{{ distanceUnit }}</small>
      </div>

      <div class="picker">
        <input
          type="number"
          :value="distance"
          @blur="onChangeDistance"
          @keydown.enter="onChangeDistance"
        />
      </div>
    </div>

    <div class="row">
      <div class="label">Zeit</div>

      <div class="picker">
        <DurationPicker
          lazy
          :modelValue="time"
          @update:modelValue="onChangeTime"
          uKey="runTime"
        />
      </div>
    </div>

    <div v-if="paceType === PaceType.Pace" class="row">
      <div class="label">
        Pace
        <br />
        <small class="unit">{{ paceUnit }}</small>
      </div>

      <div class="picker">
        <DurationPicker
          lazy
          :modelValue="pace"
          @update:modelValue="onChangePace"
          uKey="runPace"
        />
      </div>
    </div>

    <div v-if="paceType === PaceType.Speed" class="row">
      <div class="label">
        Speed
        <br />
        <small class="unit">km / h</small>
      </div>

      <div class="picker">
        <input
          type="number"
          :value="speed"
          @blur="onChangeSpeed"
          @keydown.enter="onChangeSpeed"
          min="1"
        />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import type { PropType } from "vue";
import { toRefs, onMounted } from "vue";
import DurationPicker from "./DurationPicker.vue";
import { DistanceUnit, PaceType, PaceUnit } from "@/types/PaceRechner";

export default {
  name: "PaceRechnerForm",

  components: {
    DurationPicker,
  },

  props: {
    title: {
      type: String,
      default: "Run",
    },
    backgroundColor: {
      type: String,
      default: "#ffffff",
    },
    color: {
      type: String,
      default: "#ffffff",
    },
    paceUnit: {
      type: String as PropType<PaceUnit>,
      default: PaceUnit.Run,
    },
    distance: {
      type: Number,
      default: 1,
    },
    time: {
      type: Number,
      default: 1,
    },
    pace: {
      type: Number,
      default: 1,
    },
    speed: {
      type: Number,
      default: 1,
    },
    paceType: {
      type: String as PropType<PaceType>,
      default: PaceType.Pace,
    },
    distanceUnit: {
      type: String as PropType<DistanceUnit>,
      default: DistanceUnit.Run,
    },
  },

  setup(props, { emit }) {
    const { distance, time, pace, speed, paceType, paceUnit } = toRefs(props);

    onMounted(() => {
      if (paceType.value === PaceType.Pace) {
        onChangePace(pace.value);
      } else {
        // Create a mock event for initial calculation
        const mockEvent = { target: { value: speed.value.toString() } } as any;
        onChangeSpeed(mockEvent);
      }
    });

    const onChangePace = (newPace: number) => {
      if (paceUnit.value === PaceUnit.Run) {
        emit("update:time", Math.round((newPace * distance.value) / 1000));
      } else {
        emit("update:time", Math.round((newPace * distance.value) / 100));
      }

      emit("update:pace", newPace);
    };

    const onChangeTime = (newTime: number) => {
      if (paceType.value === PaceType.Pace) {
        if (paceUnit.value === PaceUnit.Run) {
          emit("update:pace", Math.round((newTime * 1000) / distance.value));
        } else {
          emit("update:pace", Math.round((newTime * 100) / distance.value));
        }
      } else {
        const h = newTime / 3600;

        emit("update:speed", Math.round((distance.value / h) * 10) / 10);
      }

      emit("update:time", newTime);
    };

    const onChangeDistance = (event: Event) => {
      const target = event.target as HTMLInputElement;
      const distance = target.value.toString().replace(/,/g, ".");

      const d = parseFloat(distance);
      if (isNaN(d) || d < 10) {
        return;
      }

      if (paceType.value === PaceType.Pace) {
        if (paceUnit.value === PaceUnit.Run) {
          emit("update:time", Math.round((pace.value * d) / 1000));
        } else {
          emit("update:time", Math.round((pace.value * d) / 100));
        }
      } else {
        // bike (speed)
        emit("update:time", Math.round((d / speed.value) * 3600));
      }

      emit("update:distance", d);
    };

    const onChangeSpeed = (event: Event) => {
      const target = event.target as HTMLInputElement;
      const p = parseFloat(target.value);
      if (isNaN(p)) {
        return;
      }

      emit("update:time", Math.round((distance.value / p) * 3600));
      emit("update:speed", p);
    };

    return {
      time,
      pace,
      speed,
      distance,
      onChangePace,
      onChangeTime,
      onChangeDistance,
      onChangeSpeed,
      PaceType,
    };
  },
};
</script>

<style lang="scss" scoped>
.wrapper {
  .row {
    display: flex;
    flex-flow: row;
    align-items: center;
  }
}
</style>
