<template>
    <n-layout-sider
        class="sidebar"
        bordered
        @click="collapsed"
        collapse-mode="width"
        :collapsed-width="64"
        :width="272"
        show-trigger="arrow-circle"
        :native-scrollbar="false"
    >
        <n-menu
            :collapsed-width="64"
            @click="handlerouter"
            :collapsed-icon-size="22"
            :options="menuOptions"
            :render-label="renderMenuLabel"
            :default-value="menuvalue"
        />
    </n-layout-sider>
</template>

<script>
import { h, defineComponent, ref, computed } from "vue";
import { useStore } from "vuex";
import { useRoute, RouterLink } from "vue-router";
import { NIcon } from "naive-ui";
import {
    BookOutline as BookIcon,
    PersonOutline as PersonIcon,
    HomeOutline as HomeIcon,
} from "@vicons/ionicons5";
function renderIcon(icon) {
    return () => h(NIcon, null, { default: () => h(icon) });
}

const menuOptions = [
    {
        label: "首页",
        key: "dashboard",
        path: "/dashboard",
        icon: renderIcon(HomeIcon),
    },
    {
        label: "组件",
        key: "tinymce",
        path: "",
        icon: renderIcon(BookIcon),
        children: [
            {
                label: "富文本编辑器",
                key: "tinymce",
                path: "/tinymce",
            },
            {
                label: "CountTo",
                key: "json",
                path: "/count",
            },
        ],
    },
    // {
    //     label: "寻羊冒险记",
    //     key: "echarts",
    //     path: "/echarts",
    //     icon: renderIcon(BookIcon),
    // },
    // {
    //     label: "舞，舞，舞",
    //     key: "dance",
    //     path: "",
    //     icon: renderIcon(BookIcon),
    //     children: [
    //         {
    //             type: "group",
    //             label: "人物",
    //             key: "people",
    //             path: "",
    //             children: [
    //                 {
    //                     label: "叙事者",
    //                     key: "narrator",
    //                     path: "",
    //                     icon: renderIcon(PersonIcon),
    //                 },
    //                 {
    //                     label: "羊男",
    //                     key: "sheep-man",
    //                     path: "",
    //                     icon: renderIcon(PersonIcon),
    //                 },
    //             ],
    //         },
    //     ],
    // },
];

export default defineComponent({
    setup() {
        const store = useStore();
        const width = computed(() => store.state.collapse);
        const route = useRoute();
        const menuvalue = route.name;
        store.commit("handlematched", route.matched);
        const collapsed = () => {
            store.commit("handleCollapse", !store.state.collapse);
        };

        const handlerouter = () => {
            setTimeout(() => {
                store.commit("handlematched", route.matched);
            }, 100);
        };

        return {
            inverted: ref(false),
            menuOptions,
            width,
            collapsed,
            handlerouter,
            renderMenuLabel(option) {
                const { path } = option;
                return h(
                    RouterLink,
                    option.children ? { to: "" } : { to: path },
                    {
                        default: () => option.label,
                    }
                );
            },
            menuvalue,
        };
    },
});
</script>
<style lang='less' scoped>
:deep(.n-layout-toggle-button) {
    top: 35px !important;
}
</style>