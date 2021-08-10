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
            <router-view v-slot="{ Component }">
                <transition name="fade-transform" mode="out-in">
                    <keep-alive :include="tagsList">
                        <div class="contentchild">
                            <n-layout-content content-style="padding: 10px;">
                                <n-card>
                                    <component :is="Component" />
                                </n-card>
                            </n-layout-content>
                        </div>
                    </keep-alive>
                </transition>
            </router-view>
        </n-layout-content>
    </n-layout>
    <!-- <n-layout class="wrapper-main" :native-scrollbar="true" bordered>
            
        </n-layout>
    </n-layout> -->
</template>

<script>
import NHeader from "/@/views/components/Header.vue";
import NTags from "/@/views/components/Tags.vue";
import NSidebar from "/@/views/components/Sidebar.vue";
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
</style>