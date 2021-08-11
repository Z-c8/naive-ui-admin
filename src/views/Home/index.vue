<template>
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
                    <RouterView v-slot="{ Component }">
                        <transition name="fade-transform" mode="out-in">
                            <keep-alive :include="tagsList">
                                <component :is="Component" />
                            </keep-alive>
                        </transition>
                    </RouterView>
                </n-card>
            </div>
        </n-layout-content>
    </n-layout>
</template>

<script>
import NHeader from "/@/components/Header.vue";
import NTags from "/@/components/Tags.vue";
import NSidebar from "/@/components/Sidebar.vue";
import { computed } from "vue";
import { useStore } from "vuex";
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
        const collapse = computed(() => store.state.collapse);
        return {
            tagsList,
            collapse,
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
</style>