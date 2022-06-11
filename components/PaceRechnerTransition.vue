<template>
  <div class="wrapper">
    <span class="title">T</span>

    <div class="row">
      <div class="picker">
        <DurationPicker
          uKey="transitionTime1"
          :modelValue="time"
          @update:modelValue="onChangeTime"
          lazy
        />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import DurationPicker from "./DurationPicker.vue";

export default {
  name: "PaceRechnerRun",

  components: {
    DurationPicker,
  },

  props: {
    time: {
      type: Number,
      default: 1,
    },
  },

  setup(props, { emit }) {
    const onChangeTime = (newTime) => {
      emit("update:time", newTime);
    };

    return {
      onChangeTime,
    };
  },
};
</script>

<style lang="scss" scoped>
.wrapper {
  color: #2d3436;

  .row {
    text-align: center;
  }
}
</style>