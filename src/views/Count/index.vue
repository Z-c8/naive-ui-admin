<template>
    <CountTo
        class="counto"
        :startVal="0"
        :endVal="Infototal"
        :speed="1"
        :decimals="0"
        :isReverse="false"
    />
</template>

<script>
import { defineComponent, ref } from "vue";
import CountTo from "../components/Count/index.vue";
export default defineComponent({
    components: { CountTo },
    setup() {
        const json = ref("");
        const Infototal = ref(100);

        return {
            value: ref(""),
            Infototal,
        };
    },
});
</script>

<style lang='less' scoped>
.counto {
    font-size: 50px;
    color: rgb(14, 122, 13);
}
</style>