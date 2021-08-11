<template>
    <div class="header">
        <n-breadcrumb style="margin-left: 40px">
            <n-breadcrumb-item v-for="(item, index) in menu" :key="index">
                {{ item.meta.title }}
            </n-breadcrumb-item>
        </n-breadcrumb>
        <div class="header-right">
            <n-space>
                <n-dropdown
                    @select="handleSelect"
                    trigger="hover"
                    :options="options"
                >
                    <n-avatar
                        size="large"
                        src="https://i.ibb.co/bP67RpX/0-DA51-FB118-EA5-C31-A85-D755-CFF7-D48-EA.jpg"
                    >
                    </n-avatar>
                </n-dropdown>
            </n-space>
        </div>
    </div>
</template>

<script>
import { defineComponent, ref, computed } from "vue";
import { useRoute, RouterLink, useRouter } from "vue-router";
import { useStore } from "vuex";
import { useMessage } from "naive-ui";
export default defineComponent({
    components: {
        RouterLink,
    },
    setup() {
        const message = useMessage();
        const showDropdownRef = ref(false);
        const store = useStore();
        const menu = computed(() => store.state.menu);
        const router = useRouter();

        return {
            options: [
                {
                    label: "退出",
                    key: "退出成功！",
                },
            ],
            showDropdown: showDropdownRef,
            handleSelect(key) {
                router.push("/login");
                message.info(key);
            },
            handleClick() {
                showDropdownRef.value = !showDropdownRef.value;
            },
            collapseChage() {
                this.$store.commit("handleCollapse", !this.collapse);
            },
            menu,
        };
    },
});
</script>

<style lang='less' scoped>
.header {
    overflow: hidden;
    position: relative;
    background: #fff;
    box-shadow: 0 1px 4px rgba(211, 220, 228, 0.8);
    height: 70px;
    line-height: 70px;
}

.header .logo {
    float: left;
    width: 250px;
    font-size: 18px;
    font-weight: bold;
    margin-left: 30px;
}
.header-right {
    float: right;
    padding-right: 20px;
    line-height: 70px;
    padding-top: 15px;
}
.n-breadcrumb {
    float: left;
}
</style>