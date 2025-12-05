<template>
    <span v-on="$listeners" class="tag">
        <slot></slot>
    </span>
</template>

<script>
export default {
    name: "VideoTag",
    inheritAttrs: true
}
</script>

<style lang="less" scoped>
.tag {
    @apply py-1 px-2 rounded-2xl bg-gray-300/70 text-gray-600 text-sm cursor-pointer inline-block;
    @apply hover: bg-gray-400/70;
}
</style>