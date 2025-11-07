<template>
  <div :style="{ '--dropdown-active-color': backgroundColor }">
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
    backgroundColor: {
      type: String,
      default: "#3b82f6",
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
.vue__time-picker {
  position: relative;

  .dropdown.drop-down {
    background: white;
    border: 1px solid #e2e8f0;
    border-radius: 8px;
    box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1),
      0 4px 6px -2px rgba(0, 0, 0, 0.05);
    overflow: hidden;
    z-index: 1000;
    position: absolute;
    width: 137px !important;

    .select-list {
      display: flex;
      width: 137px !important;

      ul {
        flex: 1;
        margin: 0;
        padding: 0;
        list-style: none;
        border-right: 1px solid #e2e8f0;
        max-height: 200px;
        overflow-y: auto;

        &:last-child {
          border-right: none;
        }

        li {
          padding: 8px 12px;
          cursor: pointer;
          transition: all 0.2s ease;
          font-size: 14px;
          text-align: center;
          color: #334155;

          &.hint {
            background-color: #f8fafc;
            color: #64748b;
            font-weight: 600;
            font-size: 12px;
            text-transform: uppercase;
            letter-spacing: 0.05em;
            cursor: default;
            border-bottom: 1px solid #e2e8f0;
            position: sticky;
            top: 0;
            z-index: 1;
          }

          &:not(.hint):hover {
            background-color: #f1f5f9;
          }

          &.active {
            background-color: var(--dropdown-active-color, #3b82f6);
            color: white;
            font-weight: 600;

            &:hover {
              background-color: var(--dropdown-active-color, #3b82f6);
              filter: brightness(0.9);
            }
          }
        }

        // Scrollbar styling für jede ul
        &::-webkit-scrollbar {
          width: 6px;
        }

        &::-webkit-scrollbar-track {
          background: #f1f5f9;
        }

        &::-webkit-scrollbar-thumb {
          background: #cbd5e1;
          border-radius: 3px;

          &:hover {
            background: #94a3b8;
          }
        }
      }
    }
  }
}
</style>
