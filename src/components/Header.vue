<template>
    <div class="header">
        <n-icon
            size="32"
            class="collapsedIcon"
            @click="collapseChange"
            color="#18a058"
        >
            <MenuFoldOutlined />
        </n-icon>
        <n-breadcrumb>
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
    <div
        class="handle-button"
        :style="{
            top: buttonTop + 'px',
        }"
        @click="activate('right')"
    >
        <n-icon size="30" color="#ffffff">
            <SettingFilled />
        </n-icon>
    </div>
    <n-drawer v-model:show="active" :width="width" :placement="placement">
        <n-drawer-content title="斯通纳" closable>
            《斯通纳》是美国作家约翰·威廉姆斯在 1965 年出版的小说。
        </n-drawer-content>
    </n-drawer>
</template>

<script>
import { defineComponent, ref, computed } from "vue";
import { useRoute, RouterLink, useRouter } from "vue-router";
import { useStore } from "vuex";
import { useMessage } from "naive-ui";
import { MenuFoldOutlined, SettingFilled } from "@vicons/antd";
export default defineComponent({
    components: {
        RouterLink,
        MenuFoldOutlined,
        SettingFilled,
    },
    setup() {
        const message = useMessage();
        const showDropdownRef = ref(false);
        const store = useStore();
        const menu = computed(() => store.state.menu);
        const collapsed = computed(() => store.state.collapse);
        const router = useRouter();
        //抽屉 Drawer
        const active = ref(false);
        const placement = ref("right");
        const activate = (place) => {
            active.value = true;
            placement.value = place;
        };
        // 侧边栏折叠
        const collapseChange = () => {
            store.commit("handleCollapse", !collapsed.value);
        };

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
            collapseChange,
            collapsed,
            menu,
            active,
            placement,
            activate,
            show: ref(true),
            buttonTop: ref(250),
            width: ref(400),
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
    margin-left: 20px;
}
.collapsedIcon {
    float: left;
    cursor: pointer;
    margin: 15px 0px 0px 15px;
    transition-property: background-color;
    transition-duration: 0.3s;
    transition-timing-function: ease;
    padding: 5px;
    border-radius: 5px;
}
.collapsedIcon:hover {
    background-color: #f0f0f0;
}

.handle-button {
    width: 48px;
    height: 48px;
    position: absolute;
    right: 0px;
    text-align: center;
    font-size: 24px;
    border-radius: 6px 0 0 6px !important;
    z-index: 1;
    pointer-events: auto;
    cursor: pointer;
    color: #fff;
    background-color: #0e7a0d;
    i {
        font-size: 24px;
        line-height: 48px;
    }
}
</style>