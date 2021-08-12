<template>
    <n-spin :show="show">
        <div class="loginbg">
            <n-grid x-gap="12" :cols="1">
                <blockquote>
                    “云边有个小卖部，货架堆着岁月和夕阳，背后就是山。梦里小镇落雨，开花，起风，挂霜，甚至扬起烤红薯的香气。每个墙角都能够听见人们的说笑声。老人靠着躺椅假装睡着，小孩子偷走了一块糖，送给一个姑娘。泪水几点钟落地，飞鸟亦要去向何方人们聚和离，云朵来又往。讲故事的人，总有一个故事不愿讲，时光飞逝，悄悄话变成了纸张。”
                    <br />
                    <br />
                    <footer>
                        ——
                        <cite>云边有个小卖部</cite>
                    </footer>
                </blockquote>
                <n-card>
                    <n-form :model="formValue" :rules="rules" ref="formRef">
                        <n-form-item label="账号" path="user.name">
                            <n-input
                                placeholder="Input Name"
                                v-model:value="formValue.user.name"
                            >
                                <template #prefix>
                                    <n-icon size="16" color="#808695">
                                        <PersonOutline />
                                    </n-icon>
                                </template>
                            </n-input>
                        </n-form-item>
                        <n-form-item label="密码" path="user.password">
                            <n-input
                                placeholder="Input Password"
                                show-password-toggle
                                v-model:value="formValue.user.password"
                                type="password"
                            >
                                <template #prefix>
                                    <n-icon size="16" color="#808695">
                                        <LockClosedOutline />
                                    </n-icon>
                                </template>
                            </n-input>
                        </n-form-item>
                    </n-form>
                    <n-button
                        type="primary"
                        block
                        @click="handleValidateButtonClick"
                    >
                        登录
                    </n-button>
                    <div class="otherlogin">
                        其他登录方式：
                        <span class="othericon">
                            <n-icon size="26" color="#18a058">
                                <LogoGithub />
                            </n-icon>
                            <n-icon size="26" color="#18a058">
                                <LogoFacebook />
                            </n-icon>
                        </span>
                    </div>
                </n-card>
            </n-grid>
        </div>
    </n-spin>
</template>

<script>
import { defineComponent, ref, toRefs, reactive } from "vue";
import { useMessage } from "naive-ui";
import { useRoute, useRouter } from "vue-router";
import {
    PersonOutline,
    LockClosedOutline,
    LogoGithub,
    LogoFacebook,
} from "@vicons/ionicons5";
export default defineComponent({
    components: { PersonOutline, LockClosedOutline, LogoGithub, LogoFacebook },
    setup() {
        const formRef = ref();
        const message = useMessage();
        const router = useRouter();
        const state = reactive({
            show: false,
        });
        return {
            formRef,
            formValue: ref({
                user: {
                    name: "admin",
                    password: "123456",
                },
            }),
            rules: {
                user: {
                    name: {
                        required: true,
                        trigger: "blur",
                        validator: (rule, value) => {
                            return new Promise((resolve, reject) => {
                                if (value !== "admin") {
                                    reject(Error("非正确名字！")); // reject with error message
                                } else {
                                    resolve();
                                }
                            });
                        },
                    },
                    password: {
                        required: true,
                        trigger: "blur",
                        validator: (rule, value) => {
                            return new Promise((resolve, reject) => {
                                if (value !== "123456") {
                                    reject(Error("密码错误！")); // reject with error message
                                } else {
                                    resolve();
                                }
                            });
                        },
                    },
                },
            },
            ...toRefs(state),
            handleValidateButtonClick(e) {
                e.preventDefault();
                state.show = true;

                const messageReactive = message.loading("Verifying", {
                    duration: 0,
                });
                formRef.value.validate((errors) => {
                    if (!errors) {
                        message.success("登录成功");
                        setTimeout(() => {
                            router.push("/");
                            state.show = false;
                        }, 1000);
                    } else {
                        message.error("账号/密码错误！");
                        console.log("errors", errors);
                    }
                    messageReactive.destroy();
                });
            },
        };
    },
});
</script>

<style lang='less' scoped>
.loginbg,
:deep(.n-grid::before) {
    background: url("/src/assets/images/bg.jpg") 0 / cover fixed;
}
.loginbg {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    // z-index: -10;
    zoom: 1;
    background-color: #fff;
    background-size: cover;
    -webkit-background-size: cover;
    -o-background-size: cover;
    background-position: center 0;
    blockquote {
        font-family: "微软雅黑";
        padding: 30px;
        font-size: 16px;
        color: #fff !important;
    }
    :deep(.n-ol) {
        font-family: "微软雅黑";
        padding: 20px;
        font-size: 16px;
        li {
            line-height: 30px;
            color: #fff !important;
        }
    }
    :deep(.n-grid) {
        position: absolute;
        top: 0;
        bottom: 0;
        left: 0;
        right: 0;
        width: 30% !important;
        height: 47%;
        line-height: 2;
        margin: auto;
        border-radius: 10px;
        background: rgba(255, 255, 255, 0.3);
        box-shadow: 5px 5px 12px 6px rgba(0, 0, 0, 0.3);
    }
    :deep(.n-grid::before) {
        content: "";
        position: absolute;
        top: 0;
        bottom: 0;
        left: 0;
        right: 0;
        filter: blur(15px);
        z-index: -1;
    }
    .otherlogin {
        margin-top: 10px;
        .othericon {
            vertical-align: middle;
            cursor: pointer;
        }
    }
    footer {
        float: right;
    }
    .rightlogin {
        background-color: #fff;
        height: 837px;
        border-radius: 0px 10px 10px 0px;
    }
}

.n-spin-container {
    height: 100% !important;
}
</style>