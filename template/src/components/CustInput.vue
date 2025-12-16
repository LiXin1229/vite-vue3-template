<script setup lang="ts">
interface Props {
  modelValue: string
  clearable?: boolean
}

interface Emits {
  (e: 'update:modelValue', value: string): void
  (e: 'handleClear'): void
}

const props = withDefaults(defineProps<Props>(), { clearable: true })
const emits = defineEmits<Emits>()
</script>

<template>
  <div>
    <el-input
      :model-value="modelValue"
      v-bind="$attrs"
      :clearable="clearable"
      @update:model-value="$emit('update:modelValue', $event)"
      @clear="() => emits('handleClear')"
    />
  </div>
</template>

<style scoped lang="scss">
</style>
