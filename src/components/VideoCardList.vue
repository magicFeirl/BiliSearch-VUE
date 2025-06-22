<template>
  <div class="flex flex-col">
    <slot></slot>
  </div>
</template>
<script>
import { videoLink } from '../utils/video'

export default {
  methods: {
    videoLink,
  },
};
</script>
