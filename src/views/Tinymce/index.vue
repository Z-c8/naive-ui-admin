<template>
    <div>
        <TEditor ref="editor" v-model="value" />
    </div>
</template>

<script>
import TEditor from "../components/Tinymce/TEditor.vue";
import { defineComponent, ref } from "vue";
export default defineComponent({
    components: { TEditor },
    setup() {
        return {
            value: ref(""),
        };
    },
});
</script>

<style>
</style>