<template>
  <div class="grid grid-cols-[repeat(auto-fill,285px)] gap-8 justify-center">
    <slot></slot>
  </div>
</template>
<script>
import { getPubdate, videoLink } from '../utils/video'

export default {
  methods: {
    videoLink,
    getPubdate,
  },
};
</script>
