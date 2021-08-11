<template>
    <p>vue-json-editor</p>
</template>

<script>
import { defineComponent, ref } from "vue";
export default defineComponent({
    components: {  },
    setup() {
        const json = ref("");
        const onJsonChange = (val) => {
            console.log(val);
        };

        return {
            value: ref(""),
            onJsonChange,
            json,
        };
    },
});
</script>

<style>
</style>