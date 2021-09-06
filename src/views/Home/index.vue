<template>
    <n-config-provider style="height: 100%" :theme="theme">
        <n-layout has-sider>
            <!-- 侧边栏 -->
            <N-Sidebar />
            <!-- 主体 -->
            <n-layout-content>
                <n-layout-header class="wrapper-header" bordered>
                    <N-Header />
                </n-layout-header>
                <N-Tags />
                <div class="content">
                    <n-card>
                        <n-spin :show="show">
                            <RouterView v-slot="{ Component }">
                                <transition name="fade-transform" mode="out-in">
                                    <keep-alive :include="tagsList">
                                        <component :is="Component" />
                                    </keep-alive>
                                </transition>
                            </RouterView>
                        </n-spin>
                    </n-card>
                </div>
            </n-layout-content>
        </n-layout>
    </n-config-provider>
</template>

<script>
import NHeader from "/@/components/Header.vue";
import NTags from "/@/components/Tags.vue";
import NSidebar from "/@/components/Sidebar.vue";
import { watch, computed, reactive, toRefs, ref } from "vue";
import { useStore } from "vuex";
import { useRoute, onBeforeRouteUpdate } from "vue-router";
import { darkTheme } from "naive-ui";
export default {
    components: {
        NHeader,
        NTags,
        NSidebar,
    },
    setup() {
        const store = useStore();
        const tagsList = computed(() =>
            store.state.tagsList.map((item) => item.name)
        );
        const route = useRoute();
        const state = reactive({
            show: true,
        });
        setTimeout(() => {
            state.show = false;
        }, 1000);
        watch(
            () => route.path,
            () => {
                state.show = true;
                setTimeout(() => {
                    state.show = false;
                }, 1000);
            }
        );
        const collapse = computed(() => store.state.collapse);
        return {
            tagsList,
            collapse,
            darkTheme,
            theme: ref(null),
            ...toRefs(state),
        };
    },
};
</script>

<style lang="less" scoped>
.wrapper-section {
    min-height: calc(100vh - 127px);
    width: 100%;
    position: relative;
    overflow: hidden;
}
.content {
    padding: 10px;
}
.n-spin-container {
    width: 100%;
    height: 100% !important;
    display: inline-grid;
}
</style>