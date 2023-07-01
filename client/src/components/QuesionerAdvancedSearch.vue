<template>
  <section class="advanced-model">
    <div class="advanced-model-container">
      <h2>Advanced Schedule</h2>
      <hr />
      <form id="advanced-form">
        <label for="advanced-description">Enter description for your schedule details</label>
        <textarea
          id="advanced-description"
          rows="3"
          placeholder="Enter your description ..."
          autocomplete="off"
        ></textarea>
        <button type="submit">Generate</button>
      </form>
    </div>
  </section>
</template>

<script>
export default {
  name: 'QuesionerAdvancedSearch'
}
</script>

<style scoped></style>
