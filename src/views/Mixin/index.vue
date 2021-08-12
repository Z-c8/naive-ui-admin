<template>
    <div class="wrapper-inner-tab-backgrounds">
        <div
            v-for="(item, i) in 30"
            :key="i"
            class="wrapper-inner-tab-backgrounds-third"
        >
            <div
                :class="`sim-button button${i + 1}`"
                data-text="Recover Password"
            >
                <span>Recover Password</span>
            </div>
        </div>
    </div>
</template>

<script>
export default {};
</script>

<style lang='less' scope>
@import "../../assets/css/mixin.less";
</style>