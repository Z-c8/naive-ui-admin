<template>
    <n-space v-if="showTags">
        <n-tag
            type="success"
            class="tags-li"
            closable
            v-for="(item, i) in tagsList"
            :key="i"
            :class="{ active: isActive(item.path) }"
            @close="closeTags(i)"
        >
            <router-link :to="item.path" class="tags-li-title">
                {{ item.title }}
            </router-link>
        </n-tag>
        <n-dropdown trigger="hover" @select="handleSelect" :options="options">
            <n-button class="tagdropdown">
                <n-icon size="20" color="#0e7a0d">
                    <ChevronDownIcon />
                </n-icon>
            </n-button>
        </n-dropdown>
    </n-space>
</template>

<script>
import { defineComponent, computed, onMounted, watch, ref } from "vue";
import { useMessage } from "naive-ui";
import { useStore } from "vuex";
import { useRoute, useRouter, onBeforeRouteUpdate } from "vue-router";
import { ChevronDownOutline as ChevronDownIcon } from "@vicons/ionicons5";
export default defineComponent({
    components: {
        ChevronDownIcon,
    },
    setup() {
        const message = useMessage();
        const route = useRoute();
        const router = useRouter();
        const isActive = (path) => {
            return path === route.fullPath;
        };

        const store = useStore();
        const tagsList = computed(() => store.state.tagsList);
        const showTags = computed(() => tagsList.value.length > 0);

        // 关闭单个标签
        const closeTags = (index) => {
            const delItem = tagsList.value[index];
            store.commit("delTagsItem", { index });
            const item = tagsList.value[index]
                ? tagsList.value[index]
                : tagsList.value[index - 1];
            if (item) {
                delItem.path === route.fullPath && router.push(item.path);
            } else {
                router.push("/");
            }
        };

        // 设置标签
        const setTags = (route) => {
            const isExist = tagsList.value.some((item) => {
                return item.path === route.fullPath;
            });
            if (!isExist) {
                if (tagsList.value.length >= 8) {
                    store.commit("delTagsItem", { index: 0 });
                }
                store.commit("setTagsItem", {
                    name: route.name,
                    title: route.meta.title,
                    path: route.fullPath,
                });
            }
        };
        setTags(route);
        onBeforeRouteUpdate((to) => {
            setTags(to);
        });

        // 关闭全部标签
        const closeAll = () => {
            store.commit("clearTags");
            router.push("/");
        };
        // 关闭其他标签
        const closeOther = () => {
            const curItem = tagsList.value.filter((item) => {
                return item.path === route.fullPath;
            });
            store.commit("closeTagsOther", curItem);
        };

        return {
            isActive,
            tagsList,
            showTags,
            closeTags,
            options: [
                {
                    label: "关闭全部",
                    key: "all",
                },
                {
                    label: "关闭其他",
                    key: "other",
                },
            ],
            handleSelect(key) {
                key === "other" ? closeOther() : closeAll();
                message.info(key);
            },
        };
    },
});
</script>

<style lang='less' scoped>
.n-space {
    position: relative;
    // border-bottom: 5px solid rgb(211, 220, 228);
    // box-shadow: rgb(211 220 228 / 80%) 0px 1px 4px;
    padding-left: 10px;
    .tags-li {
        border-radius: 3px;
        font-size: 12px;
        overflow: hidden;
        cursor: pointer;
        margin-top: 10px;
        background-color: #fff;
    }

    .tags-li-title {
        float: left;
        max-width: 80px;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
        margin-right: 5px;
        color: #666;
    }

    .tags-li.active .tags-li-title {
        color: #18a058;
    }
    .n-button {
        margin-top: 10px;
        height: 28px;
        position: absolute;
        right: 20px;
        top: 3px;
        background-color: #fff;
    }
}
</style>
