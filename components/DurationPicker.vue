<template>
  <div>
    <vue-timepicker
      v-model="durationModel"
      @change="onChangeDuration"
      format="HH:mm:ss"
      manual-input
      hide-clear-button
      append-to-body
      auto-scroll
      :disabled="disabled"
      :key="
        uKey +
        (durationModel.ss || 1) +
        (durationModel.mm || 2) +
        (durationModel.hh || 3)
      "
      input-width="80px"
      :lazy="lazy"
    />
  </div>
</template>
<script>
import VueTimepicker from "vue3-timepicker";
import { secondsToHHMMSS } from "~/utils/calculations";

export default {
  name: "DurationPicker",
  components: { VueTimepicker },

  props: {
    modelValue: {
      type: Number,
      default: null,
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    uKey: {
      type: String,
      default: "XXX",
    },
    lazy: {
      type: Boolean,
      default: false,
    },
  },

  data() {
    return {
      durationModel: {},
    };
  },

  computed: {},

  watch: {
    modelValue(newValue) {
      const hhmmss = secondsToHHMMSS(newValue).split(":");

      this.durationModel = {
        HH: hhmmss[0] || "00",
        mm: hhmmss[1] || "00",
        ss: hhmmss[2] || "00",
      };
    },
  },

  mounted() {
    if (this.modelValue) {
      const hhmmss = secondsToHHMMSS(this.modelValue).split(":");

      this.durationModel.HH = hhmmss[0] || "00";
      this.durationModel.mm = hhmmss[1] || "00";
      this.durationModel.ss = hhmmss[2] || "00";
    } else {
      this.durationModel.HH = "00";
      this.durationModel.mm = "01";
      this.durationModel.ss = "30";
    }
  },

  methods: {
    onChangeDuration(newValue) {
      const s =
        parseInt(this.durationModel.HH) * 3600 +
        parseInt(this.durationModel.mm) * 60 +
        parseInt(this.durationModel.ss);

      this.$emit("update:modelValue", s);
    },
  },
};
</script>
<style lang="scss">
.vue__time-picker input.display-time {
  border: none;
  width: auto;
}

.vue__time-picker input.display-time:disabled,
.vue__time-picker input.display-time.disabled {
  color: unset;
}

.vue__time-picker .dropdown,
.vue__time-picker .dropdown .select-list {
  width: 130px !important;
}
</style>
