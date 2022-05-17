<template>
  <div class="frame-30">
        <ul>
          <li v-for="item in items" :key="item.id">
            <pre>
                {{ `room_id: ${item.id}` }}
            </pre>
          </li>
        </ul>
      </div>
</template>

<script>
export default {

}
</script>

<style>

</style>