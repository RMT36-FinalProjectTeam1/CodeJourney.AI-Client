<template>
  <li v-for="(ref, index) in linkRefs">
    <input type="radio" :name="'accordion'" :id="'accordion-' + index" />
    <label :for="'accordion-' + index">{{ ref.ref }}</label>
    <div class="content">
      <div class="references-link">
        <a
        v-for="link in ref.links"
          :href="link.link"
          target="_blank"
          >{{ link.title }}</a
        >
      </div>
    </div>
  </li>
</template>

<script>
import { mapState } from 'pinia'
import { useCounterStore } from '../stores/counter'
export default {
  name: 'DetailAccordionData',
  data() {
    return {
      linkRefs: []
    }
  },
  computed: {
    ...mapState(useCounterStore, ['scheduleDetail'])
  },
  created() {
    const { reference } = this.scheduleDetail
    delete reference.youtube
    for (const key in reference) {
      this.linkRefs.push({
        ref: key,
        links: reference[key]
      })
    }
  }
}
</script>

<style scoped></style>
