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
        (durationModel.HH || 3)
      "
      input-width="80px"
      :lazy="lazy"
    />
  </div>
</template>
<script setup lang="ts">
import { ref, watch, onMounted } from "vue";
// @ts-ignore - vue3-timepicker has no TypeScript definitions
import VueTimepicker from "vue3-timepicker";
import { secondsToHHMMSS } from "~/utils/calculations";

interface Props {
  modelValue?: number | null;
  disabled?: boolean;
  uKey?: string;
  lazy?: boolean;
  backgroundColor?: string;
}

const props = withDefaults(defineProps<Props>(), {
  modelValue: null,
  disabled: false,
  uKey: "XXX",
  lazy: false,
  backgroundColor: "#3b82f6",
});

const emit = defineEmits<{
  "update:modelValue": [value: number];
}>();

const durationModel = ref<{ HH?: string; mm?: string; ss?: string }>({});

const onChangeDuration = () => {
  const s =
    parseInt(durationModel.value.HH || "0") * 3600 +
    parseInt(durationModel.value.mm || "0") * 60 +
    parseInt(durationModel.value.ss || "0");

  emit("update:modelValue", s);
};

watch(
  () => props.modelValue,
  (newValue) => {
    if (newValue) {
      const hhmmss = secondsToHHMMSS(newValue, false).split(":");

      durationModel.value = {
        HH: hhmmss[0] || "00",
        mm: hhmmss[1] || "00",
        ss: hhmmss[2] || "00",
      };
    }
  }
);

onMounted(() => {
  if (props.modelValue) {
    const hhmmss = secondsToHHMMSS(props.modelValue, false).split(":");

    durationModel.value.HH = hhmmss[0] || "00";
    durationModel.value.mm = hhmmss[1] || "00";
    durationModel.value.ss = hhmmss[2] || "00";
  } else {
    durationModel.value.HH = "00";
    durationModel.value.mm = "01";
    durationModel.value.ss = "30";
  }
});
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
